import Immutable from 'immutable';
import merge from 'merge';

/**
 * Whether a parse tree is a single segment or not. This function is called at the top of the tree
 * and is passed down to all child nodes.
 *
 * @param   {string}  kind The type of root node.
 * @return  {boolean}
 */
export function isSingleSegment(kind) {
  return kind !== "top-level-and" && kind !== "and" ? true : false
}

/**
 * A recursive function for concatenating the ids of nodes that are collapsible in a depth
 * first manner.
 *
 * Setting children to [] indicates the base case where map is acting on an empty array, therefore
 * not recursing. A set with that leaf node's id is returned in this case.
 */
export function getCollapsibleNodeIds({ id, children = [], kind }, singleSegment) {
  /*
    We only want to capture the ids of nodes that are collapsible, and, therefore, only nodes that
    a) have children and b) are not "root" nodes (as root nodes are not collapsible).
    A root node depends on whether a parse tree is a comprised of one or many "segments".
    If it has many segments, then nodes at both the '0', i.e., ids of length 1, and '0.x', i.e.,
    ids of length 3, levels are roots. Otherwise, it is a single segment, and just the '0' level
    is the root.
  */

  const hasChildren = children.length > 0;
  const isRoot = id.length === 1;
  const isEventRoot = (!singleSegment && id.length === 3) || (singleSegment && isRoot);

  const dataCollapsible = hasChildren && !isRoot && !isEventRoot;
  const nodeId = dataCollapsible ? [id] : [];

  return hasChildren
    ? Immutable.Set(nodeId).union(...children.map(child => getCollapsibleNodeIds(child, singleSegment)))
    : Immutable.Set();
}

// Filter color style out of the style object and return the value:
export function colorToString(arr = []) {
  return arr.filter((item) => {
    return item.indexOf("color") === 0;
  }, "");
}

/**
 * Returns a copy of the node, where the node and all of it's descendants are assigned unique
 * identifiers. Uniqueness is only guaranteed within the scope of the provided tree.
 *
 * @param  {Node}   node
 * @param  {String} [prefix='']   A prefix to append to generated identifiers.
 * @param  {Number} [childIdx=0]  The index of the node in it's parent.
 * @return {Node}
 */
export function assignNodeIds(node, prefix = '', childIdx = 0) {
  const nodeCopy = merge.recursive(true, node);
  const isLeaf = !Array.isArray(nodeCopy.children) || nodeCopy.children.length === 0;
  if (!nodeCopy.id) {
    nodeCopy.id = `${prefix}${childIdx}`;
  }
  if (Array.isArray(nodeCopy.children)) {
    nodeCopy.children = nodeCopy.children.slice().map(
      (node, idx) => assignNodeIds(node, `${nodeCopy.id}.`, idx)
    );
  }
  return nodeCopy;
}

/**
 * Returns an Immutable.Set including all unique nodeTypes discovered in the tree and all of it's
 * descendants.
 *
 * @param  {Node}                   node
 * @return {Immutable.Set<String>}  All unique nodeType values present in the tree.
 */
export function findAllNodeTypes(node) {
  const nodeTypes = Immutable.Set([ node.nodeType ]);
  if (Array.isArray(node.children)) {
    return node.children.reduce((types, node) => types.concat(findAllNodeTypes(node)), nodeTypes);
  } else {
    return nodeTypes;
  }
}

/**
 * Generates a map of node types to styles, for the provided node types.
 *
 * @param  {Immutable.Set<String>}  nodeTypes The set of all node types for which styles should be defined.
 * @return {object}                 A dictionary where each key is a nodeType and each value is a collection
 *                                  of styles to be applied to that node.
 */
export function generateStylesForNodeTypes(nodeTypes) {
  if (!(nodeTypes instanceof Immutable.Set)) {
    throw new Error('You must provide an Immutable.Set of node types.');
  }
  return nodeTypes.reduce((nodeTypeToStyle, nodeType) => {
    // We have colors 0 through 6.  Dyanmically assign them.
    return nodeTypeToStyle.set(nodeType, [ `color${nodeTypeToStyle.size % 6 + 1}` ]);
  }, Immutable.Map()).toJS();
}

/**
 * Returns a copy fo the node and all of it's descendants, translating the generic `spans` interface
 * into `alternateParseInfo` as appropriate. This method was written to support translation from
 * a "public", easy to digest API into that which the existing UI / API expects.
 *
 * TODO (codeviking): In the long run we should remove this mechanism and use a more canonical API.
 *
 * @param  {Node}   origNode
 * @return {Node}   node  The same node, mutated.
 */
export function translateSpans(origNode) {
  const node = merge.recursive(true, origNode);

  // First translate all of this node's children
  if (Array.isArray(node.children)) {
    node.children = node.children.map(translateSpans);
  }

  // If the property already exists, we assume it's data being delivered by Euclid's API, in which
  // case we shouldn't mutate the tree.
  if (!node.alternateParseInfo) {
    // First we build up alternateParseInfo.charNodeRoot, which is a single span that captures the
    // aggregate boundaries of the span and all of it's children.
    const boundaries = getSpanBoundaries(node);
    const charNodeRoot = (
      boundaries
        ? new CharNodeRoot(boundaries.start, boundaries.end)
        : undefined
    );

    // TODO (codeviking): The UI should really support it being `undefined`, rather that using
    // if node.hasOwnProperty('charNodeRoot'), as then we wouldn't have to have carefully
    // implemented logic like so.
    if (charNodeRoot) {
        node.alternateParseInfo = { charNodeRoot };
    }

    // Now let's build up spanAnnotations, which are the aggregate boundaries (charNodeRoot) of the
    // node's immediate children and the node's own spans.
    const spanAnnotations =
      (node.children || [])
        .filter(n => n.alternateParseInfo && n.alternateParseInfo.charNodeRoot)
        .map(n => new Span(
          /* lo = */ n.alternateParseInfo.charNodeRoot.charLo,
          /* hi = */ n.alternateParseInfo.charNodeRoot.charHi,
          /* spanType = */'child'
        ))
        .concat(
          (node.spans || []).map(span => new Span(
            /* lo = */ span.start,
            /* hi = */ span.end,
            /* spanType = */ span.spanType || 'self'
          ))
        ).sort((first, second) => first.lo - second.lo);

    // TODO (codeviking): Again, the UI should handle the "empty state" appropriately as to prevent
    // logic like this from being necessary.
    if (spanAnnotations.length > 0) {
      if (!node.alternateParseInfo) {
        node.alternateParseInfo = {};
      }
      node.alternateParseInfo.spanAnnotations = spanAnnotations;
    }
  }

  return node;
}

/**
 * Returns a single span where the the start / end values encompass the indices of the provided
 * node's spans and all of it's children's spans.
 *
 * For instance, if provided a node with the span [0, 1] and that node had two children,
 * [1, 3] and [4, 20], this function would return a single span, [0, 20].
 *
 * If the node or it's children don't have any spans, `undefined` is returned.
 *
 * @param  {Node}
 * @return {Span|undefined} The encompassing span (the boundaries), or undefined.
 */
function getSpanBoundaries(node) {
  const allSpans = getAllChildSpans(node).concat(node.spans || []);
  if (allSpans.length > 0) {
    const firstSpan = allSpans[0];
    return allSpans.reduce((boundaries, span) => {
      if (boundaries.start > span.start) {
        boundaries.start = span.start;
      }
      if (boundaries.end < span.end) {
        boundaries.end = span.end;
      }
      return boundaries;
    }, { start: firstSpan.start, end: firstSpan.end });
  } else {
    return undefined;
  }
}

/**
 * Returns all children of the provided node, including those that are descendents of the node's
 * children.
 *
 * @param  {Node}   node
 * @return {Span[]}
 */
function getAllChildSpans(node) {
  return (
    Array.isArray(node.children)
      ? node.children
          .map(n => (n.spans || []).concat(getAllChildSpans(n)))
          .reduce((all, arr) => all.concat(arr))
      : []
  );
}

class Span {
  constructor(lo, hi, spanType) {
    this.lo = lo;
    this.hi = hi;
    this.spanType = spanType;
  }
}

class CharNodeRoot {
  constructor(charLo, charHi) {
    this.charLo = charLo;
    this.charHi = charHi;
  }
}

import Immutable from 'immutable';

/**
 * Whether a parse tree is a single segment or not. This function is called at the top of the tree
 * and is passed down to all child nodes.
 *
 * @param {string} kind - The type of root node.
 * @returns {boolean}
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

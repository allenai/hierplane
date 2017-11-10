import Immutable from 'immutable';

/**
 * Action Type Constants
 */
export const ADD_ALL_NODE_IDS = 'ADD_ALL_NODE_IDS';
export const TOGGLE_NODE_STATE = 'TOGGLE_NODE_STATE';
export const COLLAPSE_NODE = 'COLLAPSE_NODE';
export const COLLAPSE_ALL_NODES = 'COLLAPSE_ALL_NODES';
export const COLLAPSE_DESCENDANTS = 'COLLAPSE_DESCENDANTS';
export const EXPAND_NODE = 'EXPAND_NODE';
export const EXPAND_ALL_NODES = 'EXPAND_ALL_NODES';
export const EXPAND_PATH_TO_NODE = 'EXPAND_PATH_TO_NODE';

/**
 * Action Creators
 */

/**
 * Adds all the node ids.
 *
 * @param {Immutable.Set} ids - the node ids to be added
 * @returns {object}
 */
export function addAllNodeIds(ids) {
  return {
    ids,
    type: ADD_ALL_NODE_IDS,
  };
}

/**
 * Toggle the collapsed/expanded state of a node.
 *
 * @param {string} id - the id of the node to be toggled
 * @returns {object}
 */
export function toggleNode(id) {
  return {
    id,
    type: TOGGLE_NODE_STATE,
  };
}

/**
 * Explicitly collapse a node.
 *
 * @param {string} id - the id of the node to be collapsed
 * @returns {object}
 */
export function collapseNode(id) {
  return {
    id,
    type: COLLAPSE_NODE,
  };
}

/**
 * Explicitly expand a node.
 *
 * @param {string} id - the id of the node to be expanded
 * @returns {object}
 */
export function expandNode(id) {
  return {
    id,
    type: EXPAND_NODE,
  };
}

/**
 * Collapse all nodes.
 *
 * @returns {object}
 */
export function collapseAllNodes() {
  return {
    type: COLLAPSE_ALL_NODES,
  };
}

/**
 * Expand all nodes.
 *
 * @returns {object}
 */
export function expandAllNodes() {
  return {
    type: EXPAND_ALL_NODES,
  };
}

/**
 * Collapse decendants for a given node id. When navigating between parses on a focused node, we
 * keep that node expanded (i.e. show its immediate children), but force-collapse all of its other
 * descendants.
 *
 * @param {string} id - The node id that we're fetching an alternate parse for.
 * @returns {object}
 */
export function collapseDescendants(id) {
  return {
    id,
    type: COLLAPSE_DESCENDANTS,
  };
}

/**
 * Expand the path to the clicked node.
 *
 * @param {string} id - The node id that we're exposing the path to.
 * @returns {object}
 */
export function expandPathToNode(id) {
  return {
    id,
    type: EXPAND_PATH_TO_NODE,
  };
}

/**
 * UI Reducer
 */
const initialState = {
  expandableNodeIds: Immutable.Set(),
  expandedNodeIds: Immutable.Set(),
  exploded: false,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_ALL_NODE_IDS:
      return {
        ...state,
        expandableNodeIds: action.ids,
      };
    case COLLAPSE_NODE:
      return {
        ...state,
        exploded: false,
        expandedNodeIds: state.expandedNodeIds.delete(action.id),
      };
    case COLLAPSE_ALL_NODES:
      return {
        ...state,
        exploded: false,
        expandedNodeIds: Immutable.Set(),
      };
    case COLLAPSE_DESCENDANTS:
      return {
        ...state,
        exploded: false,
        expandedNodeIds: state.expandedNodeIds.filterNot(isChildOf(action.id)),
      };
    case EXPAND_NODE:
      return (function() {
        const { expandedNodeIds, expandableNodeIds } = state;
        const newExpandedNodeIds = expandedNodeIds.add(action.id);

        return {
          ...state,
          exploded: newExpandedNodeIds.equals(expandableNodeIds),
          expandedNodeIds: newExpandedNodeIds,
        };
      })();
    case TOGGLE_NODE_STATE:
      return (function() {
        const { expandedNodeIds: prevIds, expandableNodeIds } = state;
        const id = action.id;
        const newExpandedNodeIds = prevIds.has(id) ? prevIds.delete(id) : prevIds.add(id);

        return {
          ...state,
          exploded: newExpandedNodeIds.equals(expandableNodeIds),
          expandedNodeIds: newExpandedNodeIds,
        };
      })();
    case EXPAND_ALL_NODES:
      return {
        ...state,
        exploded: true,
        expandedNodeIds: Immutable.Set(state.expandableNodeIds),
      };
    case EXPAND_PATH_TO_NODE:
      return {
        ...state,
        expandedNodeIds: state.expandedNodeIds.union(pathToNode(action.id)),
      };
    default:
      return state;
  }
}

function isChildOf(parseId) {
  return nodeId => nodeId.startsWith(`${parseId}.`);
}

/**
 * Returns an Immutable.Set of node ids. The ids are the path from root to that id. For example,
 * given the id '0.0.0', this function will return ['0', '0.0', '0.0.0'].
 *
 * @param {string} id - the node id to get the path from the root node to.
 * @returns {Immutable.Set}
 */
function pathToNode(id) {
  if (!id) {
    return Immutable.Set();
  }

  // Recurse from child to parent by cutting off the last two characters, treating the shortened
  // string as a parent pointer.
  return id.length > 0 ? Immutable.Set([id]).union(pathToNode(id.slice(0, -2))) : [];
}

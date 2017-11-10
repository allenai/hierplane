import uiReducer, {
  ADD_ALL_NODE_IDS, addAllNodeIds,
  TOGGLE_NODE_STATE, toggleNode,
  COLLAPSE_NODE, collapseNode,
  COLLAPSE_ALL_NODES, collapseAllNodes,
  COLLAPSE_DESCENDANTS, collapseDescendants,
  EXPAND_NODE, expandNode,
  EXPAND_ALL_NODES, expandAllNodes,
  EXPAND_PATH_TO_NODE, expandPathToNode,
} from './ui';

import { expect } from 'chai';
import Immutable from 'immutable';

describe('ui actions', () => {
  it('addAllNodeIds - should create an action to add node ids', () => {
    const ids = Immutable.Set(['1.1.2.3.5', '3.1.4.1.5']);
    const expectedAction = { ids, type: ADD_ALL_NODE_IDS };

    expect(addAllNodeIds(ids)).to.deep.equal(expectedAction);
  });

  it('toggleNode - should create an action to toggle a node by id', () => {
    const id = '1.2.3';
    const expectedAction = { id, type: TOGGLE_NODE_STATE };

    expect(toggleNode(id)).to.deep.equal(expectedAction);
  });

  it('collapseNode - should create an action to collapse a node by id', () => {
    const id = '1.2.3';
    const expectedAction = { id, type: COLLAPSE_NODE };

    expect(collapseNode(id)).to.deep.equal(expectedAction);
  });

  it('expandNode - should create an action to expand a node by id', () => {
    const id = '1.2.3';
    const expectedAction = { id, type: EXPAND_NODE };

    expect(expandNode(id)).to.deep.equal(expectedAction);
  });

  it('collapseAllNodes - should create an action to collapse all nodes', () => {
    const expectedAction = { type: COLLAPSE_ALL_NODES };

    expect(collapseAllNodes()).to.deep.equal(expectedAction);
  });

  it('expandAllNodes - should create an action to expand all nodes', () => {
    const expectedAction = { type: EXPAND_ALL_NODES };

    expect(expandAllNodes()).to.deep.equal(expectedAction);
  });

  it('collapseDescendants - should create an action to collapse all descendants for some node id', () => {
    const id = '0.0';
    const expectedAction = { id, type: COLLAPSE_DESCENDANTS };

    expect(collapseDescendants(id)).to.deep.equal(expectedAction);
  });

  it('expandPathToNode - should create an action to expand a path to a node id', () => {
    const id = '0.0';
    const expectedAction = { id, type: EXPAND_PATH_TO_NODE };

    expect(expandPathToNode(id)).to.deep.equal(expectedAction);
  });
});

describe('ui reducer', () => {
  it('should return the initial state', () => {
    expect(uiReducer(undefined, {})).to.deep.equal({
      expandableNodeIds: Immutable.Set(),
      expandedNodeIds: Immutable.Set(),
      exploded: false,
    });
  });

  it('should handle ADD_ALL_NODE_IDS', () => {
    const { expandableNodeIds } = uiReducer(
      { expandableNodeIds: Immutable.Set() },
      { type: ADD_ALL_NODE_IDS, ids: Immutable.Set(['2.4.6', '1.3.5']) }
    );

    expect(expandableNodeIds.size).to.equal(2);
    expect(expandableNodeIds.has('2.4.6')).to.be.true;
    expect(expandableNodeIds.has('1.3.5')).to.be.true;
  });

  describe('TOGGLE_NODE_STATE', () => {
    it('should collapse a node if it is expanded', () => {
      const { expandedNodeIds } = uiReducer(
        { expandedNodeIds: Immutable.Set(['1.2.3']) },
        { type: TOGGLE_NODE_STATE, id: '1.2.3' }
      );

      expect(expandedNodeIds.has('1.2.3')).to.be.false;
    });

    it('should expand a node if is collapsed', () => {
      const { expandedNodeIds } = uiReducer(
        { expandedNodeIds: Immutable.Set() },
        { type: TOGGLE_NODE_STATE, id: '1.2.3' }
      );

      expect(expandedNodeIds.has('1.2.3')).to.be.true;
    });

    it('should set exploded to false when collapsing a node', () => {
      const { exploded } = uiReducer(
        { expandedNodeIds: Immutable.Set(['1.2.3']), expandableNodeIds: Immutable.Set(['1.2.3']) },
        { type: TOGGLE_NODE_STATE, id: '1.2.3' }
      );

      expect(exploded).to.be.false;
    });

    it('should set exploded to true when expanding a node if it is the last expandable node', () => {
      const { exploded } = uiReducer(
        { expandedNodeIds: Immutable.Set([]), expandableNodeIds: Immutable.Set(['1.2.3']) },
        { type: TOGGLE_NODE_STATE, id: '1.2.3' }
      );

      expect(exploded).to.be.true;
    });
  });

  describe('expand logic', () => {
    it('should handle EXPAND_NODE', () => {
      const { expandedNodeIds } = uiReducer(
        { expandedNodeIds: Immutable.Set([]), expandableNodeIds: Immutable.Set([]) },
        { type: EXPAND_NODE, id: '1.2.3' }
      );

      expect(expandedNodeIds.has('1.2.3')).to.be.true;
    });

    it('should handle EXPAND_ALL_NODES', () => {
      const { expandedNodeIds, expandableNodeIds, exploded } = uiReducer(
        { expandableNodeIds: Immutable.Set(['1.2.3', '2.3.4', '3.4.5']) },
        { type: EXPAND_ALL_NODES }
      );

      expect(exploded).to.be.true;
      expect(expandedNodeIds).to.deep.equal(expandableNodeIds);
    });

    it('should explode state when the last expandable node is expanded', () => {
      const { exploded } = uiReducer(
        { expandableNodeIds: Immutable.Set(['0', '1', '2']), expandedNodeIds: Immutable.Set(['0', '1']) },
        { type: EXPAND_NODE, id: '2' }
      );

      expect(exploded).to.be.true;
    });
  });

  it('should handle COLLAPSE_NODE', () => {
    const { expandedNodeIds } = uiReducer(
      { expandedNodeIds: Immutable.Set(['1.2.3']) },
      { type: COLLAPSE_NODE, id: '1.2.3' }
    );

    expect(expandedNodeIds.has('1.2.3')).to.be.false;
  });


  it('should handle COLLAPSE_ALL_NODES', () => {
    const { expandedNodeIds } = uiReducer(
      { expandedNodeIds: Immutable.Set(['1.2.3', '2.3.4', '3.4.5']) },
      { type: COLLAPSE_ALL_NODES }
    );

    expect(expandedNodeIds.isEmpty()).to.be.true;
  });

  it('should handle COLLAPSE_DESCENDANTS', () => {
    const node = '0.0';
    const sibling = '0.1';
    const child1 = '0.0.0';
    const child2 = '0.0.1';

    const { expandedNodeIds } = uiReducer(
      { expandedNodeIds: Immutable.Set([ node, sibling, child1, child2 ]) },
      { id: node, type: COLLAPSE_DESCENDANTS }
    );

    expect(expandedNodeIds.has(node)).to.be.true;
    expect(expandedNodeIds.has(sibling)).to.be.true;
    expect(expandedNodeIds.has(child1)).to.be.false;
    expect(expandedNodeIds.has(child2)).to.be.false;
  });

  it('should handle EXPAND_PATH_TO_NODE', () => {
    const id = '0.0.0.0';
    const expectedIds = Immutable.Set(['0', '0.0', '0.0.0', '0.0.0.0']);
    const { expandedNodeIds } = uiReducer(undefined, { id, type: EXPAND_PATH_TO_NODE });

    expect(expandedNodeIds.equals(expectedIds)).to.be.true;
  });
});

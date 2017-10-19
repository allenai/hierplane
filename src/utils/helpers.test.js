import { isSingleSegment, getCollapsibleNodeIds } from './helpers';

import { expect } from 'chai';
import Immutable from 'immutable';

const singleSegmentTree = {
  children: [{
    children: [{
      children: [],
      id: '0.0.0',
      kind: 'symbol',
    }, {
      children: [{
        children: [{
          children: [],
          id: '0.0.1.0.0',
          kind: 'const',
        }, {
          children: [],
          id: '0.0.1.0.1',
          kind: 'const',
        }],
        id: '0.0.1.0',
        kind: 'sequence',
      }],
      id: '0.0.1',
      kind: 'detail',
    }],
    id: '0.0',
    kind: 'entity',
  }],
  id: '0',
  kind: 'event',
};

const multiSegmentTree = {
  children: [{
    children: [{
      children: [],
      id: '0.0.0',
      kind: 'entity',
    }, {
      children: [],
      id: '0.0.1',
      kind: 'detail',
    }],
    id: '0.0',
    kind: 'event',
  }, {
    children: [{
      children: [{
        children: [],
        id: '0.1.0.0',
        kind: 'symbol',
      }],
      id: '0.1.0',
      kind: 'entity',
    }, {
      children: [],
      id: '0.1.1',
      kind: 'detail',
    }],
    id: '0.1',
    kind: 'event',
  }],
  id: '0',
  kind: 'top-level-and',
};

describe('isSingleSegment', () => {
  it('returns false if the root node in a parse tree is either "top-level-and" or "and"', () => {
    expect(isSingleSegment("top-level-and")).to.be.false;
    expect(isSingleSegment("and")).to.be.false;
  });

  it('returns true if the root node in a parse tree is not "top-level-and" or "and"', () => {
    expect(isSingleSegment("event")).to.be.true;
  })
});

describe('getCollapsibleNodeIds', () => {
  it('only returns collapsible node ids for single segmented parse trees', () => {
    const expectedNodeIds = Immutable.Set(['0.0','0.0.1','0.0.1.0']);
    const collapsibleIds = getCollapsibleNodeIds(singleSegmentTree, true);
    expect(collapsibleIds.equals(expectedNodeIds)).to.be.true;
  });

  it('only returns collapsible node ids for multi-segmented parse trees', () => {
    const expectedNodeIds = Immutable.Set(['0.1.0']);
    const collapsibleIds = getCollapsibleNodeIds(multiSegmentTree, false);
    expect(collapsibleIds.equals(expectedNodeIds)).to.be.true;
  });
});

import {
  assignNodeIds,
  findAllNodeTypes,
  getCollapsibleNodeIds,
  generateStylesForNodeTypes,
  isSingleSegment,
  translateSpans
} from './helpers';

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

describe('assignNodeIds', () => {
  it('does not overwrite existing ids', () => {
    const tree = {
      id: 'hi',
      children: [ {}, { id: 'foo' } ]
    };
    const withIds = assignNodeIds(tree);
    expect(withIds.id).to.equal('hi');
    expect(withIds.children[0].id).to.equal('hi.0');
    expect(withIds.children[1].id).to.equal('foo');
  });

  it('does not mutate the original object', () => {
    const tree = {};
    const withIds = assignNodeIds(tree);
    expect(withIds.id).to.equal('0');
    expect(tree.id).to.be.undefined;
  });

  it('assigns ids as expected', () => {
    const tree = {
      children: [
        { children: [ {}, {} ] },
        { children: [ {} ] },
        {}
      ]
    };
    const expectedTree = {
      id: '0',
      children: [
        {
          id: '0.0',
          children: [
            { id: '0.0.0' },
            { id: '0.0.1' }
          ]
        },
        {
          id: '0.1',
          children: [
            { id: '0.1.0' }
          ]
        },
        { id: '0.2' }
      ]
    }
    expect(assignNodeIds(tree)).to.deep.equal(expectedTree);''
  });

  describe('findAllNodeTypes', () => {
    it('returns all node types in a given tree', () => {
      const tree = {
        nodeType: 1,
        children: [
          { nodeType: 2 },
          { nodeType: 2 },
          {
            nodeType: 3,
            children: [ { nodeType: 4 } ]
          },
        ]
      };
      expect(findAllNodeTypes(tree).toJS()).to.deep.equal([ 1, 2, 3, 4 ]);
    });
  });

  describe('generateStylesForNodeTypes', () => {
    it('returns a style for each node type', () => {
      const nodeTypes = Immutable.Set([ 1, 2, 3, 4, 5, 6, 7, 8 ]);
      const expectedStyles = {
        '1': [ 'color1' ],
        '2': [ 'color2' ],
        '3': [ 'color3' ],
        '4': [ 'color4' ],
        '5': [ 'color5' ],
        '6': [ 'color6' ],
        '7': [ 'color1' ],
        '8': [ 'color2' ]
      };
      expect(generateStylesForNodeTypes(nodeTypes)).to.deep.equal(expectedStyles);
    });
  });

  describe('translateSpans', () => {
    it('translates the `spans` protocol to `alternateParseInfo` as expected', () => {
      const treeWithSpans = {
        spans: [ { start: 10, end: 13 } ],
        children: [
          { spans: [ { start: 0, end: 10 } ] },
          { spans: [ { start: 13, end: 15 }, { start: 15, end: 17 } ] }
        ]
      };
      const expectedTranslatedTree = {
        spans: [ { start: 10, end: 13 } ],
        alternateParseInfo: {
          charNodeRoot: { charLo: 0, charHi: 17 },
          spanAnnotations: [
            { lo: 0, hi: 10, spanType: 'child' },
            { lo: 10, hi: 13, spanType: 'self' },
            { lo: 13, hi: 17, spanType: 'child' },
          ]
        },
        children: [
          {
            alternateParseInfo: {
              charNodeRoot: { charLo: 0, charHi: 10 },
              spanAnnotations: [ { lo: 0, hi: 10, spanType: 'self' } ]
            },
            spans: [ { start: 0, end: 10 } ]
          },
          {
            alternateParseInfo: {
              charNodeRoot: { charLo: 13, charHi: 17 },
              spanAnnotations: [ { lo: 13, hi: 15, spanType: 'self' }, { lo: 15, hi: 17, spanType: 'self' } ]
            },
            spans: [ { start: 13, end: 15 }, { start: 15, end: 17 } ]
          }
        ]
      };
      expect(translateSpans(treeWithSpans)).to.deep.equal(expectedTranslatedTree);
    });
  })
});

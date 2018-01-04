# Hierplane

A javascript library for visualizing hierarchical data, specifically tailored towards rendering
dependency parses.

## Table of Contents

* [Usage](#usage)
* [Tree structure](#tree-structure)
* [Style Maps](#maps)
* [Contributing](#contributing)
* [Publishing](#publishing)

## <a name="usage"></a>Usage

There are two ways to use `hierplane`:

* [In a web page, without dependencies](#web)
* [In a web application that uses ReactJS](#web-react)

### <a name="web"></a>In a web page:

Add the following `<script>` tag to your web page:

```
<script src="//unpkg.com/hierplane/dist/static/hierplane.min.js"></script>
```

Add the following styles to your web page, likely in the `<head />` tag:

```
<link rel="stylesheet" type="text/css" href="//unpkg.com/hierplane/dist/static/hierplane.min.css">
```

Then invoke `hierplane.renderTree(tree[, target])` as is desired.

   - `tree` *object* the tree to visualize, see <a href="#tree-structure">a detailed description of
     the tree structure.</a>
   - `target` *string* an optional css selector, specifying the element into which the visualization
     should be rendered. If not specified, the tree is rendered into the `<body />`.
   - `theme` *string* an optional custom theme. By not specifying a theme, the default "dark" theme
     will be used. There is a "light" theme built-in that can be applied by setting `theme: "light"`.

You can see a full example [here](./EXAMPLES.md).

### <a name="web-react"></a>In a web application that uses ReactJS:

Install the hierplane dependency:

```
npm install --save hierplane
```

Then, simply import the `Tree` component, and pass it the tree you'd like to render:

```
import { Tree } from 'hierplane';
import React from 'react';

const aTree = { ... };

class TreeContainer extends React.PureComponent {
  render() {
    return <Tree tree={aTree} />;
  }
}
```

## <a name="tree-structure"></a>Tree Structure

A `tree` is an `object` with the following structure:

```
/**
 * @type object
 */
Tree
  /**
   * The text being visualized.
   * @type string
   * @required
   */
  text: 'Sam likes eating hot dogs.'
  /**
   * Map used to apply node styles (see `Style Maps` section).
   * @type object
   * @optional
   */
  nodeTypeToStyle: { ... }
  /**
   * Map used to set node positioning (see `Style Maps` section).
   * @type object
   * @optional
   */
  linkToPosition: { ... }
  /**
   * Map use to override link labels (see `Style Maps` section).
   * @type object
   * @optional
   */
  linkNameToLabel: { ... }
  /**
   * The root node of the tree.
   * @type object
   * @required
   */
  root: Node { ... }
```

The `root` property refers to the root node of the tree to be visualized. Each `node` has the following
structure:

```
/**
 * @type object
 */
Node
  /**
   * The text content of the node
   * @type string
   * @required
   *
   * TODO: This will likely be migrated to be named `text` in a future version, as it's less specific.
   */
  word: 'eating'
  /**
   * A string specifying the "type" of node. This is used to determine it's color -- all nodes of
   * the same type will be assigned the same color.
   * @type string
   * @required
   */
  nodeType: 'verb'
  /**
   * A string specifying describing the relationship between the node and it's parent. This text
   * will be displayed on an element connecting the node and it's parent.
   * @type string
   * @optional
   */
  link: 'direct object'
  /**
   * An array of strings, which will be displayed on the node.
   * @type string[]
   * @optional
   */
  attributes: [ 'action', ... ]
  /**
   * An array of spans, where each span represents a series of characters in the `text` property (
   * of the Tree) that should be highlighted when the node is hovered.
   * @type object[]
   * @optional
   */
  spans: [ Span { ... }, ... ]
  /**
   * An array containing the children of the node.
   * @type object[]
   * @optional
   */
  children: [ Node, ... ]
```

Each `span` refers to a sequence of characters in the original sentence (the `text` property of the
`Tree`) that should be highlighted when the node and is hovered. Each `span` should have the
following properties:

```
Span
  /**
   * The index indicating where the span begins.
   * @type number
   * @required
   */
  start
  /**
   * The index (exclusive) where the span ends.
   * @type number
   * @required
   */
  end
  /**
   * An optional identifier indicating the type of span. As of now, the only value you'll likely
   * put here is "ignored", which indicates that the span shouldn't be emphasized when the node
   * is hovered.
   * @type string
   * @optional
   */
  spanType
```

You can see a full example of a tree [here](dev/data/the-sum-of-three-consecutive-integers.json).

## <a name="maps"></a>Style Maps

The Hierplane data format supports three optional style maps (objects containing a set of key-value pairs) that can be added to a `Tree` object:

*  [`nodeTypeToStyle`](#nodetypetostyle) applies specified styles to nodes with particular `nodeType` values.
*  [`linkToPosition`](#linktoposition) tells the app how to position nodes with particular `link` values.
*  [`linkNameToLabel`](#linknametolabel) translates particular `link` values into custom display labels.

### <a name="nodetypetostyle"></a>nodeTypeToStyle

A `nodeTypeToStyle` mapping applies specified styles to nodes with particular `nodeType` values. In the following example, any node with a `nodeType` value of `"verb"` will have `"color1"` and `"strong"` styles applied. This gets rendered as CSS modifier classes.

```
"nodeTypeToStyle": {
  "verb": ["color1", "strong"],
  "noun": ["color2"],
  "modifier": ["color3"],
  "sequence": ["seq"],
  "reference": ["placeholder"]
}
```

**Supported nodeTypeToStyle Keys:**

Any potential `nodeType` value is a valid key, whether it's being used in the current tree or not.

**Supported nodeTypeToStyle Values:**

Valid values are arrays of strings. While you are free to apply any string as a style, only the following strings are supported by the built-in stylesheet:

* `"color0"` colors node gray.
* `"color1"` colors node green.
* `"color2"` colors node blue.
* `"color3"` colors node pink.
* `"color4"` colors node yellow.
* `"color5"` colors node purple.
* `"color6"` colors node aqua.
* `"strong"` makes node text larger and bold.
* `"seq"` renders node as a sequence container. Note that this style is required for nodes that have any children with a `nodeType` value of `"inside"`. Also note that a node with this style will have its default node `text` hidden to make room for its `"inside"` children.
* `"placeholder"` renders node with a transparent background and light dotted outline (to communicate a placeholder status, recommended for certain linguistic concepts such as relative references).

Note: at this time, the only supported colors are the 7 mentioned above.

### <a name="linktoposition">linkToPosition

A `linkToPosition` mapping tells the app how to position nodes with particular `link` values. In the following example, any node with a link value of `"subj"` will be given a position of `"left"`, while nodes with link values of `"obj"` will be given a position of `"right"` and so on.

```
"linkToPosition": {
  "subj": "left",
  "obj": "right",
  "seqChild": "inside"
}
```

**Supported linkToPosition Keys:**

Any potential `link` value is a valid key, whether it's being used in the current tree or not.

**Supported linkToPosition Values:**

* `inside` - Positions node inside of its parent. This was added mainly to support linguistic sequences (e.g. "The land has trees, grass, and animals." where the object of the sentence is a sequence of nouns).

* `left` - Positions a node to the left of its parent (well suited for subjects of a sentence).

* `right` - Positions a node to the right of its parent (well suited for objects of a sentence).

* `down` - Positions a node directly underneath its parent (we call this layout "canonical"). All nodes have a position of `down` by default, so it is not necessary to explicitly set this.

### <a name="linknametolabel">linkNameToLabel

A `linkNameToLabel` mapping translates particular `link` values into custom display labels. In the following example, any node with a `link` value of `"subj"` will be displayed as `"S"`. This is especially useful for nodes positioned `"left"` and `"right"`, as those configurations lose aesthetic value with long link labels.

```
"linkNameToLabel": {
  "subj": "S",
  "obj": "O"
}
```

**Supported linkNameToLabel Keys:**

Any potential `link` value is a valid key, whether it's being used in the current tree or not.

**Supported linkNameToLabel Values:**

Any string is a valid value.

## <a name="contributing"></a>Contributing

To run the code locally and verify your changes, follow these steps:

1. Clone the repository.

  ```
  $ git clone git@github.com:allenai/hierplane.git
  ```

2. Install [nodejs](https://nodejs.org/en/). This was built against version `v6.11.5`. You're free
   to try something more recent.

3. Install the dependencies:

  ```
  $ cd hierplane/
  $ npm install
  ```

4. Run the `watch` target:

  ```
  $ npm start
  ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser of choice.

If you want to change the port on which the webserver is bound, set the `HIERPLANE_DEV_SERVER_PORT`
environment variable to one of your choosing.

## <a name="publishing"></a>Publishing

In order to publish, you will need to be a collaborator on the [Hierplane NPM project](https://www.npmjs.com/package/hierplane).

1. Make sure to increment the Hierplane version in `package.json`.
2. If you're not already logged in, from your `hierplane` project folder, enter `npm login` and log in with your NPM credentials.
3. Execute `node bin/publish.js`.

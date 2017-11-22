# Hierplane

A javascript library for visualizing hierarchical data, specifically tailored towards rendering
dependency parses.

## Usage

There are three ways to use `hierplane`:

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
   - `target` *string* an optional css selector, speicfying the element into which the visualization
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

## Contributing

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

## Publishing

To publish a new version, increment the version in `package.json` and execute `bin/publish.js`.

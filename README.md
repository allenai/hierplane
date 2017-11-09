# Hierplane

A javascript library for visualizing hierarchical data, specifically tailored towards rendering
dependency parses.

## Usage

There are three ways to use `hierplane`:

* [In a webpage, without dependencies](#web)
* [In a web application that uses ReactJS](#web-react)

### <a name="web"></a>In a Webpage:

Add the following `<script>` tag to your webpage:

```
<script src="//unpkg.com/hierplane/dist/static/hierplane.min.js"></script>
```

Add the following styles to your webpage, likely in the `<head />` tag:

```
<link rel="stylesheet" type="text/css" href="//unpkg.com/hierplane/dist/static/hierplane.min.css">
```

Then invoke `hierplane.renderTree(tree[, target])` as is desired.

   - `tree` *object* the tree to visualize
   - `target` *string* an optional css selector, speicfying the element into which the vizualization
     should be rendered. If not specified, the tree is rendered into the `<body />`.

Here's a full example:

```
<!DOCTYPE html><html>
  <head>
    <title>Hierplane!</title>
    <link rel="stylesheet" type="text/css" href="//unpkg.com/hierplane/dist/static/hierplane.min.css">
  </head>
  <body>
    <script src="//unpkg.com/hierplane/dist/static/hierplane.min.js"></script>
    <script>
      const tree = {
        text: 'Sam likes bananas',
        root: {
          nodeType: 'event',
          word: 'like',
          children: [
            {
              nodeType: 'entity',
              word: 'Sam',
              link: 'subject',
              attributes: [ 'Person' ]
            },
            {
              nodeType: 'entity',
              word: 'banana',
              link: 'object',
              attributes: [ '>1']
            }
          ]
        }
      };
      hierplane.renderTree(tree);
    </script>
  </body>
</html>
```

### <a name="web-react">In a ReactJS based Web Application

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

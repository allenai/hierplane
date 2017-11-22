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

   - `tree` *object* the tree to visualize
   - `target` *string* an optional css selector, speicfying the element into which the visualization
     should be rendered. If not specified, the tree is rendered into the `<body />`.
   - `theme` *string* an optional custom theme. By not specifying a theme, the default "dark" theme
     will be used. There is a "light" theme built-in that can be applied by setting `theme: "light"`.

You can see a full example [here](./EXAMPLES.md).

### <a name="web-react">In a web application that uses ReactJS:

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

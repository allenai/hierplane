# hierplane

A tool for visualizing trees, tailored specifically to the analysis of parse trees.

Proudly built by the [Euclid](http://euclid.allenai.org) team at [AI2](http://allenai.org).

## Getting Started

1. Clone the repository:

  ```
  $ git clone git@github.com:allenai/hierplane.igt
  ```

2. Install [nodejs](https://nodejs.org/en/).

3. Run the build:

  ```
  $ npm run build
  ```

4.Run the visualization engine:

  ```
  $open dist/index.html
  ```

## Making Changes

Run the `watch` target instead of `build`, which will automatically rebuild artifacts as you
make changes:

```
npm run watch
```

Once you're done with your changes, run the tests to confirm nothing is broken:

```
npm run test
```

## Using raw JSON data

TBD

## Using your own API

TBD

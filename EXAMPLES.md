# Examples

## In a web page:

Here's an example, showing how the dependency parse for the sentence `"Sam likes bananas"` can be
rendered using `hierplane`:

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
          spans: [
            {
              start: 4,
              end: 9
            }
          ],
          children: [
            {
              nodeType: 'entity',
              word: 'Sam',
              link: 'subject',
              attributes: [ 'Person' ],
              spans: [
                {
                  start: 0,
                  end: 3
                }
              ]
            },
            {
              nodeType: 'entity',
              word: 'banana',
              link: 'object',
              attributes: [ '>1'],
              spans: [
                {
                  start: 10,
                  end: 17
                }
              ]
            }
          ]
        }
      };
      hierplane.renderTree(tree);
    </script>
  </body>
</html>
```

// // Detect touch (mobile)
// function isTouchDevice() {
//   return 'ontouchstart' in document.documentElement;
// }
//
// if (!isTouchDevice()) {
//
// }

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

hierplane.renderTree(tree, { target: "#tree" });

// Initialize Syntax Highlighting
hljs.initHighlightingOnLoad();

// Animate anchor scrolling w/ ease
const scroll = new SmoothScroll('a.js-scroll[href*="#"]', {
  speed: 300,
  easing: 'easeInOutQuint'
});

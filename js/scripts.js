// // Detect touch (mobile)
// function isTouchDevice() {
//   return 'ontouchstart' in document.documentElement;
// }
//
// if (!isTouchDevice()) {
//
// }

// Initialize Syntax Highlighting
hljs.initHighlightingOnLoad();

// Animate anchor scrolling w/ ease
const scroll = new SmoothScroll('a.js-scroll[href*="#"]', {
  speed: 300,
  easing: 'easeInOutQuint'
});

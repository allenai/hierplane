// Testing if page width is mobile size.
function testPageWidth() {
  const breakPoint = 680,
        treeContainer = document.getElementById("tree"),
        trees = document.getElementsByClassName("hierplane");

  // If desktop screen width:
  if (window.innerWidth >= breakPoint) {
    // If no trees exist
    if (trees.length === 0) {
      // Initialize Hierplane with data (see treeData.js)
      hierplane.renderTree(treeData, { target: "#tree" });
    }
    // If #tree container has mobile class
    if (tree.classList.contains("mobile")) {
      // Remove mobile class
      treeContainer.classList.remove("mobile");
    }
  // Otherwise, if mobile screen width:
  } else {
    // Loop through .hierplane instances
    while(trees[0]) {
      // Remove each .hierplane
      trees[0].parentNode.removeChild(trees[0]);
    }
    // Add mobile class
    treeContainer.classList.add("mobile");
  }
}

// On load
testPageWidth();
// Initialize Syntax Highlighting
hljs.initHighlightingOnLoad();

// On resize
window.addEventListener("resize", function() {
  testPageWidth();
});

// Animate anchor scrolling w/ ease
const scroll = new SmoothScroll('a.js-scroll[href*="#"]', {
  speed: 300,
  easing: "easeInOutQuint"
});

// Toggle MOW menu
let mowActive = false;
const headerNav = document.querySelector(".header__nav"),
      activeClass = "header__nav--mow-active";

document.getElementById("header__mow-nav-trigger").onclick = function() {
  if (!mowActive) {
    headerNav.classList.add(activeClass);
    mowActive = true;
  } else {
    headerNav.classList.remove(activeClass);
    mowActive = false;
  }
}

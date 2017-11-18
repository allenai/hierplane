// Testing if page width is mobile size.
function testPageWidth() {
  const breakPoint = 680,
        treeContainer = document.getElementById("tree"),
        trees = document.getElementsByClassName("hierplane");

  // If desktop screen width:
  if (window.innerWidth >= breakPoint) {
    // If no trees exist
    if (trees.length === 0 && pageId === "home") {
      // Initialize Hierplane with data (see treeData.js)
      hierplane.renderTree(introData, { target: "#tree" });
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

// Adding nav selection if link matches page
function matchPage(e) {
  if (e.getAttribute("data-page") === pageId) {
    e.classList.add("nav__item--active");
  }
}

// Set pageId and call matchPage
const navLinks = Array.prototype.slice.call(document.querySelectorAll(".header__nav .nav__item[data-page]"));
if (document.body.hasAttribute("data-page")) {
  pageId = document.body.getAttribute("data-page");
  navLinks.forEach(matchPage);
}

testPageWidth();
// Initialize Syntax Highlighting
hljs.initHighlightingOnLoad();

// On resize
window.addEventListener("resize", function() {
  testPageWidth();
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

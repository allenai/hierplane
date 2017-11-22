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

// Initializing Hierplane
hierplane.renderTree(introData, { target: "#tree" });

// Initialize Syntax Highlighting
hljs.initHighlightingOnLoad();

// Toggle MOW menu
const headerNav = document.querySelector(".header__nav");

document.addEventListener(document.getElementById("header__mow-nav-trigger"), 'click', function() {
  headerNav.classList.toggle("header__nav--mow-active")
});

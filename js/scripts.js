// Hero Tree Example data
const treeData = {
  "text": "Hierplane is a great tool for visualizing linguistic structures. Try it for yourself!",
  "nodeTypeToStyle": {
    "top-level-and": ["node--segments-container"],
    "adjective": ["color3"],
    "article": ["color3"],
    "implied": ["placeholder"],
    "noun": ["color2"],
    "sequence": ["seq"],
    "verb": ["color1", "strong"]
  },
  "linkToPosition": {
    "seqChildAnd": "inside",
    "subj": "left",
    "obj": "right",
    "parg": "right"
  },
  "linkNameToLabel": {
    "seqChildAnd": "and",
    "subj": "S",
    "obj": "O",
    "parg": "O"
  },
  "root": {
    "nodeType": "top-level-and",
    "word": "and",
    "link": "none",
    "alternateParseInfo": {
      "charNodeRoot": {
        "charLo": 0,
        "charHi": 85
      },
      "spanAnnotations": [{
        "spanType": "child",
        "lo": 0,
        "hi": 63
      }, {
        "spanType": "ignored",
        "lo": 63,
        "hi": 64
      }, {
        "spanType": "child",
        "lo": 65,
        "hi": 84
      }, {
        "spanType": "ignored",
        "lo": 84,
        "hi": 85
      }]
    },
    "children": [{
      "nodeType": "verb",
      "word": "is",
      "link": "none",
      "alternateParseInfo": {
        "charNodeRoot": {
          "charLo": 0,
          "charHi": 63
        },
        "spanAnnotations": [{
          "spanType": "child",
          "lo": 0,
          "hi": 9
        }, {
          "spanType": "self",
          "lo": 10,
          "hi": 12
        }, {
          "spanType": "child",
          "lo": 13,
          "hi": 25
        }, {
          "spanType": "child",
          "lo": 26,
          "hi": 63
        }]
      },
      "children": [{
        "nodeType": "noun",
        "word": "Hierplane",
        "link": "subj",
        "alternateParseInfo": {
          "charNodeRoot": {
            "charLo": 0,
            "charHi": 9
          },
          "spanAnnotations": [{
            "spanType": "self",
            "lo": 0,
            "hi": 9
          }]
        }
      }, {
        "nodeType": "noun",
        "word": "tool",
        "link": "obj",
        "alternateParseInfo": {
          "charNodeRoot": {
            "charLo": 13,
            "charHi": 25
          },
          "spanAnnotations": [{
            "spanType": "child",
            "lo": 13,
            "hi": 14
          }, {
            "spanType": "child",
            "lo": 15,
            "hi": 20
          }, {
            "spanType": "self",
            "lo": 21,
            "hi": 25
          }]
        },
        "children": [{
          "nodeType": "article",
          "word": "a",
          "link": "article",
          "attributes": ["Indefinite"],
          "alternateParseInfo": {
            "charNodeRoot": {
              "charLo": 13,
              "charHi": 14
            },
            "spanAnnotations": [{
              "spanType": "self",
              "lo": 13,
              "hi": 14
            }]
          }
        },{
          "nodeType": "adjective",
          "word": "great",
          "link": "adj",
          "alternateParseInfo": {
            "charNodeRoot": {
              "charLo": 15,
              "charHi": 20
            },
            "spanAnnotations": [{
              "spanType": "self",
              "lo": 15,
              "hi": 20
            }]
          }
        }]
      }, {
        "nodeType": "adjective",
        "word": "for",
        "link": "preposition",
        "alternateParseInfo": {
          "charNodeRoot": {
            "charLo": 26,
            "charHi": 63
          },
          "spanAnnotations": [{
            "spanType": "self",
            "lo": 26,
            "hi": 29
          }, {
            "spanType": "child",
            "lo": 30,
            "hi": 63
          }]
        },
        "children": [{
          "nodeType": "verb",
          "word": "visualizing",
          "attributes": ["Participle Clause"],
          "link": "parg",
          "alternateParseInfo": {
            "charNodeRoot": {
              "charLo": 30,
              "charHi": 63
            },
            "spanAnnotations": [{
              "spanType": "self",
              "lo": 30,
              "hi": 41
            }, {
              "spanType": "child",
              "lo": 42,
              "hi": 63
            }]
          },
          "children": [{
            "nodeType": "noun",
            "word": "structures",
            "link": "obj",
            "alternateParseInfo": {
              "charNodeRoot": {
                "charLo": 42,
                "charHi": 63
              },
              "spanAnnotations": [{
                "spanType": "child",
                "lo": 42,
                "hi": 52
              }, {
                "spanType": "self",
                "lo": 53,
                "hi": 63
              }]
            },
            "children": [{
              "nodeType": "adjective",
              "word": "linguistic",
              "link": "adj",
              "alternateParseInfo": {
                "charNodeRoot": {
                  "charLo": 42,
                  "charHi": 52
                },
                "spanAnnotations": [{
                  "spanType": "self",
                  "lo": 42,
                  "hi": 52
                }]
              }
            }]
          }]
        }]
      }]
    }, {
      "nodeType": "verb",
      "word": "Try",
      "attributes": ["Imperative"],
      "link": "none",
      "alternateParseInfo": {
        "charNodeRoot": {
          "charLo": 65,
          "charHi": 84
        },
        "spanAnnotations": [{
          "spanType": "self",
          "lo": 65,
          "hi": 69
        }, {
          "spanType": "child",
          "lo": 69,
          "hi": 71
        }, {
          "spanType": "child",
          "lo": 72,
          "hi": 84
        }]
      },
      "children": [{
        "nodeType": "implied",
        "word": "you",
        "link": "subj"
      }, {
        "nodeType": "noun",
        "word": "it",
        "link": "obj",
        "alternateParseInfo": {
          "charNodeRoot": {
            "charLo": 69,
            "charHi": 71
          },
          "spanAnnotations": [{
            "spanType": "self",
            "lo": 69,
            "hi": 71
          }]
        }
      }, {
        "nodeType": "adjective",
        "word": "for",
        "link": "preposition",
        "alternateParseInfo": {
          "charNodeRoot": {
            "charLo": 72,
            "charHi": 84
          },
          "spanAnnotations": [{
            "spanType": "self",
            "lo": 72,
            "hi": 75
          }, {
            "spanType": "child",
            "lo": 76,
            "hi": 84
          }]
        },
        "children": [{
          "nodeType": "noun",
          "word": "yourself",
          "link": "parg",
          "alternateParseInfo": {
            "charNodeRoot": {
              "charLo": 76,
              "charHi": 84
            },
            "spanAnnotations": [{
              "spanType": "self",
              "lo": 76,
              "hi": 84
            }]
          }
        }]
      }]
    }]
  }
};

// Testing if page width is mobile size.
function testWidth() {
  const breakPoint = 680,
        treeContainer = document.getElementById("tree"),
        trees = document.getElementsByClassName("hierplane");

  // If desktop screen width:
  if (window.innerWidth >= breakPoint) {
    // If no trees exist
    if (trees.length === 0) {
      // Initialize Hierplane
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
testWidth();

// On resize
window.addEventListener("resize", function() {
  testWidth();
});

// Initialize Syntax Highlighting
hljs.initHighlightingOnLoad();

// Animate anchor scrolling w/ ease
const scroll = new SmoothScroll('a.js-scroll[href*="#"]', {
  speed: 300,
  easing: "easeInOutQuint"
});

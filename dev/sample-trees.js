/**
 * Sample trees to be used while developing locally, using `dev/static.html`.
 */
const hpdev = {};
(function() {

  //
  // Private / Local Context
  //

  const sampleTrees = [
    {
      "text": "The sum of three consecutive odd integers is 9. What is the largest integer?",
      "root": {
        "nodeType": "top-level-and",
        "word": "and",
        "children": [
          {
            "nodeType": "event",
            "word": "be",
            "spans": [
              {
                "start": 42,
                "end": 46
              }
            ],
            "children": [
              {
                "nodeType": "entity",
                "word": "sum",
                "spans": [
                  {
                    "start": 0,
                    "end": 7
                  }
                ],
                "attributes": ["the"],
                "link": "subj",
                "children": [
                  {
                    "nodeType": "detail",
                    "word": "of",
                    "spans": [
                      {
                        "start": 8,
                        "end": 10
                      }
                    ],
                    "link": "adj",
                    "children": [
                      {
                        "nodeType": "entity",
                        "word": "integer",
                        "spans": [
                          {
                            "start": 11,
                            "end": 16
                          },
                          {
                            "start": 33,
                            "end": 41
                          }
                        ],
                        "attributes": [">1"],
                        "link": "parg",
                        "children": [
                          {
                            "nodeType": "numericstring",
                            "word": "3",
                            "link": "quant"
                          },
                          {
                            "nodeType": "sequence",
                            "word": "sequence",
                            "link": "adj",
                            "children": [
                              {
                                "nodeType": "detail",
                                "word": "consecutive",
                                "spans": [
                                  {
                                    "start": 17,
                                    "end": 28
                                  }
                                ],
                                "link": "seqChild"
                              },
                              {
                                "nodeType": "detail",
                                "word": "odd",
                                "spans": [
                                  {
                                    "start": 29,
                                    "end": 32
                                  }
                                ],
                                "link": "seqChild"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "nodeType": "numericstring",
                "word": "9",
                "link": "obj"
              }
            ]
          },
          {
            "nodeType": "event",
            "word": "be",
            "attributes": ["linking"],
            "link": "none",
            "spans": [
              {
                "start": 53,
                "end": 55
              }
            ],
            "children": [
              {
                "nodeType": "entity",
                "word": "what",
                "spans": [
                  {
                    "start": 48,
                    "end": 52
                  }
                ],
                "link": "subj",
              },
              {
                "nodeType": "detail",
                "word": "large",
                "spans": [
                  {
                    "start": 56,
                    "end": 67
                  }
                ],
                "attributes": ["superlative"],
                "link": "advx"
              },
              {
                "nodeType": "detail",
                "word": "Integer",
                "spans": [
                  {
                    "start": 68,
                    "end": 75
                  }
                ],
                "attributes": [],
                "link": "obj"
              }
            ]
          }
        ]
      }
    },
    {
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
    }
  ];

  //
  // Public APIs
  //

  hpdev.renderSelectTreeUI = function renderSelectTreeUI(onTreeChanged = () => {}) {
    const div = document.createElement('div');
    div.classList.add('hpdev__select-tree');

    const select = document.createElement('select');
    select.addEventListener('change', onTreeChanged);

    sampleTrees.forEach((tree, idx) => {
      const option = document.createElement('option');
      option.setAttribute('value', idx);
      option.textContent = tree.text;
      select.appendChild(option);
    });

    div.appendChild(select);

    document.body.insertBefore(div, document.body.firstElementChild);
  };

  const treeLen = sampleTrees.length;
  hpdev.getTreeAtIdx = function getTreeAtIdx(idx) {
    if (idx < 0 || idx >= treeLen) {
      throw new Error(`No tree at index ${idx}`);
    }
    return sampleTrees[idx];
  };
})();


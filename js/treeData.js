// Hero Tree Example data
const introData = {
  "text": "With Hierplane, you can explore linguistic structures naturally. Try it for yourself!",
  "nodeTypeToStyle": {
    "verb": ["color1", "strong"],
    "top-level-and": ["node--segments-container"],
    "noun": ["color2"],
    "modifier": ["color3"],
    "implied": ["placeholder"]
  },
  "linkToPosition": {
    "subj": "left",
    "obj": "right",
    "parg": "right"
  },
  "linkNameToLabel": {
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
      "spanAnnotations": [
        {
          "spanType": "child",
          "lo": 0,
          "hi": 63
        },
        {
          "spanType": "ignored",
          "lo": 63,
          "hi": 64
        },
        {
          "spanType": "child",
          "lo": 61,
          "hi": 84
        },
        {
          "spanType": "ignored",
          "lo": 84,
          "hi": 85
        }
      ]
    },
    "children": [
      {
        "nodeType": "verb",
        "word": "can explore",
        "link": "none",
        "alternateParseInfo": {
          "charNodeRoot": {
            "charLo": 0,
            "charHi": 63
          },
          "spanAnnotations": [
            {
              "spanType": "child",
              "lo": 0,
              "hi": 14
            },
            {
              "spanType": "ignored",
              "lo": 14,
              "hi": 15
            },
            {
              "spanType": "child",
              "lo": 16,
              "hi": 19
            },
            {
              "spanType": "self",
              "lo": 20,
              "hi": 31
            },
            {
              "spanType": "child",
              "lo": 32,
              "hi": 53
            },
            {
              "spanType": "child",
              "lo": 54,
              "hi": 63
            }
          ]
        },
        "children": [
          {
            "nodeType": "modifier",
            "word": "With",
            "link": "preposition",
            "alternateParseInfo": {
              "charNodeRoot": {
                "charLo": 0,
                "charHi": 14
              },
              "spanAnnotations": [
                {
                  "spanType": "self",
                  "lo": 0,
                  "hi": 4
                },
                {
                  "spanType": "child",
                  "lo": 5,
                  "hi": 14
                }
              ]
            },
            "children": [
              {
                "nodeType": "noun",
                "word": "Hierplane",
                "link": "parg",
                "alternateParseInfo": {
                  "charNodeRoot": {
                    "charLo": 5,
                    "charHi": 14
                  },
                  "spanAnnotations": [
                    {
                      "spanType": "self",
                      "lo": 5,
                      "hi": 14
                    }
                  ]
                }
              }
            ]
          },
          {
            "nodeType": "noun",
            "word": "you",
            "link": "subj",
            "alternateParseInfo": {
              "charNodeRoot": {
                "charLo": 16,
                "charHi": 19
              },
              "spanAnnotations": [
                {
                  "spanType": "self",
                  "lo": 16,
                  "hi": 19
                }
              ]
            }
          },
          {
            "nodeType": "noun",
            "word": "structures",
            "link": "obj",
            "alternateParseInfo": {
              "charNodeRoot": {
                "charLo": 32,
                "charHi": 53
              },
              "spanAnnotations": [
                {
                  "spanType": "child",
                  "lo": 32,
                  "hi": 42
                },
                {
                  "spanType": "self",
                  "lo": 43,
                  "hi": 53
                }
              ]
            },
            "children": [
              {
                "nodeType": "modifier",
                "word": "linguistic",
                "link": "adjective",
                "alternateParseInfo": {
                  "charNodeRoot": {
                    "charLo": 32,
                    "charHi": 42
                  },
                  "spanAnnotations": [
                    {
                      "spanType": "self",
                      "lo": 32,
                      "hi": 42
                    }
                  ]
                }
              }
            ]
          },
          {
            "nodeType": "modifier",
            "word": "naturally",
            "link": "adverb",
            "alternateParseInfo": {
              "charNodeRoot": {
                "charLo": 54,
                "charHi": 63
              },
              "spanAnnotations": [
                {
                  "spanType": "self",
                  "lo": 54,
                  "hi": 63
                }
              ]
            }
          }
        ]
      },
      {
        "nodeType": "verb",
        "word": "Try",
        "attributes": ["imperative"],
        "link": "none",
        "alternateParseInfo": {
          "charNodeRoot": {
            "charLo": 65,
            "charHi": 84
          },
          "spanAnnotations": [
            {
              "spanType": "self",
              "lo": 65,
              "hi": 69
            },
            {
              "spanType": "child",
              "lo": 69,
              "hi": 71
            },
            {
              "spanType": "child",
              "lo": 72,
              "hi": 84
            }
          ]
        },
        "children": [
          {
            "nodeType": "implied",
            "word": "you",
            "link": "subj"
          },
          {
            "nodeType": "noun",
            "word": "it",
            "link": "obj",
            "alternateParseInfo": {
              "charNodeRoot": {
                "charLo": 69,
                "charHi": 71
              },
              "spanAnnotations": [
                {
                  "spanType": "self",
                  "lo": 69,
                  "hi": 71
                }
              ]
            }
          },
          {
            "nodeType": "modifier",
            "word": "for",
            "link": "preposition",
            "alternateParseInfo": {
              "charNodeRoot": {
                "charLo": 72,
                "charHi": 84
              },
              "spanAnnotations": [
                {
                  "spanType": "self",
                  "lo": 72,
                  "hi": 75
                },
                {
                  "spanType": "child",
                  "lo": 76,
                  "hi": 84
                }
              ]
            },
            "children": [
              {
                "nodeType": "noun",
                "word": "yourself",
                "link": "parg",
                "alternateParseInfo": {
                  "charNodeRoot": {
                    "charLo": 76,
                    "charHi": 84
                  },
                  "spanAnnotations": [
                    {
                      "spanType": "self",
                      "lo": 76,
                      "hi": 84
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  }
};

const exampleData = {
  "text": "ACME, Inc. Org Chart",
  "nodeTypeToStyle": {
    "root": ["color1", "strong"],
    "1stlevel": ["color2"],
    "2ndlevel": ["color3"],
    "3rdlevel": ["color4"],
    "4thlevel": ["color5"]
  },
  "linkToPosition": {
    "Executive Assistant": "right",
    "Sr. Project Manager": "right",
    "Project Manager": "right",
    "Architect": "right",
    "Sr. Software Engineer": "right",
    "Software Engineer": "right",
    "Sr. Front-End Engineer": "right",
    "Front-End Engineer": "right",
    "Sr. IT Technician": "right",
    "IT Technician": "right",
    "Sr. UX Designer": "right",
    "Visual Designer": "right",
    "Sr. Interaction Designer": "right",
    "Interaction Designer": "right",
    "Illustrator": "right",
    "Photographer": "right",
    "3D Artist": "right"
  },
  "linkNameToLabel": {
    "Executive Assistant": "EA",
    "Sr. Project Manager": "SR. PM",
    "Project Manager": "PM",
    "Architect": "Arch",
    "Sr. Software Engineer": "Sr. SE",
    "Software Engineer": "SE",
    "Sr. Front-End Engineer": "Sr. FE",
    "Front-End Engineer": "FE",
    "Sr. IT Technician": "Sr. ITT",
    "IT Technician": "ITT",
    "Sr. UX Designer": "Sr. UX",
    "Visual Designer": "VD",
    "Sr. Interaction Designer": "Sr. ID",
    "Interaction Designer": "ID",
    "Illustrator": "Ill",
    "Photographer": "PH",
    "3D Artist": "3D"
  },
  "root": {
    "word": "Esther Walker",
    "attributes": ["CEO"],
    "nodeType": "root",
    "children": [
      {
        "word": "Frances Peterson",
        "link": "Executive Assistant",
        "attributes": ["Executive Assistant"],
        "nodeType": "1stlevel"
      },
      {
        "word": "Ernesto Daniel",
        "link": "COO",
        "nodeType": "1stlevel",
        "children": [
          {
            "word": "Lamar Saunders",
            "link": "Controller",
            "nodeType": "2ndlevel"
          },
          {
            "word": "Alma Vargas",
            "link": "Office Manager",
            "nodeType": "2ndlevel"
          },
          {
            "word": "Nichole Lindsey",
            "link": "HR Manager",
            "nodeType": "2ndlevel"
          },
          {
            "word": "Erma Austin",
            "link": "Sr. Program Manager",
            "nodeType": "2ndlevel",
            "children": [
              {
                "word": "Lowell Shelton",
                "link": "Sr. Project Manager",
                "nodeType": "3rdlevel",
                "attributes": ["Sr. Project Manager"]
              },
              {
                "word": "Victor Kim",
                "link": "Project Manager",
                "nodeType": "3rdlevel",
                "attributes": ["Project Manager"]
              },
              {
                "word": "Rodney Fowler",
                "link": "Project Manager",
                "nodeType": "3rdlevel",
                "attributes": ["Project Manager"]
              },
              {
                "word": "Leah Fitzgerald",
                "link": "Project Manager",
                "nodeType": "3rdlevel",
                "attributes": ["Project Manager"]
              }
            ]
          }
        ]
      },
      {
        "word": "Kristen Vasquez",
        "link": "CTO",
        "nodeType": "1stlevel",
        "children": [
          {
            "word": "Calvin Francis",
            "link": "Director of Engineering",
            "nodeType": "2ndlevel",
            "children": [
              {
                "word": "Sonya Hansen",
                "link": "Architect",
                "attributes": ["Architect"],
                "nodeType": "3rdlevel"
              },
              {
                "word": "Orville Mcdaniel",
                "link": "Sr. Software Engineer",
                "attributes": ["Sr. Software Engineer"],
                "nodeType": "3rdlevel"
              },
              {
                "word": "Steven Copeland",
                "link": "Sr. Software Engineer",
                "attributes": ["Sr. Software Engineer"],
                "nodeType": "3rdlevel"
              },
              {
                "word": "Freda Reese",
                "link": "Software Engineer",
                "attributes": ["Software Engineer"],
                "nodeType": "3rdlevel"
              },
              {
                "word": "Wallace Matthews",
                "link": "Software Engineer",
                "attributes": ["Software Engineer"],
                "nodeType": "3rdlevel"
              },
              {
                "word": "Mack Baker",
                "link": "Software Engineer",
                "attributes": ["Software Engineer"],
                "nodeType": "3rdlevel"
              }
            ]
          },
          {
            "word": "Mary Barnett",
            "link": "Director of Engineering",
            "nodeType": "2ndlevel",
            "children": [
              {
                "word": "Darryl Patterson",
                "link": "Sr. Software Engineer",
                "attributes": ["Sr. Software Engineer"],
                "nodeType": "3rdlevel"
              },
              {
                "word": "Joy Coleman",
                "link": "Sr. Front-End Engineer",
                "attributes": ["Sr. Front-End Engineer"],
                "nodeType": "3rdlevel"
              },
              {
                "word": "Austin Rodriquez",
                "link": "Front-End Engineer",
                "attributes": ["Front-End Engineer"],
                "nodeType": "3rdlevel"
              }
            ]
          },
          {
            "word": "Terrell Benson",
            "link": "Director of IT",
            "nodeType": "2ndlevel",
            "children": [
              {
                "word": "Amber Curtis",
                "link": "Sr. IT Technician",
                "attributes": ["Sr. IT Technician"],
                "nodeType": "3rdlevel"
              },
              {
                "word": "Jermaine Caldwell",
                "link": "IT Technician",
                "attributes": ["IT Technician"],
                "nodeType": "3rdlevel"
              },
              {
                "word": "Emma Hodges",
                "link": "IT Technician",
                "attributes": ["IT Technician"],
                "nodeType": "3rdlevel"
              }
            ]
          }
        ]
      },
      {
        "word": "Gwendolyn Jimenez",
        "link": "VP of Design",
        "nodeType": "1stlevel",
        "children": [
          {
            "word": "Vivian Santos",
            "link": "Creative Director",
            "nodeType": "2ndlevel",
            "children": [
              {
                "word": "Rose Morrison",
                "link": "Associate Creative Director",
                "nodeType": "3rdlevel",
                "children": [
                  {
                    "word": "Bridget Curry",
                    "link": "Sr. UX Designer",
                    "attributes": ["Sr. UX Designer"],
                    "nodeType": "4thlevel"
                  },
                  {
                    "word": "Ira Black",
                    "link": "Visual Designer",
                    "attributes": ["Visual Designer"],
                    "nodeType": "4thlevel"
                  }
                ]
              },
              {
                "word": "Tyler Manning",
                "link": "Associate Creative Director",
                "nodeType": "3rdlevel",
                "children": [
                  {
                    "word": "Kim Morton",
                    "link": "Sr. UX Designer",
                    "attributes": ["Sr. UX Designer"],
                    "nodeType": "4thlevel"
                  },
                  {
                    "word": "Eddie Moran",
                    "link": "Sr. Interaction Designer",
                    "attributes": ["Sr. Interaction Designer"],
                    "nodeType": "4thlevel"
                  },
                  {
                    "word": "Saul Green",
                    "link": "Interaction Designer",
                    "attributes": ["Interaction Designer"],
                    "nodeType": "4thlevel"
                  },
                  {
                    "word": "Earnest Sandoval",
                    "link": "Visual Designer",
                    "attributes": ["Visual Designer"],
                    "nodeType": "4thlevel"
                  },
                  {
                    "word": "Wendy Long",
                    "link": "Illustrator",
                    "attributes": ["Illustrator"],
                    "nodeType": "4thlevel"
                  }
                ]
              }
            ]
          },
          {
            "word": "Jessie Warren",
            "link": "Art Director",
            "nodeType": "2ndlevel",
            "children": [
              {
                "word": "Joey Joseph",
                "link": "Photographer",
                "attributes": ["Photographer"],
                "nodeType": "3rdlevel"
              },
              {
                "word": "Everett Boone",
                "link": "Illustrator",
                "attributes": ["Illustrator"],
                "nodeType": "3rdlevel"
              },
              {
                "word": "Michelle Colon",
                "link": "Illustrator",
                "attributes": ["Illustrator"],
                "nodeType": "3rdlevel"
              },
              {
                "word": "Tommie Larson",
                "link": "3D Artist",
                "attributes": ["3D Artist"],
                "nodeType": "3rdlevel"
              }
            ]
          }
        ]
      },
      {
        "word": "Jerry Rodriguez",
        "link": "VP of Marketing",
        "nodeType": "1stlevel",
        "children": [
          {
            "word": "Yolanda Butler",
            "link": "Sr. Marketing Manager",
            "nodeType": "2ndlevel"
          },
          {
            "word": "Lorraine Barnes",
            "link": "Sr. Marketing Manager",
            "nodeType": "2ndlevel"
          },
          {
            "word": "Leo Gibbs",
            "link": "Marketing Manager",
            "nodeType": "2ndlevel"
          },
          {
            "word": "Lillian Edwards",
            "link": "Marketing Assistant",
            "nodeType": "2ndlevel"
          }
        ]
      },
      {
        "word": "Natasha Hudson",
        "link": "VP of Product",
        "nodeType": "1stlevel",
        "children": [
          {
            "word": "Jill Munoz",
            "link": "Product Director",
            "nodeType": "2ndlevel",
            "children": [
              {
                "word": "Anthony Drake",
                "link": "Sr. Product Manager",
                "nodeType": "3rdlevel"
              },
              {
                "word": "Edward Thornton",
                "link": "Sr. Product Manager",
                "nodeType": "3rdlevel"
              },
              {
                "word": "Benjamin Parker",
                "link": "Product Manager",
                "nodeType": "3rdlevel"
              },
              {
                "word": "Sandy Holloway",
                "link": "Product Manager",
                "nodeType": "3rdlevel"
              },
              {
                "word": "Louis Powell",
                "link": "Product Manager",
                "nodeType": "3rdlevel"
              }
            ]
          },
          {
            "word": "Tamara Phillips",
            "link": "Product Director",
            "nodeType": "2ndlevel",
            "children": [
              {
                "word": "Felipe Shaw",
                "link": "Sr. Product Manager",
                "nodeType": "3rdlevel"
              },
              {
                "word": "Jeremy Roberts",
                "link": "Product Manager",
                "nodeType": "3rdlevel"
              },
              {
                "word": "Shaun Poole",
                "link": "Product Manager",
                "nodeType": "3rdlevel"
              }
            ]
          }
        ]
      }
    ]
  }
};

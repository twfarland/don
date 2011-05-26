(function() {
  var Don, blogTemplate, root, views;
  Don = require('../don.js').Don;
  root = this;
  blogTemplate = function(blog) {
    return [
      ["!doctype html"], [
        "html", [
          "head", [
            "meta", {
              charset: "utf-8"
            }
          ], ["title", blog.title]
        ], [
          "body", [
            "section", ["h1", blog.title], [
              "div", {
                "class": "articles"
              }, Don.map(blog.articles, function(article) {
                return [
                  "article", {
                    id: article.id
                  }, ["h3", article.title], [
                    "div", article.body, [
                      "a", {
                        href: article.link
                      }, article.anchor
                    ]
                  ]
                ];
              })
            ]
          ]
        ]
      ]
    ];
  };
  views = function() {
    return {
      home: function(data) {
        return Don.render(data, blogTemplate);
      }
    };
  };
  root.views = new views();
}).call(this);

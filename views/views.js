(function() {
  var Don, articleTemplate, blogTemplate, root, views;
  Don = require('../don.js').Don;
  root = this;
  articleTemplate = function() {
    return [
      "article", {
        id: this.id
      }, ["h3", this.title], [
        "div", this.body, [
          "a", {
            href: this.link
          }, this.anchor
        ]
      ]
    ];
  };
  blogTemplate = function() {
    return [
      ["!doctype html"], [
        "html", [
          "head", [
            "meta", {
              charset: "utf-8"
            }
          ], ["title", this.title]
        ], [
          "body", [
            "section", ["h1", this.title], [
              "div", {
                "class": "articles"
              }, Don.mapRender(articleTemplate, this.articles)
            ]
          ]
        ]
      ]
    ];
  };
  views = function() {
    return {
      home: function(data) {
        return Don.render(blogTemplate, data);
      }
    };
  };
  root.views = new views();
}).call(this);

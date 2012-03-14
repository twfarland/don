(function() {
  var Don, articleTmpl, layout, root, views;

  Don = require('../don.js').Don;

  root = this;

  articleTmpl = function(article, k) {
    return [
      'article', {
        id: article.id
      }, ['h3', article.title], [
        'div', article.body, [
          'a', {
            href: article.link
          }, article.anchor
        ]
      ]
    ];
  };

  layout = function(partial) {
    return function(d, k) {
      var a;
      return [
        ['!doctype html'], [
          'html', [
            'head', [
              'meta', {
                charset: 'utf-8'
              }
            ], ['title', d.title]
          ], [
            'body', [
              'section', ['h1', d.title], [
                'div', {
                  "class": 'articles'
                }, (function() {
                  var _i, _len, _ref, _results;
                  _ref = d.articles;
                  _results = [];
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    a = _ref[_i];
                    _results.push(articleTmpl(a));
                  }
                  return _results;
                })()
              ]
            ]
          ]
        ]
      ];
    };
  };

  views = function() {
    return {
      home: function(data) {
        return Don.render(data, layout(articleTmpl));
      }
    };
  };

  root.views = new views();

}).call(this);

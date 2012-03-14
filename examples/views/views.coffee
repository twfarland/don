Don = require('../don.js').Don


root = @


articleTmpl = (article, k) ->

   ['article', {id: article.id}
       ['h3', article.title]
          ['div'
              article.body
              ['a', {href: article.link}, article.anchor]]]


layout = (partial) -> (d, k) ->

   [['!doctype html']
    ['html'
        ['head'
            ['meta', charset: 'utf-8']
            ['title', d.title]]
        ['body'
            ['section'
                ['h1', d.title],
                ['div', {class: 'articles'}, articleTmpl a for a in d.articles]]]]]


views = ->

    home: (data) ->
        Don.render data, layout(articleTmpl)


root.views = new views()

#DON

'Document Object Notation'
An embedded html templating DSL in Javascript

No license. Do what you want with this.
Creator: [Tim Farland](http://timfarland.com)


##Don is an embedded templating DSL for Javascript

It is inspired by the use of lisp s-expressions to compose html, and by the use of pure javascript as a templating language ala Coffeekup, but it primarily makes use of js array and objects to represent html.

Don templates are functions that take an object and return normal js data adhering to a certain form.

These template functions are transformed into html by Don.render()

All examples given in Coffeescript unless otherwise noted.

Benefits:
 - Terse, but remains normal js
 - Use the bracket matching of your favourite editor
 - Js syntax checking can help spot malformed html
 - No complicated abstractions or syntax to learn
 - Use js data directly in templates (e.g. objects as tag attributes)
 - Fast enough without a compilation step
 - Flexible

Note: I've also included an experimental Ruby version.


###Node usage
    
    Don = require('../don.js').Don

    articleTemplate = (data, key) ->
        ['article', {id: data.id + key}
            ['h3', data.title]
            ['div', data.body]]
                
    Don.render(
       {id: 123, title: 'My Article', body: 'Article text'},
       articleTemplate
    )
                
    # => '<article id="123"><h3>My Article</h3><div>Article text</div></article>'


###Partials

You can use the power of closures to implement partials (a layout is a function that takes a template and returns a template):

    partial = (d) ->
        ['article', {id: d.id}
            ['h3', d.title]
            ['div'
                d.body
                ['a', {href: d.link}, d.anchor]]]     
     
    layout = (partial) ->
       (d) ->
          [['!doctype html']
           ['html'
               ['head'
                   ['meta', charset: 'utf-8']
                   ['title', d.title]]
               ['body'
                   ['section'
                       ['h1', d.title]
                       ['div', {class: 'articles'}, (partial a for a in d.articles)]]]]]    


###Render inside

You can also use 'renderIn', which calls the template function within the given data, allowing for templates that access the 'this,' like:

    articleTemplate = ->
        ['article', {id: @id}
            ['h3', @title]
            ['div', @body]]


###Acceptable forms

The arrays must adhere to Don's definition of an 'htmlArray'

An htmlArray is an array with either:

    [elementType]
    [elementType, contents...]
    [elementType, attributes]
    [elementType, attributes, contents...]
    []
    [htmlArray...]
 
where:

- elementType is a string, e.g: "div"
- contents is an arbitrary number of:
 - string, or
 - htmlArray
- attributes is a js object, e.g: {id:"mydiv"}

examples:

    htmlArray1 = ["br"]
    htmlArray2 = ["h1", "page title"]
    htmlArray3 = ["h1", 
                    "page title",
                    ["span", "subtitle"]]
                    
    htmlArray4 = ["meta", {name:"description", content:"some webpage"}]
    htmlArray5 = ["article", {id:123}, "the article content"]
    htmlArray6 = ["article", {id:123}, 
                    "the article content",
                    ["a", {href:"#"}, "some link"]]
                    
    htmlArray7 = []
    htmlArray8 = [["br"],["br"]]
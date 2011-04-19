#DON

'Document Object Notation'
An embedded html templating DSL in Coffeescript/Javascript

Released under the MIT license.
Creator: [Tim Farland](http://timfarland.com)


##Don is an embedded templating DSL for Coffeescript/Javascript

It is inspired by the lisp way of using s-expressions to compose html, and by the use of pure javascript as a templating language used by Coffeekup, but it primarily makes use of js array and objects to represent html.

Don templates are functions that return nested arrays (where variables are attached to 'this', like in Coffeekup)

Template functions are transformed into html by Don.render()

*(all examples are given in coffeescript)*

###Node usage

    Don = require('../don.js').Don

    articleTemplate = ->
        ["article", {id: @id}
            ["h3", @title]
            ["div", 
                @body]]
                
    Don.render articleTemplate, {id:123, title:"My Article", body:"Article text"}
                
    # => '<article id="123"><h3>My Article</h3><div>Article text</div></article>'

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
- contents is either one or more of:
 - a string, e.g: "my title", or
 - an htmlArray
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

###Mapping a template rendering on an array 

Don.mapRender() takes a template and an array of htmlArrays and returns a string that is the result of rendering each htmlArray in the array with the given template:

    colourTemplate = ->
        ["div", {id:"c"+@id}, @colour]

    data = [{id:1, colour:"red"}
             {id:2, colour:"blue"}
             {id:3, colour:"green"}]
             
    Don.mapRender colourTemplate, data
    
    # => '<div id="c1">red</div><div id="c2">blue</div><div id="c3">green</div>'
    
###Partials

You can nest template renderings within other templates:

    articleTemplate = ->
        ["article", {id: @id}
            ["h3", @title]
            ["div", 
                @body,
                ["a", {href:@link}, @anchor]]]     
     
    blogTemplate = ->
       [["!doctype html"],
        ["html",
            ["head",
                ["meta", {charset:"utf-8"}],
                ["title", @title]]
            ["body",
                ["section",
                    ["h1", @title],
                    ["div", {class:"articles"}, Don.mapRender(articleTemplate, @articles)]]]]]    



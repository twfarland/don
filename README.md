#DON

'Document Object Notation'
Converts JSON to HTML

Released under the MIT license.
Creator: [Tim Farland](http://timfarland.com)


##Don is inspired by the lisp way of using s-expressions to compose html, but used js arrays instead:

(example in coffeescript):

    articleTemplate = ->
        ["article", {id: @id}
            ["h3", @title]
            ["div", 
                @body,
                ["a", {href:@link}, @anchor]]]
                
Don templates are just functions that return nested arrays.

However, the arrays must adhere to Don's definition of an 'htmlArray'

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
    a string, e.g: "my title", or
    an htmlArray
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

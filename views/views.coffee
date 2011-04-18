Don = require('../don.js').Don

#establish root
root = this


#template functions
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
            
        
 
 
#views (functions that render templates) 
views = ->

    home : (data) ->
        Don.render blogTemplate, data 
       
       
#provide to root    
root.views = new views()

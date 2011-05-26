Don = require('../don.js').Don

#establish root
root = this


 
 
blogTemplate = (blog) ->
   [["!doctype html"],
    ["html",
        ["head",
            ["meta", {charset:"utf-8"}],
            ["title", blog.title]]
        ["body",
            ["section",
                ["h1", blog.title],
                ["div", {class:"articles"}, Don.map(blog.articles, (article) ->
                
                    ["article", {id: article.id},
                        ["h3", article.title]
                        ["div", 
                            article.body,
                            ["a", {href:article.link}, article.anchor]]]
                            
                )]]]]]
            
        
 
 
#views (functions that render templates) 
views = ->

    home : (data) ->
        Don.render data, blogTemplate 
       
       
#provide to root    
root.views = new views()

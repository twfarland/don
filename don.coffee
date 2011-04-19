###    
Don - json templating

Data defs:

An htmlArray is an array adhering to any of the following forms:

    [elementType]
    [elementType, contents...]
    [elementType, attributes]
    [elementType, attributes, contents...]
    []
    [htmlArray...]

    where
        - elementType is a string, e.g: "div"
        - contents is an arbitrary number of:
            - a string or a number
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
###


#establish root
root = this


#utils
isArray = Array.isArray or ((elem) -> toString.call(elem) is '[object Array]')
toString = Object::toString


#main container
Don = ->


    ###
    renderInner : contentArray -> string
    e.g: ["text",["span","innertext"]] -> "text<span>innertext</span>"
    ###
    renderInner = (contentArray) ->   
        ((if isArray(elem) then toHtml(elem) else elem) for elem in contentArray).join ""
        
        
    ###
    renderAttrs : object -> string
    e.g: {id:123,class:"someclass"} -> ' id="123" class="someclass"'
    ###    
    renderAttrs = (attrObj) ->    
        ((' ' + attr + '="' + val + '"') for attr, val of attrObj).join ""
        

    ###
    toHtml : htmlArray -> html
    the main convertor func
    e.g: ["div",["h1","title"],["p","body"]] -> '<div><h1>title</h1><p>body</p></div>'
    ###
    toHtml = (arr) ->
    
        #[htmlArray]
        if isArray(arr[0])       
            (toHtml elem for elem in arr).join "" 
        
        #[]
        else if arr.length is 0 
            ""  
            
        else        
            #[elementType] 
            if arr.length is 1
                "<" + arr[0] + ">"    
                             
            else                 
                if toString.call(arr[1]) is '[object Object]' 
                
                    #[elementType, attributes] 
                    if arr.length is 2                    
                        "<" + arr[0] + renderAttrs(arr[1]) + ">" 
                                               
                    #[elementType, attributes, content...]
                    else
                        "<" + arr[0] + renderAttrs(arr[1]) + ">" +
                         renderInner(arr[2..]) +
                         "</" + arr[0] + ">" 
                                       
                #[elementType, content...]   
                else 
                    "<" + arr[0] + ">" + 
                    renderInner(arr[1..]) + 
                    "</" + arr[0] + ">" 
                               
                               
                                 
    #expose raw convertor for testing
    @toHtml = toHtml
    
    
    #calls the template function within the given data object
    @render = (template, data, partials) ->
        toHtml template.call data
        
        
    #renders a template for each item in an array, and collapses into an html string    
    @mapRender = (template, dataArr) ->
        (@render(template, elem) for elem in dataArr).join ""
        
    @
    
    
#provide to root    
root.Don = new Don()

###
Don.js - embedding templating dsl
By Tim Farland
http://github.com/twfarland/don
###


toString = {}.toString
isArray = Array.isArray or ((elem) -> toString.call(elem) is '[object Array]')


Don = ->


    toHtml = (arr) ->

        if isArray(arr[0])
                res = ''
                for elem in arr
                        res += toHtml elem
                res

        else if arr.length is 0 or !arr
                ''

        else
                tag     = 'div'
                attrs   = ''
                cls     = []
                content = ''


                for frag in arr[0].split ' '
                        if frag[0] is '#'
                                attrs +=  ' id="' + frag[1..] + '"'

                        else if frag[0] is '.'
                                cls.push frag[1..]

                        else if frag[0]
                                tag = frag


                if cls.length > 0
                        attrs += ' class="' + cls.join(' ') + '"'


                if arr[1] and toString.call(arr[1]) is '[object Object]'

                        for attr, val of arr[1]
                                if val is true
                                        attrs += ' ' + attr
                                else if val isnt false
                                        attrs += ' ' + attr + '="' + val + '"'

                        arr = arr[2..]

                else
                        arr = arr[1..]


                res = '<' + tag + attrs + '>'

                if arr.length > 0
                        for elem in arr
                                if isArray elem
                                        content += toHtml elem
                                else if elem
                                        content += elem

                        res += content + '</' + tag + '>'

                res


    @toHtml = toHtml


    @render = (data, template, key) ->
        toHtml template(data, key)


    @renderIn = (data, template, key, parent) ->
        toHtml template.call data, key, parent


    @


@Don = new Don()
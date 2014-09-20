(function () {

    var root     = this;
    var toString = Object.prototype.toString;
    var isArray  = Array.prototype.isArray || (function (e) { return toString.call(e) === '[object Array]'});
    var slice    = Array.prototype.slice;


    function render (template, ctx) {
        return toHtml(template.apply(ctx, slice.call(arguments).slice(1)));
    }


    function toHtml (arr) {


        if (isArray(arr)) {

            if (isArray(arr[0])) { // nested

                var res = [], i;
                for (i = 0; i < arr.length; i++) res.push(toHtml(arr[i]));
                return res.join(' ');    
            
            } else if (typeof arr[0] === 'string')  { // tag

                var res     = '',
                    tag     = 'div',
                    attrs   = '',
                    attr,
                    val,
                    cls     = [],
                    content = [],
                    c,
                    frags   = arr[0].split(' '),
                    frag,
                    f;

                for (f = 0; f < frags.length; f++) {
                    frag = frags[f];

                    if (frag[0] === '#') {
                        attrs += ' id="' + frag.slice(1) + '"';

                    } else if (frag[0] === '.') {
                        cls.push(frag.slice(1));

                    } else if (frag[0]) {
                        tag = frag;
                    }
                }

                if (cls.length > 0) attrs += ' class="' + cls.join(' ') + '"';

                if (arr[1] && toString.call(arr[1]) === '[object Object]') {
                    for (attr in arr[1]) {
                        val = arr[1][attr];

                        if (val === true) {
                            attrs += ' ' + attr;

                        } else if (!(val === false || val === undefined || val === null)) {
                            attrs += ' ' + attr + '="' + val + '"';
                        }
                    }
                    arr = arr.slice(2);

                } else {
                    arr = arr.slice(1);
                }

                res = '<' + tag + attrs + '>';

                if (arr.length > 0) {
                    for (c = 0; c < arr.length; c++) content.push(toHtml(arr[c]));
                    res += content.join(' ') + '</' + tag + '>';
                }

                return res;

            } else {
                return '';
            }     
        } 

        if (arr === false || arr === undefined || arr === null) return '';

        return arr;
    }



    try {
        module.exports = render;

    } catch (e) {
        root.Don = render;
    }


}).call(this);
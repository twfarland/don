
/*
Don.js - embedding templating dsl
By Tim Farland
http://github.com/twfarland/don
*/

(function() {
  var Don, isArray, toString;

  toString = {}.toString;

  isArray = Array.isArray || (function(elem) {
    return toString.call(elem) === '[object Array]';
  });

  Don = function() {
    var toHtml;
    toHtml = function(arr) {
      var attr, attrs, cls, content, elem, frag, res, tag, val, _i, _j, _k, _len, _len2, _len3, _ref, _ref2;
      if (isArray(arr[0])) {
        res = '';
        for (_i = 0, _len = arr.length; _i < _len; _i++) {
          elem = arr[_i];
          res += toHtml(elem);
        }
        return res;
      } else if (arr.length === 0 || !arr) {
        return '';
      } else {
        tag = 'div';
        attrs = '';
        cls = [];
        content = '';
        _ref = arr[0].split(' ');
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          frag = _ref[_j];
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
          _ref2 = arr[1];
          for (attr in _ref2) {
            val = _ref2[attr];
            if (val === true) {
              attrs += ' ' + attr;
            } else if (val !== false) {
              attrs += ' ' + attr + '="' + val + '"';
            }
          }
          arr = arr.slice(2);
        } else {
          arr = arr.slice(1);
        }
        res = '<' + tag + attrs + '>';
        if (arr.length > 0) {
          for (_k = 0, _len3 = arr.length; _k < _len3; _k++) {
            elem = arr[_k];
            if (isArray(elem)) {
              content += toHtml(elem);
            } else if (elem) {
              content += elem;
            }
          }
          res += content + '</' + tag + '>';
        }
        return res;
      }
    };
    this.toHtml = toHtml;
    this.render = function(data, template, key) {
      return toHtml(template(data, key));
    };
    this.renderIn = function(data, template, key, parent) {
      return toHtml(template.call(data, key, parent));
    };
    return this;
  };

  this.Don = new Don();

}).call(this);

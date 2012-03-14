(function() {
  var Don, isArray, root, test, toString;

  root = this;

  toString = {}.toString;

  isArray = Array.isArray || (function(elem) {
    return toString.call(elem) === '[object Array]';
  });

  Don = function() {
    var renderAttrs, renderInner, toHtml;
    renderInner = function(arr) {
      var elem, res, _i, _len;
      res = '';
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        elem = arr[_i];
        res += (isArray(elem) ? toHtml(elem) : elem);
      }
      return res;
    };
    renderAttrs = function(attrs) {
      var attr, res, val;
      res = '';
      for (attr in attrs) {
        val = attrs[attr];
        res += ' ' + attr + '="' + val + '"';
      }
      return res;
    };
    toHtml = function(arr) {
      var elem, res, _i, _len;
      if (isArray(arr[0])) {
        res = '';
        for (_i = 0, _len = arr.length; _i < _len; _i++) {
          elem = arr[_i];
          res += toHtml(elem);
        }
        return res;
      } else if (arr.length === 0) {
        return '';
      } else if (arr.length === 1) {
        return '<' + arr[0] + '>';
      } else {
        if (toString.call(arr[1]) === '[object Object]') {
          if (arr.length === 2) {
            return '<' + arr[0] + renderAttrs(arr[1]) + '>';
          } else {
            return '<' + arr[0] + renderAttrs(arr[1]) + '>' + renderInner(arr.slice(2)) + '</' + arr[0] + '>';
          }
        } else {
          return '<' + arr[0] + '>' + renderInner(arr.slice(1)) + '</' + arr[0] + '>';
        }
      }
    };
    this.toHtml = toHtml;
    this.render = function(data, template, key) {
      return toHtml(template(data, key));
    };
    this.mapRender = function(dataArr, template) {
      var data, key, res;
      res = "";
      for (key in dataArr) {
        data = dataArr[key];
        res += this.render(data, template, key);
      }
      return res;
    };
    this.map = this.mapRender;
    this.renderIn = function(data, template, key, parent) {
      return toHtml(template.call(data, key, parent));
    };
    this.mapRenderIn = function(dataArr, template, parent) {
      var data, key, res;
      res = "";
      for (key in dataArr) {
        data = dataArr[key];
        res += this.renderIn(data, template, key, parent);
      }
      return res;
    };
    this.mapIn = this.mapRenderIn;
    return this;
  };

  root.Don = new Don();

  test = new Don();

  console.log(test.render({
    cls: "ok",
    body: "wat"
  }, function(d) {
    return [
      "div", {
        "class": d.cls,
        ok: "yep"
      }, ["p", d.body]
    ];
  }));

}).call(this);

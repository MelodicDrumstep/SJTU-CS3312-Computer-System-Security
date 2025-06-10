var t, a = require("../../@babel/runtime/helpers/defineProperty"),
  e = require("@/env"),
  i = (t = require("./watcher")) && t.__esModule ? t : {
    default: t
  };

function n() {}
var r = Page;
Page = function(t) {
  var c = t.onLoad || n,
    s = t.onUnload || n;
  return t.data ? t.data.__static__ = e.__static__ : t.data = {
    __static__: e.__static__
  }, t.onLoad = function() {
    var e = this,
      n = this.setData,
      r = t.data || {},
      s = {};
    if (this.setData = function(e, i, r) {
        n.call(this, e, (function() {
          var c = this;
          if (t.computed && Object.keys(s).forEach((function(i) {
              Object.keys(e).forEach((function(e) {
                (s[i].includes(e) || s[i].includes(e.split(".")[0]) || s[i].includes(e.split("[")[0])) && n.call(c, a({}, i, t.computed[i].call(c, c.data)))
              }))
            })), i)
            if (r) var o = setTimeout((function() {
              i.call(c), clearTimeout(o)
            }), r);
            else i.call(this)
        }))
      }, this._watcher = this._watcher || new i.default(r, this.setData.bind(this)), t.computed) {
      var o = JSON.parse(JSON.stringify(this.data)),
        u = [],
        _ = function(t) {
          var a = o[t];
          Object.defineProperty(o, t, {
            get: function() {
              return u.push(t), a
            }
          })
        };
      for (var l in o) _(l);
      var d = function(i) {
        var n = t.computed[i];
        e.setData(a({}, i, n.call(e, o)), (function() {
          s[i] = u
        }))
      };
      for (var f in t.computed) d(f)
    }
    return c.apply(this, arguments)
  }, t.onUnload = function() {
    return this._watcher.removeObserver(), s.apply(this, arguments)
  }, r(t)
};
var c = Component;
Component = function(t) {
  return t.data ? t.data.__static__ = e.__static__ : t.data = {
    __static__: e.__static__
  }, c(t)
};
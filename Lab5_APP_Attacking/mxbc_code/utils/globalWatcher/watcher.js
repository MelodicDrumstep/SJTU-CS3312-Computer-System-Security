Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, t = require("../../@babel/runtime/helpers/defineProperty"),
  r = require("../../@babel/runtime/helpers/classCallCheck"),
  a = require("../../@babel/runtime/helpers/createClass");
var i = ((e = require("./observer")) && e.__esModule ? e : {
    default: e
  }).default.globalDataObserver,
  s = 0,
  u = function() {
    function e() {
      r(this, e);
      var t = getApp().globalData || {},
        a = JSON.parse(JSON.stringify(arguments[0] ? arguments[0] : {}));
      for (var u in this.updateFn = arguments[1] ? arguments[1] : {}, this.id = ++s, this.reactiveData = {}, a) a.hasOwnProperty(u) && u in t && (this.reactiveData[u] = t[u], this.update(u, t[u]));
      for (var n in this.reactiveData) this.reactiveData.hasOwnProperty(n) && i.add(n, this)
    }
    return a(e, [{
      key: "update",
      value: function(e, r) {
        "function" == typeof this.updateFn && this.updateFn(t({}, e, r))
      }
    }, {
      key: "removeObserver",
      value: function() {
        i.delete(Object.keys(this.reactiveData), this.id)
      }
    }]), e
  }();
exports.default = u;
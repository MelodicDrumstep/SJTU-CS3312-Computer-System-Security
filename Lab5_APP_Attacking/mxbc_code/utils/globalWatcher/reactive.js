Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = function e(u) {
  return new Proxy(u, {
    get: function(r, u) {
      var l, n = Reflect.get(r, u);
      return null !== (l = n) && "object" === t(l) ? e(n) : n
    },
    set: function(e, t, u) {
      return e[t] === u || (r.default.globalDataObserver.notify(t, u), Reflect.set(e, t, u))
    }
  })
};
var e, t = require("../../@babel/runtime/helpers/typeof"),
  r = (e = require("./observer")) && e.__esModule ? e : {
    default: e
  };
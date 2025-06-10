Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = function(e) {
  return l.apply(this, arguments)
};
var e = require("../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../@babel/runtime/helpers/typeof"),
  t = require("../@babel/runtime/helpers/objectSpread2"),
  n = require("../@babel/runtime/helpers/asyncToGenerator"),
  a = u(require("./wasm/rsa_sign")),
  i = u(require("@/config/index"));

function u(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
var o = wx.getStorageSync("env") || "pro",
  s = i.default[o],
  c = s.appId_weixin,
  p = s.privateKey_weixin;

function l() {
  return (l = n(e().mark((function n(i) {
    var u, o, s, l, f, b, d;
    return e().wrap((function(e) {
      for (;;) switch (e.prev = e.next) {
        case 0:
          for (u = "", o = t(t({}, i), {}, {
              t: Date.now() - (getApp().configData.timeOffset || 0),
              appId: c
            }), s = Object.keys(o).sort(), l = 0; l < s.length; l++) f = s[l], o[f] || 0 === o[f] ? (b = "object" === r(o[f]) ? JSON.stringify(o[f]) : o[f], u += "".concat(l ? "&" : "").concat(f, "=").concat(b)) : "" !== o[f] && delete o[f];
          return e.next = 6, (0, a.default)(u, p);
        case 6:
          return d = e.sent, e.abrupt("return", t(t({}, o), {}, {
            sign: d.replace(/\//g, "_").replace(/\+/g, "-")
          }));
        case 8:
        case "end":
          return e.stop()
      }
    }), n)
  })))).apply(this, arguments)
}
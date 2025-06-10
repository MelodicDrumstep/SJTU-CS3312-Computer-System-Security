Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e = require("../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../@babel/runtime/helpers/objectSpread2"),
  r = require("./user"),
  n = require("@/env"),
  o = i(require("@/utils/createSign")),
  s = i(require("@/utils/httpQueue"));

function i(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
var c = "/v1/app/config",
  u = wx.getStorageSync("env") || "pro",
  d = {
    "x-devops-tenant": "mxbc",
    "x-devops-router": wx.getStorageSync("apiVersion") || [][0] || "",
    "x-devops-env": {
      dev: "dev",
      qa: "test",
      uat: "uat",
      pro: "prod"
    } [u]
  },
  p = a({
    version: n.version
  }, "pro" !== u ? d : {});

function l() {
  return f.apply(this, arguments)
}

function f() {
  return (f = t(e().mark((function s() {
    var i, u, d, f, h, x, b, m, w, A, k = arguments;
    return e().wrap((function(s) {
      for (;;) switch (s.prev = s.next) {
        case 0:
          if (f = k.length > 0 && void 0 !== k[0] ? k[0] : "", h = k.length > 1 && void 0 !== k[1] ? k[1] : {}, x = k.length > 2 && void 0 !== k[2] ? k[2] : {}, b = !(k.length > 3 && void 0 !== k[3]) || k[3], getApp() && getApp().configData && getApp().configData.timeOffset || f === c) {
            s.next = 7;
            break
          }
          return s.next = 7, g();
        case 7:
          if (m = null === (i = getApp()) || void 0 === i || null === (u = i.globalData) || void 0 === u || null === (d = u.userInfo) || void 0 === d ? void 0 : d.customerId, w = wx.getStorageSync("wxId") || {}, A = w.UNIONID, p["x-ssos-cid"] = m || A || "", h.customerId && (h.customerId = m), h.sign) {
            s.next = 15;
            break
          }
          return s.next = 14, (0, o.default)(h);
        case 14:
          h = s.sent;
        case 15:
          return s.abrupt("return", new Promise((function(o, s) {
            var i;
            wx.request(a(a({
              data: h,
              url: -1 === f.indexOf("://") ? "".concat(n.baseUrl, "/api").concat(f) : f,
              header: a(a({}, p), {}, {
                "Access-Token": getApp().accessToken
              }, h.headerConfig ? h.headerConfig : {})
            }, x), {}, {
              complete: (i = t(e().mark((function t(a) {
                return e().wrap((function(e) {
                  for (;;) switch (e.prev = e.next) {
                    case 0:
                      if (a && a.statusCode && a.data && 429 !== a.statusCode) {
                        e.next = 5;
                        break
                      }
                      getApp().showToast(429 === a.statusCode ? "访问的人太多啦，请稍后再试试吧！" : "网络异常，请稍后重试"), s(), e.next = 21;
                      break;
                    case 5:
                      if (!v(a.statusCode) || 0 !== a.data.code) {
                        e.next = 9;
                        break
                      }
                      o(a.data), e.next = 21;
                      break;
                    case 9:
                      if (!v(a.statusCode) || 500 !== a.data.code && 5e3 != +a.data.code) {
                        e.next = 13;
                        break
                      }
                      s({
                        msg: "服务繁忙，请稍后重试"
                      }), e.next = 21;
                      break;
                    case 13:
                      if (401 !== a.data.code || !b) {
                        e.next = 20;
                        break
                      }
                      return getApp().logOut(), e.next = 17, getApp().getAuthCode(!0);
                    case 17:
                      (0, r.regByUnionid)().then((function() {
                        l(f, h, x, !1).then(o).catch(s)
                      })).catch(s), e.next = 21;
                      break;
                    case 20:
                      s(a.data);
                    case 21:
                    case "end":
                      return e.stop()
                  }
                }), t)
              }))), function(e) {
                return i.apply(this, arguments)
              })
            }))
          })));
        case 16:
        case "end":
          return s.stop()
      }
    }), s)
  })))).apply(this, arguments)
}

function g() {
  return new Promise((function(e) {
    s.default.add(c, {
      res: e
    }, (function() {
      var e = s.default.get(c);
      wx.request({
        url: "".concat(n.baseUrl, "/api").concat(c),
        header: p,
        complete: function(t) {
          try {
            if (t && t.statusCode && t.data) {
              if (v(t.statusCode) && 0 === t.data.code) {
                var r = t.data.data,
                  n = r.privacyVersion,
                  o = r.timestamp,
                  i = r.defaultCancelFee,
                  u = r.regGuidanceSettingVo;
                getApp().configData = a(a({}, t.data.data), {}, {
                  timeOffset: Date.now() - o
                }), u && (getApp().globalData.regGuidanceSettingVo = u), getApp().globalData.defaultCancelFee = i, wx.getStorageSync("privacyVersion") !== n ? getApp().globalData.isShowPrivacy = !0 : getApp().globalData.isShowPrivacy = !1
              }
            } else getApp().showToast("网络异常，请稍后重试")
          } catch (t) {
            for (; e.length;) e.shift().res();
            s.default.delete(c)
          }
          for (; e.length;) e.shift().res();
          s.default.delete(c)
        }
      })
    }))
  }))
}

function v(e) {
  return e >= 200 && e < 300 || 304 === e
}
var h = {
  isHttpSuccess: v,
  get: function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    return l(e, t, a)
  },
  post: function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    return l(e, t, a({
      method: "post"
    }, r))
  },
  upload: function(e, t) {
    var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "file";
    return new Promise((function(r, o) {
      wx.uploadFile({
        name: a,
        filePath: t,
        url: -1 === e.indexOf("://") ? "".concat(n.baseUrl, "/api").concat(e) : e,
        header: {
          "Access-Token": getApp().accessToken,
          version: n.version
        },
        complete: function(e) {
          var t = e.statusCode,
            a = e.data;
          t && a ? (a = "string" == typeof a ? JSON.parse(a) : a, v(t) && 0 === a.code ? r(a) : v(t) && 500 === a.code ? o({
            msg: "服务繁忙，请稍后重试"
          }) : o(a)) : (getApp().showToast("网络异常，请稍后重试"), o())
        }
      })
    }))
  }
};
exports.default = h;
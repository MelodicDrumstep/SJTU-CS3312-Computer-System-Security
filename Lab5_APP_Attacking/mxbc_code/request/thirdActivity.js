Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.bindPhone2 = function(p) {
  var d = p.encryptedData,
    f = p.iv;
  return new Promise(function() {
    var p = t(e().mark((function t(p, h) {
      var l, v, g, m, x;
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.next = 2, getApp().getOpenId();
          case 2:
            return l = e.sent, v = l.OPENID, g = l.UNIONID, e.next = 7, getApp().getAuthCode();
          case 7:
            m = e.sent, x = {
              encryptedData: d,
              iv: f,
              openId: v,
              unionid: g,
              authCode: m,
              miniAppId: i.default.pro.miniAppId_weixin,
              third: "wxmini",
              s: 2
            }, r.default.post("".concat(o.baseUrl_ThirdActivity, "/v1/app/v2/bindToPhoneByAuthCode"), n(n({}, x), {}, {
              sign: (0, a.default)("".concat((0, c.createStrBeforeSign)(x)).concat(s))
            })).then((function(e) {
              var n = e.data,
                t = n.accessToken,
                r = n.customerInfo,
                i = n.merged,
                o = n.mobilePhone;
              (0, u.updateUserInfo)(r, i ? t : null, o), p(i)
            })).catch(h);
          case 10:
          case "end":
            return e.stop()
        }
      }), t)
    })));
    return function(e, n) {
      return p.apply(this, arguments)
    }
  }())
}, exports.code2Session2 = function() {
  return new Promise(function() {
    var u = t(e().mark((function t(u) {
      var p, d;
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.next = 2, getApp().getAuthCode(!0);
          case 2:
            p = e.sent, d = {
              code: p,
              miniAppId: i.default.pro.miniAppId_weixin,
              third: "wxmini",
              s: 2
            }, r.default.post("".concat(o.baseUrl_ThirdActivity, "/v1/app/wx/tiny-app/code2Session"), n(n({}, d), {}, {
              sign: (0, a.default)("".concat((0, c.createStrBeforeSign)(d)).concat(s))
            })).then((function(e) {
              var n = e.data,
                t = n.openid,
                r = n.unionid;
              wx.setStorageSync("wxId", {
                OPENID: t,
                UNIONID: r
              }), u({
                openid: t,
                unionid: r
              })
            })).catch((function(e) {
              getApp().showToast("网络异常，请稍后重试", null, 2e3)
            }));
          case 5:
          case "end":
            return e.stop()
        }
      }), t)
    })));
    return function(e) {
      return u.apply(this, arguments)
    }
  }())
}, exports.loginByAuthCode2 = function() {
  return new Promise(function() {
    var u = t(e().mark((function t(u) {
      var p, d, f, h, l;
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.next = 2, getApp().getOpenId();
          case 2:
            return p = e.sent, d = p.OPENID, f = p.UNIONID, e.next = 7, getApp().getAuthCode();
          case 7:
            h = e.sent, l = {
              authCode: h,
              openId: d,
              unionid: f,
              miniAppId: i.default.pro.miniAppId_weixin,
              third: "wxmini",
              s: 2
            }, r.default.post("".concat(o.baseUrl_ThirdActivity, "/v1/app/v2/loginByAuthCode"), n(n({}, l), {}, {
              sign: (0, a.default)("".concat((0, c.createStrBeforeSign)(l)).concat(s))
            })).then((function(e) {
              var n = e.data;
              u(n)
            })).catch((function() {
              return u({})
            }));
          case 10:
          case "end":
            return e.stop()
        }
      }), t)
    })));
    return function(e) {
      return u.apply(this, arguments)
    }
  }())
}, exports.regByUnionid2 = function() {
  return d.apply(this, arguments)
};
var e = require("../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../@babel/runtime/helpers/objectSpread2"),
  t = require("../@babel/runtime/helpers/asyncToGenerator"),
  r = p(require("./index")),
  i = p(require("@/config/index")),
  o = require("@/env"),
  a = p(require("@/utils/js-md5")),
  c = require("@/utils/index"),
  u = require("./user");

function p(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
var s = "c274bac6493544b89d9c4f9d8d542b84";

function d() {
  return (d = t(e().mark((function p() {
    return e().wrap((function(p) {
      for (;;) switch (p.prev = p.next) {
        case 0:
          return p.abrupt("return", new Promise(function() {
            var p = t(e().mark((function t(p, d) {
              var f, h, l, v, g;
              return e().wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, getApp().getOpenId();
                  case 2:
                    return f = e.sent, h = f.OPENID, l = f.UNIONID, e.next = 7, getApp().getAuthCode();
                  case 7:
                    v = e.sent, g = {
                      code: v,
                      openId: h,
                      unionid: l,
                      miniAppId: i.default.pro.miniAppId_weixin,
                      third: "wxmini",
                      s: 2
                    }, r.default.post("".concat(o.baseUrl_ThirdActivity, "/v1/app/regByUnionid"), n(n({}, g), {}, {
                      sign: (0, a.default)("".concat((0, c.createStrBeforeSign)(g)).concat(s))
                    })).then((function(e) {
                      var n = e.data,
                        t = n.accessToken,
                        r = n.customerInfo,
                        i = n.mobilePhone;
                      (0, u.updateUserInfo)(r, t, i), p()
                    })).catch((function(e) {
                      e && 5017 === e.code && getApp().showToast("该手机号已注销"), d(e)
                    }));
                  case 10:
                  case "end":
                    return e.stop()
                }
              }), t)
            })));
            return function(e, n) {
              return p.apply(this, arguments)
            }
          }()));
        case 1:
        case "end":
          return p.stop()
      }
    }), p)
  })))).apply(this, arguments)
}
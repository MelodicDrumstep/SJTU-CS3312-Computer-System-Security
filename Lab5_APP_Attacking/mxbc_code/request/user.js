Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.bindPhone = function(e) {
  var u = e.encryptedData,
    i = e.iv,
    a = e.uid,
    s = e.mid;
  return new Promise(function() {
    var e = n(t().mark((function e(n, p) {
      var c, f, l, h;
      return t().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.next = 2, getApp().getOpenId();
          case 2:
            return c = e.sent, f = c.OPENID, l = c.UNIONID, e.next = 7, getApp().getAuthCode();
          case 7:
            h = e.sent, r.default.post("/v2/app/bindToPhoneByAuthCode", {
              authCode: h,
              openId: f,
              unionid: l,
              inviterCustomerId: a,
              marketingId: s,
              encryptedData: u,
              iv: i,
              third: "wxmini",
              miniAppId: o.default.pro.miniAppId_weixin
            }).then((function(e) {
              var t = e.data,
                r = t.accessToken,
                o = t.customerInfo,
                u = t.merged,
                i = t.mobilePhone,
                a = t.getNewGift;
              d(o, u ? r : null, i), n({
                merged: u,
                getNewGift: a
              })
            })).catch(p);
          case 9:
          case "end":
            return e.stop()
        }
      }), e)
    })));
    return function(t, n) {
      return e.apply(this, arguments)
    }
  }())
}, exports.changeMobilePhone = function(e, t) {
  return r.default.post("/v1/customer/chgPhone", {
    mobilePhone: e,
    captcha: t
  })
}, exports.checkWelfareGroup = function(e) {
  return r.default.post("".concat(u.baseUrl_Activity, "/ordact/api/v1/customer/welfareAndGroup/check"), e)
}, exports.code2Session = function() {
  return new Promise(function() {
    var e = n(t().mark((function e(n) {
      var u;
      return t().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.next = 2, getApp().getAuthCode(!0);
          case 2:
            u = e.sent, r.default.post("/v1/app/code2Session", {
              miniAppId: o.default.pro.miniAppId_weixin,
              code: u
            }).then((function(e) {
              var t = e.data,
                r = t.openid,
                o = t.unionid;
              n({
                openid: r,
                unionid: o
              })
            })).catch((function(e) {
              getApp().showToast("网络异常，请稍后重试", null, 2e3)
            }));
          case 4:
          case "end":
            return e.stop()
        }
      }), e)
    })));
    return function(t) {
      return e.apply(this, arguments)
    }
  }())
}, exports.daySign = function() {
  return r.default.get("/v1/customer/signin")
}, exports.fetchCaptcha = function(e, t) {
  return r.default.post("/v1/app/captchaSms", {
    sign: (0, a.default)("captchaVerifyParam=".concat(t, "&mobilePhone=").concat(e, "&s=2c274bac6493544b89d9c4f9d8d542b84")),
    mobilePhone: e,
    captchaVerifyParam: t,
    s: 2
  })
}, exports.getMedal = function() {
  return r.default.get("/v1/medal/customerInfo")
}, exports.getPointRecord = function(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 20;
  return r.default.post("/v1/customer/getPointList", {
    changeType: e,
    pageNumber: t,
    pageSize: n
  })
}, exports.getRights = function() {
  return r.default.get("/v1/customer/levels")
}, exports.getRights2 = function(e) {
  return r.default.post("/v1/memberRights/levels", e)
}, exports.getRightsCoupons = function(e) {
  return r.default.post("/v1/memberRights/getCoupons", e)
}, exports.getUserInfo = function() {
  return new Promise((function(e, t) {
    r.default.get("/v1/customer/info").then((function(t) {
      var n = t.data;
      d(n), e(n)
    })).catch(t)
  }))
}, exports.getVersionInfo = function() {
  return r.default.post("/v1/app/version", {
    versionType: 4
  })
}, exports.homePageRights = function(e) {
  return r.default.post("/v1/memberRights/mainPage/levels", e)
}, exports.loginByAuthCode = function() {
  return new Promise(function() {
    var e = n(t().mark((function e(n) {
      var u, i, a, s;
      return t().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.next = 2, getApp().getOpenId();
          case 2:
            return u = e.sent, i = u.OPENID, a = u.UNIONID, e.next = 7, getApp().getAuthCode();
          case 7:
            s = e.sent, r.default.post("/v2/app/loginByAuthCode", {
              authCode: s,
              openId: i,
              unionid: a,
              third: "wxmini",
              miniAppId: o.default.pro.miniAppId_weixin
            }).then((function(e) {
              var t = e.data;
              n(t)
            })).catch((function() {
              return n({})
            }));
          case 9:
          case "end":
            return e.stop()
        }
      }), e)
    })));
    return function(t) {
      return e.apply(this, arguments)
    }
  }())
}, exports.modifyUserInfo = function(e) {
  return r.default.post("/v1/customer/update", e)
}, exports.regByUnionid = function() {
  return c.apply(this, arguments)
}, exports.reportTrack = function(e) {
  return f.apply(this, arguments)
}, exports.unReg = function() {
  return r.default.get("/v1/app/unreg")
}, exports.unbindPhone = function() {
  return r.default.post("/v1/app/thirdUnbind", {
    third: "wxmini"
  })
}, exports.updateUserInfo = d, exports.upload = function(e) {
  return r.default.upload("/v1/image/upload", e)
};
var e = require("../@babel/runtime/helpers/objectSpread2"),
  t = require("../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../@babel/runtime/helpers/asyncToGenerator"),
  r = p(require("./index")),
  o = p(require("@/config/index")),
  u = require("@/env"),
  i = require("@/utils/base64"),
  a = p(require("@/utils/js-md5")),
  s = p(require("@/utils/httpQueue"));

function p(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}

function c() {
  return (c = n(t().mark((function e() {
    var u;
    return t().wrap((function(e) {
      for (;;) switch (e.prev = e.next) {
        case 0:
          return u = "/v1/app/regByUnionid", e.abrupt("return", new Promise((function(e, i) {
            s.default.add(u, {
              res: e,
              rej: i
            }, n(t().mark((function e() {
              var n, i, a, p, c;
              return t().wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return n = s.default.get(u), e.next = 3, getApp().getOpenId();
                  case 3:
                    return i = e.sent, a = i.OPENID, p = i.UNIONID, e.next = 8, getApp().getAuthCode();
                  case 8:
                    c = e.sent, r.default.post(u, {
                      code: c,
                      openId: a,
                      unionid: p,
                      third: "wxmini",
                      miniAppId: o.default.pro.miniAppId_weixin
                    }).then((function(e) {
                      var t = e.data,
                        r = t.accessToken;
                      for (d(t.customerInfo, r, t.mobilePhone); n.length;) n.shift().res();
                      s.default.delete(u)
                    })).catch((function(e) {
                      for (e && 5017 === e.code && getApp().showToast("该手机号已注销"); n.length;) n.shift().rej(e);
                      s.default.delete(u)
                    }));
                  case 10:
                  case "end":
                    return e.stop()
                }
              }), e)
            }))))
          })));
        case 2:
        case "end":
          return e.stop()
      }
    }), e)
  })))).apply(this, arguments)
}

function d(e, t, n) {
  if (e) {
    var r = e.customerLevelVo,
      o = e.customerLevel,
      u = e.growthValue;
    e.nickname && (e.nickname = i.Base64.decode(e.nickname)), e.isBirthday = +getApp().isBirthday(), e.currentPrecent = 4 === o ? 100 : r ? Math.round(u / r.growthValueMax * 100) : 0, wx.setStorageSync("userInfo", e), getApp().globalData.userInfo = e, getApp().globalData.isJuniorMember = !e.mobilePhone
  }
  t && (wx.setStorageSync("accessToken", t), getApp().accessToken = t), n && wx.setStorageSync("mobilePhone", n)
}

function f() {
  return (f = n(t().mark((function n(o) {
    var i, a;
    return t().wrap((function(t) {
      for (;;) switch (t.prev = t.next) {
        case 0:
          return t.next = 2, getApp().getOpenId();
        case 2:
          return i = t.sent, a = i.OPENID, t.abrupt("return", r.default.post("".concat(u.baseUrl_report, "/submsg/webapp/v1/subscribe/wechat/report"), e({
            openid: a
          }, o)));
        case 5:
        case "end":
          return t.stop()
      }
    }), n)
  })))).apply(this, arguments)
}
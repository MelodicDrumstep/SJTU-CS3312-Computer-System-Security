var e, t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("@/request/user"),
  n = require("@/request/webView"),
  i = require("@/utils/index"),
  o = require("@/env"),
  s = (e = require("@/enum/index")) && e.__esModule ? e : {
    default: e
  };
Page({
  data: {
    url: "",
    selectedStore: {},
    options: {},
    showLogin: null,
    isThirdActivity: !1,
    fromSource: ""
  },
  shareOpt: {},
  onLoad: function(e) {
    var o = this;
    return r(t().mark((function r() {
      var s, c, u, d, l, p, h, m, g, b, f, x, k, U, v, w, P, O, I, T, q;
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            if (o.setData({
                options: e
              }), s = e.url, c = e.q, s || c) {
              t.next = 5;
              break
            }
            return u = setTimeout((function() {
              wx.navigateBack(), clearTimeout(u)
            }), 500), t.abrupt("return");
          case 5:
            if (s = o.getRedirect(decodeURIComponent(c || s)), s = decodeURIComponent(decodeURIComponent(s)), d = -1 !== s.indexOf("dexfu.cn"), l = -1 !== s.indexOf("mxbc.net"), p = (0, i.getUrlParam)(s), h = p.needToken, m = p.disShare, g = p.fromSource, b = o.data.isThirdActivity, m && wx.hideShareMenu(), !b && 2 != h && !d || getApp().globalData.userInfo.mobilePhone) {
              t.next = 14;
              break
            }
            return t.abrupt("return", o.setData({
              showLogin: !0,
              fromSource: g || ""
            }));
          case 14:
            if (1 != h || getApp().accessToken) {
              t.next = 17;
              break
            }
            return t.next = 17, (0, a.regByUnionid)();
          case 17:
            if (f = e.url ? "?url=".concat(e.url) : "?q=".concat(e.q), 3 != h || o.isRegisterBack || getApp().globalData.userInfo.mobilePhone) {
              t.next = 20;
              break
            }
            return t.abrupt("return", getApp().checkPhone(f));
          case 20:
            if (!b) {
              t.next = 27;
              break
            }
            x = s.split("c=")[0], k = s.split("c=")[1] ? "c=" + encodeURIComponent(s.split("c=")[1]) : "", s = x + k, s = (0, i.updUrlParam)(s, "accessToken", getApp().accessToken), t.next = 37;
            break;
          case 27:
            if (!d) {
              t.next = 36;
              break
            }
            return s.indexOf("dbredirect") > -1 && (s = decodeURIComponent("".concat(s.split("dbredirect=")[1].indexOf("https") > -1 ? "" : "https:") + s.split("dbredirect=")[1])), t.next = 31, (0, n.getDBLoginUrl)(s);
          case 31:
            U = t.sent, v = U.data, s = v.loginUrl, t.next = 37;
            break;
          case 36:
            h && l && (s = (0, i.updUrlParam)(s, "accessToken", getApp().accessToken));
          case 37:
            (l || h) && (I = null === (w = getApp()) || void 0 === w || null === (P = w.globalData) || void 0 === P || null === (O = P.userInfo) || void 0 === O ? void 0 : O.customerId, T = wx.getStorageSync("wxId") || {}, q = T.UNIONID, s = (0, i.updUrlParam)(s, "cid", I || q || ""), s = (0, i.updUrlParam)(s, "t", (0, i.formatDate)(new Date, "yyyyMMddhh"))), o.setData({
              url: s,
              showLogin: !1
            });
          case 39:
          case "end":
            return t.stop()
        }
      }), r)
    })))()
  },
  getRedirect: function(e) {
    var t, r = -1 !== e.indexOf("mxbc.net/w?r=");
    if (r) {
      var a = (0, i.getUrlParam)(e).r,
        n = (0, i.delUrlParam)(e, "r").split("?")[1];
      e = "".concat(o.baseUrl_Web, "/#/").concat(a, "?").concat(n)
    }
    return t = r || -1 !== e.indexOf("mxbc.net/#/third"), this.setData({
      isThirdActivity: t
    }), e
  },
  bindMessage: function(e) {
    var t, r = e.detail.data;
    this.shareOpt = r && r.length && r.pop(), getApp().captchaVerifyParam = null === (t = this.shareOpt) || void 0 === t ? void 0 : t.captchaVerifyParam
  },
  onRegisterBack: function(e) {
    var t = e.detail;
    this.isRegisterBack = !0, this.onLoad(t)
  },
  onShareAppMessage: function(e) {
    var t = (0, i.delUrlParam)(e.webViewUrl, "accessToken");
    t = (0, i.delUrlParam)(t, "mobilePhone");
    var r = this.shareOpt.link ? this.shareOpt.link : t,
      a = "/pages/webView/index?url=".concat(encodeURIComponent(r));
    return {
      title: this.shareOpt.title || "".concat(s.default.brandName),
      path: a,
      imageUrl: this.shareOpt.imgUrl || ""
    }
  }
});
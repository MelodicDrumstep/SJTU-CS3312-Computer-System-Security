require("../../@babel/runtime/helpers/Arrayincludes");
var e, t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  a = require("../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("@/request/user"),
  i = require("@/request/thirdActivity"),
  r = (e = require("@/enum/index")) && e.__esModule ? e : {
    default: e
  };
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  properties: {
    options: {
      type: Object,
      value: {}
    },
    isNavigateBack: {
      type: Boolean,
      value: !0
    },
    isThirdActivity: {
      type: Boolean,
      value: !1
    },
    template: {
      type: String,
      value: "default"
    },
    fromSource: {
      type: String,
      value: ""
    }
  },
  data: {
    tips: "",
    isShowTip: !1,
    isGetNewGift: !1,
    isBindPhone: !0,
    showCancel: !1,
    brandName: r.default.brandName,
    privacyStatus: !1,
    switchToLIst: ["/pages/index/index"]
  },
  isMerged: !1,
  accessToken: null,
  customerInfo: null,
  uid: "",
  mid: "",
  ready: function() {
    var e = this;
    return a(t().mark((function a() {
      var r, o, s, c, u, d;
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            if (e.uid = e.data.options.uid, e.mid = e.data.options.mid, getApp().showLoading(), getCurrentPages().length > 1 && e.setData({
                showCancel: !0
              }), getApp().globalData.userInfo.mobilePhone) {
              t.next = 12;
              break
            }
            if (!e.data.isThirdActivity) {
              t.next = 10;
              break
            }
            return t.next = 8, (0, i.code2Session2)();
          case 8:
            t.next = 12;
            break;
          case 10:
            return t.next = 12, (0, n.code2Session)();
          case 12:
            if (!e.data.isThirdActivity) {
              t.next = 18;
              break
            }
            return t.next = 15, (0, i.loginByAuthCode2)();
          case 15:
            t.t0 = t.sent, t.next = 21;
            break;
          case 18:
            return t.next = 20, (0, n.loginByAuthCode)();
          case 20:
            t.t0 = t.sent;
          case 21:
            r = t.t0, o = r.isBindPhone, s = r.accessToken, c = r.customerInfo, u = r.mobilePhone, d = r.getNewGift, e.setData({
              isBindPhone: Boolean(o)
            }, (function() {
              e.accessToken = s, e.customerInfo = c, e.mobilePhone = u, e.getNewGift = d, e.bindPhoneChecked = !0, wx.hideLoading()
            }));
          case 28:
          case "end":
            return t.stop()
        }
      }), a)
    })))()
  },
  methods: {
    login: function() {
      var e = this;
      return a(t().mark((function a() {
        var i, r, o;
        return t().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
            case 0:
              if (e.bindPhoneChecked) {
                t.next = 2;
                break
              }
              return t.abrupt("return");
            case 2:
              if (!e.data.options.showNewGiftResult || e.getNewGift) {
                t.next = 5;
                break
              }
              return t.next = 5, e.asyncToast();
            case 5:
              if ((0, n.updateUserInfo)(e.customerInfo, e.accessToken, e.mobilePhone), getApp().globalData.isShowPrivacy = !1, wx.setStorageSync("privacyVersion", getApp().configData.privacyVersion), !e.data.options.returnUrl) {
                t.next = 14;
                break
              }
              for (o in i = e.data.options.returnUrl, r = "", e.data.options) "returnUrl" !== o && (r += r ? "&".concat(o, "=").concat(e.data.options[o]) : "?".concat(o, "=").concat(e.data.options[o]));
              return e.data.switchToLIst.includes(i) ? wx.reLaunch({
                url: i + r
              }) : wx.navigateTo({
                url: i + r
              }), t.abrupt("return");
            case 14:
              e.goBack(e.data.isNavigateBack);
            case 15:
            case "end":
              return t.stop()
          }
        }), a)
      })))()
    },
    getSessionKey: function() {
      wx.checkSession({
        success: function() {},
        fail: function() {
          getApp().getOpenId(!0)
        }
      })
    },
    getPhoneNumber: function(e) {
      var o = this;
      return a(t().mark((function a() {
        var s, c, u, d, p, h, g, f, l, v, m;
        return t().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
            case 0:
              if (t.prev = 0, s = e.detail, c = s.errMsg, u = s.encryptedData, d = s.iv, "getPhoneNumber:ok" === c) {
                t.next = 4;
                break
              }
              return t.abrupt("return");
            case 4:
              if (getApp().showLoading(), console.log("get_phone_success:regFromSource:", o.data.fromSource), getApp().trackEvent("get_phone_success", {
                  newUserFromSource: o.data.fromSource || "无"
                }), p = o.data.isThirdActivity ? i.regByUnionid2 : n.regByUnionid, h = o.data.isThirdActivity ? i.bindPhone2 : n.bindPhone, o.accessToken) {
                t.next = 14;
                break
              }
              return t.next = 12, p();
            case 12:
              t.next = 15;
              break;
            case 14:
              (0, n.updateUserInfo)(o.customerInfo, o.accessToken, o.mobilePhone);
            case 15:
              if (getApp().globalData.userInfo.mobilePhone) {
                t.next = 25;
                break
              }
              return t.next = 18, h({
                encryptedData: u,
                iv: d,
                uid: o.uid,
                mid: o.mid
              });
            case 18:
              g = t.sent, f = g.merged, l = g.getNewGift, o.isMerged = f, o.isMerged && o.setData({
                tips: "手机已注册会员，登录成功，历史订单将会合并到会员账号",
                isShowTip: !0
              }), l && o.setData({
                isGetNewGift: !0
              }), o.data.options.showNewGiftResult && !l && getApp().showToast("您已经是老用户啦~");
            case 25:
              wx.hideLoading(), o.data.isShowTip || o.data.isGetNewGift || o.goBack(o.data.isNavigateBack), t.next = 35;
              break;
            case 29:
              t.prev = 29, t.t0 = t.catch(0), v = t.t0.code, m = t.t0.msg, wx.hideLoading(), [5009, 7017].includes(v) ? o.setData({
                tips: 5009 == v ? "手机号已绑定其他账号，无法绑定，您可以使用手机号登录".concat(r.default.brandName, "APP操作换绑") : 7017 == v ? "有进行中的订单，请在订单完成后绑定" : m,
                isShowTip: !0
              }) : (getApp().showToast("网络异常，请重试"), o.data.isThirdActivity ? (0, i.code2Session2)() : (0, n.code2Session)());
            case 35:
            case "end":
              return t.stop()
          }
        }), a, null, [
          [0, 29]
        ])
      })))()
    },
    tipConfirm: function() {
      var e = this;
      this.setData({
        isShowTip: !1
      }, (function() {
        !e.data.isGetNewGift && e.isMerged && e.goBack(e.data.isNavigateBack)
      }))
    },
    newGiftConfirm: function() {
      var e = this;
      this.setData({
        isGetNewGift: !1
      }, (function() {
        e.data.isShowTip || e.goBack(e.data.isNavigateBack)
      }))
    },
    goBack: function() {
      var e = this,
        t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
      this.triggerEvent("end", this.data.options), t && wx.navigateBack({
        success: function() {
          var t = setTimeout((function() {
            var a = getCurrentPages(),
              n = a[a.length - 1];
            n.onRegisterBack && n.onRegisterBack({
              detail: e.data.options
            }), clearTimeout(t)
          }), 500)
        }
      })
    },
    updatePrivacyStatus: function() {
      this.setData({
        privacyStatus: !this.data.privacyStatus
      })
    },
    checkedTap: function() {
      getApp().showToast("请勾选同意《".concat(r.default.brandName, "个人信息保护政策》及《").concat(r.default.brandName, "用户服务协议》"))
    },
    advertiseTap: function(e) {
      var t = e.currentTarget.dataset.url;
      getApp().navigate(t)
    },
    asyncToast: function() {
      return new Promise((function(e) {
        getApp().showToast("您已经是老用户啦~");
        var t = setTimeout((function() {
          clearTimeout(t), e()
        }), 1e3)
      }))
    }
  }
});
require("./@babel/runtime/helpers/Arrayincludes");
var e = require("./@babel/runtime/helpers/regeneratorRuntime"),
  t = require("./@babel/runtime/helpers/slicedToArray"),
  a = require("./@babel/runtime/helpers/asyncToGenerator"),
  i = require("./@babel/runtime/helpers/objectSpread2");
require("@/utils/globalWatcher/index"), require("@/utils/umtrack-wx/index");
var n = g(require("@/utils/globalWatcher/apiProxy")),
  r = g(require("@/utils/globalWatcher/reactive")),
  o = require("@/utils/index"),
  s = g(require("@/utils/track")),
  u = require("@/env"),
  c = require("@/request/user"),
  l = g(require("@/enum/index"));

function g(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
var d, p = wx.getStorageSync("statusBarHeight") || 0;
p || (p = (null === (d = wx.getSystemInfoSync()) || void 0 === d ? void 0 : d.statusBarHeight) || 0, wx.setStorage({
  key: "statusBarHeight",
  data: p
}));
var f = wx.getStorageSync("clientRect") || {};
null != f && f.width || (Object.assign(f, wx.getMenuButtonBoundingClientRect() || {}), wx.setStorage({
  key: "clientRect",
  data: f
}));
var h = wx.getStorageSync("userInfo") || {},
  m = wx.getStorageSync("accessToken") || "",
  b = Boolean(m && !h.mobilePhone);
(0, o.polyfillObj)(), App(i(i({
  umengConfig: {
    appKey: "6415337aba6a5259c42080d6",
    useOpenid: !0,
    autoGetOpenid: !0,
    debug: !1,
    uploadUserInfo: !1,
    enableVerify: !1
  }
}, n.default), {}, {
  onLaunch: function() {
    this.checkUpdate(), this.globalData = (0, r.default)(this.globalData), s.default.init()
  },
  checkUpdate: function() {
    var e = setTimeout((function() {
      clearTimeout(e), (0, c.getVersionInfo)().then((function(e) {
        var t = e.data,
          a = t.versionNo,
          i = t.isForce;
        if (!(0, o.isLatestVerison)(u.version, a) && i) {
          var n = wx.getUpdateManager();
          n.onUpdateReady((function() {
            n.applyUpdate()
          })), n.onUpdateFailed((function() {
            wx.showModal({
              title: "更新提示",
              content: "请点击右上角“重新进入小程序”，以使用最新功能",
              showCancel: !1,
              success: function(e) {
                e.confirm && "function" == typeof wx.exitMiniProgram && wx.exitMiniProgram() && wx.exitMiniProgram()
              }
            })
          }))
        }
      }))
    }), 2500)
  },
  checkPhone: function() {
    var e = this,
      t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    return new Promise((function(a) {
      e.globalData.userInfo.mobilePhone ? a() : wx.navigateTo({
        url: "/pages/register/index" + t
      })
    }))
  },
  getAuthCode: function() {
    var e = this,
      t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    return new Promise((function(a, i) {
      if (e.authCode && !t) a(e.authCode);
      else {
        var n = e;
        wx.login({
          complete: function(e) {
            var t = e.code,
              r = e.errMsg;
            e.errno;
            t ? (n.authCode = t, a(t)) : i(r)
          }
        })
      }
    }))
  },
  getOpenId: function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
      t = wx.getStorageSync("wxId") || {},
      a = t.OPENID,
      i = t.UNIONID;
    return new Promise((function(t) {
      if (!i || e) return (0, c.code2Session)().then((function(e) {
        var a = e.openid,
          i = e.unionid;
        wx.setStorageSync("wxId", {
          OPENID: a,
          UNIONID: i
        }), t({
          OPENID: a,
          UNIONID: i
        })
      }));
      t({
        OPENID: a,
        UNIONID: i
      })
    }))
  },
  getUserLocation: function(e) {
    var t = this;
    return new Promise((function(a) {
      if (t.invisibleData.latitude) return a(t.invisibleData);
      wx.getSetting({
        success: function(i) {
          var n = i.authSetting;
          if (0 == n["scope.userLocation"]) t.globalData.userLocationPermission = !1, a({});
          else {
            if (e && 1 != n["scope.userLocation"]) return a({});
            wx.getLocation({
              type: "gcj02",
              success: function(e) {
                var i = e.longitude,
                  n = e.latitude;
                t.globalData.userLocationPermission = !0, Object.assign(t.invisibleData, {
                  longitude: i,
                  latitude: n
                }), a({
                  longitude: i,
                  latitude: n
                })
              },
              fail: function() {
                t.invisibleData.latitude || (t.globalData.userLocationPermission = !1), a(t.invisibleData)
              }
            })
          }
        },
        fail: function() {
          a({})
        }
      })
    }))
  },
  getUserLocation2: function(e) {
    var t = this;
    return new Promise((function(a) {
      var i = new Promise((function(a) {
          if (t.invisibleData.latitude) return a(t.invisibleData);
          wx.getSetting({
            success: function(i) {
              var n = i.authSetting;
              if (0 == n["scope.userLocation"]) t.globalData.userLocationPermission = !1, a({});
              else {
                if (e && 1 != n["scope.userLocation"]) return a({});
                wx.getLocation({
                  type: "gcj02",
                  success: function(e) {
                    var i = e.longitude,
                      n = e.latitude;
                    t.globalData.userLocationPermission = !0, Object.assign(t.invisibleData, {
                      longitude: i,
                      latitude: n
                    }), a({
                      longitude: i,
                      latitude: n
                    })
                  },
                  fail: function() {
                    t.invisibleData.latitude || (t.globalData.userLocationPermission = !1), a(t.invisibleData)
                  }
                })
              }
            },
            fail: function() {
              a({})
            }
          })
        })),
        n = new Promise((function(e) {
          setTimeout((function() {
            e({
              timeout: !0
            })
          }), 1e4)
        }));
      Promise.race([i, n]).then((function(e) {
        e.timeout ? (console.log("getLocation timeout"), a({})) : a(e)
      }))
    }))
  },
  navigate: function(i) {
    var n = this;
    return a(e().mark((function a() {
      var r, s, u, c, l, g, d, p, f, h, m, b, x, v, w, y, P, D, S, I;
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            if (i) {
              e.next = 2;
              break
            }
            return e.abrupt("return");
          case 2:
            if (!i.startsWith("http://") && !i.startsWith("https://")) {
              e.next = 6;
              break
            }
            wx.navigateTo({
              url: "/pages/webView/index?url=".concat(encodeURIComponent(i))
            }), e.next = 43;
            break;
          case 6:
            if (!i.startsWith("/pages/menu/")) {
              e.next = 15;
              break
            }
            r = (0, o.getUrlParam)(i), s = getCurrentPages().pop() || {}, getApp().productName = r.productName, getApp().categoryNameSale = r.categoryNameSale, getApp().saleCategoryId = r.saleCategoryId, "pages/menu/index" === s.route ? (s.openGoodsDetail({
              productName: r.productName
            }), s.appointCategory({
              categoryNameSale: r.categoryNameSale
            }), s.appointTab({
              saleCategoryId: r.saleCategoryId
            })) : (getApp().menuOptions = r, wx.switchTab({
              url: "/pages/menu/index"
            })), e.next = 43;
            break;
          case 15:
            if (!i.startsWith("/pages")) {
              e.next = 28;
              break
            }
            if (u = ["/pages/index/", "/pages/order/", "/pages/mine/"].some((function(e) {
                return i.includes(e)
              })), c = ["/pages/coupon/mine/", "/pages/coupon/cdKey/", "/pages/customer-center/rights/", "/pages/customer-center/coin/", "/pages/customer-center/record/", "/pages/wallet/gift-card", "/pages/activity/assist/index"].some((function(e) {
                return i.includes(e)
              })), !u) {
              e.next = 22;
              break
            }
            wx.switchTab({
              url: i
            }), e.next = 26;
            break;
          case 22:
            if (!c) {
              e.next = 25;
              break
            }
            return e.next = 25, n.checkPhone();
          case 25:
            wx.navigateTo({
              url: i
            });
          case 26:
            e.next = 43;
            break;
          case 28:
            if (!i.startsWith("thirdMini://")) {
              e.next = 34;
              break
            }
            l = i.replace("thirdMini://", "").replace(".html", "").split("?appId="), g = t(l, 2), d = g[0], p = g[1], f = p.split("&extraData="), h = t(f, 2), m = h[0], b = h[1], wx.navigateToMiniProgram({
              path: d,
              appId: m,
              extraData: b ? JSON.parse(b) : {}
            }), e.next = 43;
            break;
          case 34:
            if (!i.startsWith("wxVideo://")) {
              e.next = 42;
              break
            }
            if (x = wx.getSystemInfoSync(), !(x.SDKVersion < "2.19.2")) {
              e.next = 38;
              break
            }
            return e.abrupt("return", wx.showModal({
              title: "无法跳转视频号视频",
              content: "当前微信版本过低，请升级到最新微信版本后重试。"
            }));
          case 38:
            v = (0, o.getUrlParam)(i), w = v.finderUserName, y = v.feedId, wx.openChannelsActivity({
              finderUserName: w,
              feedId: y
            }), e.next = 43;
            break;
          case 42:
            i.startsWith("wxLive://") && (P = (0, o.getUrlParam)(i), D = P.finderUserName, S = P.feedId, I = P.nonceId, wx.openChannelsLive({
              finderUserName: D,
              feedId: S,
              nonceId: I
            }));
          case 43:
          case "end":
            return e.stop()
        }
      }), a)
    })))()
  },
  isBirthday: function(e) {
    var t = e || this.globalData.userInfo.birthdayStr;
    if (!t || !this.configData || !this.configData.timestamp) return !1;
    t = t.split("-").map((function(e) {
      return +e
    })).slice(-2).join("/");
    var a = new Date(+this.configData.timestamp);
    return t === "".concat(a.getMonth() + 1, "/").concat(a.getDate())
  },
  onPageNotFound: function() {
    wx.reLaunch({
      url: "pages/index/index"
    })
  },
  logOut: function() {
    this.accessToken = "", this.globalData.userInfo = {}, this.isGuide = !1, this.removeStorageSync("accessToken"), this.removeStorageSync("userInfo"), this.removeStorageSync("mobilePhone")
  },
  checkCaptchaVerify: function(e) {
    if (!getApp().captchaVerifyParam) return getApp().fromCaptchaVerify = !0, void getApp().navigate("".concat(u.baseUrl_Web, "/#/captcha?id=8xxl6vw1"));
    e && e()
  },
  globalData: {
    jointOrderConfig: {},
    regGuidanceSettingVo: {},
    baseUrl_Web: u.baseUrl_Web,
    brandKey: l.default.brandKey,
    userInfo: h,
    isJuniorMember: b,
    couponNum: 0,
    selectedStore: {},
    currentAddress: {},
    statusBarHeight: p,
    navBarHeight: f.height + 2 * (f.top - p),
    menuButtonWidth: f.width || 0,
    userLocationPermission: !0,
    isShowPrivacy: 0,
    defaultCancelFee: 0,
    fromApp: !1,
    isProMini: u.isProMini,
    showSubscribeGuide: !1
  },
  configData: {},
  menuOptions: {},
  accessToken: m,
  invisibleData: {
    longitude: 0,
    latitude: 0
  },
  orderPointBaseValue: 0,
  orderGrowthBaseValue: 0,
  isGuide: !1,
  isIccGroupMember: !1,
  isIccWelfareMember: !1,
  setThirdPartyParams: function(e) {
    var t = e.channel,
      a = void 0 === t ? "" : t,
      i = e.activity,
      n = void 0 === i ? "" : i,
      r = e.extra,
      o = void 0 === r ? "" : r;
    this.thirdPartyParams = {
      channel: a,
      activity: n,
      extra: o
    }
  }
}));
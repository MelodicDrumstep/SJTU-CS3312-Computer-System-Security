var e, t = require("../../@babel/runtime/helpers/defineProperty"),
  a = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("@/request/activity"),
  i = require("@/request/user"),
  s = require("@/request/coupon"),
  o = require("@/request/order"),
  c = require("@/request/giftCard"),
  u = require("@/env"),
  l = require("@/mixins/index"),
  g = (e = require("@/enum/index")) && e.__esModule ? e : {
    default: e
  },
  d = require("@/utils/index");
var p = wx.getSystemInfoSync().windowWidth;
Page({
  data: {
    regGuidanceSettingVo: {},
    mzhdData: {},
    userInfo: {},
    couponNum: "",
    dataSource: g.default.mineCell,
    levelTxt: g.default.levelTxt_mine,
    version: u.version,
    scrollPercent: 0,
    currentLevel: 1,
    customerLevel: 1,
    levelRights: [{}],
    scrollLeft: 0,
    showSubscribeGuide: !1,
    medalData: null,
    takeNo: [],
    showTakeNo: !1,
    takeNoFold: !1,
    giftCard: {
      globalOpen: 0,
      totalBalance: null
    }
  },
  computed: {
    percentage: function(e) {
      var t = e.userInfo,
        a = t.growthValue,
        n = t.customerLevel,
        r = e.levelRights;
      if (4 === n) return 100;
      var i = r[n - 1] ? r[n - 1].growthValueMax : 0;
      return i ? Math.round(a / i * 100) : 0
    }
  },
  onShow: function() {
    var e = this;
    getApp().accessToken && ((0, i.getUserInfo)(), (0, s.getCouponTotal)().then((function(t) {
      var a = t.data;
      a && e.setData({
        couponNum: a.count || "0"
      })
    })), (0, c.queryCard)().then((function(t) {
      var a = t.data;
      e.setData({
        "giftCard.totalBalance": null === a ? null : (a.totalBalance || 0) / 100 + ""
      })
    })), this.getRights(), this.getMedals(), this.getTakeNo()), this.getMzhdData()
  },
  onLoad: function() {
    var e = this;
    setTimeout((function() {
      e.setData({
        "giftCard.globalOpen": getApp().configData.giftCard && getApp().configData.giftCard.globalOpen || {}
      })
    }), 800)
  },
  getMzhdData: function() {
    var e = this;
    return n(a().mark((function t() {
      var n, i, s, o, c;
      return a().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            if (getApp().accessToken) {
              t.next = 2;
              break
            }
            return t.abrupt("return", e.setData({
              mzhdData: {},
              medalTaskList: []
            }));
          case 2:
            return t.next = 4, (0, r.getShopMzhdAndMedal)(getApp().hotShopId);
          case 4:
            if (n = t.sent, i = n.data) {
              t.next = 8;
              break
            }
            return t.abrupt("return", e.setData({
              mzhdData: {},
              medalTaskList: []
            }));
          case 8:
            s = i.accumulatePointActivity, o = i.medalActivityList, c = o && o.filter((function(e) {
              e.remainTime = e.leftSeconds || 0;
              var t = (0, d.formatDuration)(e.remainTime < 0 ? 0 : e.remainTime),
                a = t.day,
                n = t.hour,
                r = t.minute;
              return e.day = a, e.hour = n, e.minute = r, !e.lightFlag
            })), e.setData({
              mzhdData: s || {},
              medalTaskList: c || []
            });
          case 11:
          case "end":
            return t.stop()
        }
      }), t)
    })))()
  },
  getRights: function() {
    var e = this;
    (0, i.getRights2)({
      type: 1
    }).then((function(t) {
      var a = t.data;
      if (a && a.length) {
        a.forEach((function(e) {
          e.tabIndex = 0, e.scrollPercent = 0
        }));
        var n = e.data.userInfo.customerLevel;
        e.setData({
          currentLevel: n,
          customerLevel: n,
          levelRights: a
        })
      }
    }))
  },
  signTask: function() {
    var e = this;
    return n(a().mark((function t() {
      return a().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            if (!e.data.userInfo.isSignin) {
              t.next = 2;
              break
            }
            return t.abrupt("return");
          case 2:
            return getApp().trackEvent("My_sigh"), t.next = 5, (0, l.insertSubscribeMessage)({
              key: "【我的】签到",
              isOnceADay: !0
            });
          case 5:
            (0, i.daySign)().then((function() {
              getApp().showToast("签到成功，".concat(g.default.coinName, "+").concat(g.default.signAddCoin).concat(g.default.signAddEXP ? "，".concat(g.default.EXPName, "+").concat(g.default.signAddEXP) : "")), (0, i.getUserInfo)()
            })).catch((function(e) {
              getApp().showToast(e && e.msg || "网络异常，请稍后重试")
            }));
          case 6:
          case "end":
            return t.stop()
        }
      }), t)
    })))()
  },
  onScroll: function(e) {
    var a = e.detail,
      n = a.scrollLeft / (a.scrollWidth - 696 * p / 750);
    n = n > 1 || n < 0 ? 1 : n, this.setData(t({}, "levelRights[".concat(this.data.currentLevel - 1, "].scrollPercent"), n))
  },
  toRights: function() {
    var e = this;
    return n(a().mark((function t() {
      return a().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return getApp().trackEvent("My_rights"), t.next = 3, (0, l.insertSubscribeMessage)({
              key: "查看会员权益",
              isOnceADay: !0
            });
          case 3:
            getApp().navigate("/pages/customer-center/rights/index?currentLevel=" + e.data.currentLevel);
          case 4:
          case "end":
            return t.stop()
        }
      }), t)
    })))()
  },
  toCoupon: function() {
    return n(a().mark((function e() {
      return a().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return getApp().trackEvent("My_coup"), e.next = 3, (0, l.insertSubscribeMessage)({
              key: "查看优惠券",
              isOnceADay: !0
            });
          case 3:
            getApp().navigate("/pages/coupon/mine/index");
          case 4:
          case "end":
            return e.stop()
        }
      }), e)
    })))()
  },
  toCoin: function() {
    return n(a().mark((function e() {
      return a().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return getApp().trackEvent("My_coin"), e.next = 3, (0, l.insertSubscribeMessage)({
              key: "查看积分币",
              isOnceADay: !0
            });
          case 3:
            getApp().navigate("/pages/customer-center/coin/index");
          case 4:
          case "end":
            return e.stop()
        }
      }), e)
    })))()
  },
  toGiftCard: function() {
    var e = this;
    return n(a().mark((function t() {
      return a().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.next = 2, (0, l.insertSubscribeMessage)({
              key: "礼品卡入口",
              isOnceADay: !0
            });
          case 2:
            if (getApp().globalData.userInfo.mobilePhone) {
              t.next = 4;
              break
            }
            return t.abrupt("return", e.toRegister());
          case 4:
            getApp().trackEvent("my_gift", {
              user_id: getApp().globalData.userInfo.customerId
            }), getApp().navigate("/pages/wallet/gift-card/index");
          case 6:
          case "end":
            return t.stop()
        }
      }), t)
    })))()
  },
  didSelectCell: function(e) {
    var t = e.currentTarget.dataset,
      a = t.phone,
      n = t.url,
      r = t.event;
    a && wx.makePhoneCall({
      phoneNumber: a,
      fail: function() {}
    }), r && getApp().trackEvent(r), "My_feedback" === r ? this.toKeFu() : getApp().navigate(n)
  },
  toKeFu: function() {
    var e = getApp().globalData.userInfo,
      t = e.customerId,
      a = e.customerLevel;
    getApp().navigate("".concat(u.baseUrl, "/kefu.html?cid=").concat(t, "&lv=").concat(a, "&ch=wx&needToken=3"))
  },
  toRegister: function() {
    getApp().trackEvent("My_login"), wx.navigateTo({
      url: "/pages/register/index"
    })
  },
  toProfiles: function(e) {
    var t = e.currentTarget.dataset,
      a = t.area,
      n = t.event;
    getApp().trackEvent(n, {
      current_page_title: "我的",
      element_area: a
    }), wx.navigateTo({
      url: "/pages/customer-center/profiles/index"
    })
  },
  currentChange: function(e) {
    this.setData({
      currentLevel: e.detail.current + 1
    })
  },
  changeTab: function(e) {
    var a, n = e.currentTarget.dataset.index;
    this.setData((t(a = {}, "levelRights[".concat(n[0], "].tabIndex"), n[1]), t(a, "scrollLeft", Math.random()), a))
  },
  getMedals: function() {
    var e = this;
    (0, i.getMedal)().then((function(t) {
      var a = t.data;
      a && e.setData({
        medalData: a
      })
    }))
  },
  toMedal: function() {
    return n(a().mark((function e() {
      return a().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return getApp().trackEvent("mine_click", {
              current_page_title: "我的",
              element_area: "我的勋章"
            }), e.next = 3, (0, l.insertSubscribeMessage)({
              key: "查看徽章权益",
              isOnceADay: !0
            });
          case 3:
            getApp().navigate("".concat(u.baseUrl_Web, "/#/myMedal?disShare=1&needToken=2"));
          case 4:
          case "end":
            return e.stop()
        }
      }), e)
    })))()
  },
  getTakeNo: function() {
    var e = this;
    (0, o.getIndexTakeNo)().then((function(t) {
      (t.data.takeNo || e.data.takeNo.length) && e.setData({
        takeNo: [{
          adUrl: "/pages/order/index",
          content: t.data.takeNo
        }],
        showTakeNo: !!t.data.takeNo
      })
    }))
  },
  closeTakeNo: function() {
    this.setData({
      showTakeNo: !1
    })
  },
  isExecuted: !1,
  onPageScroll: (0, d.debounceDouble)((function() {
    this.setData({
      takeNoFold: this.isExecuted = !this.isExecuted
    })
  }), 1e3, !0)
});
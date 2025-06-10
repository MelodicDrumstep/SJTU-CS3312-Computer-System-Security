var e, t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  a = require("../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("@/request/activity"),
  r = require("@/request/store"),
  o = require("@/request/user"),
  i = require("@/request/coupon"),
  s = require("@/request/jointOrder"),
  c = require("@/request/order"),
  u = require("@/mixins/index"),
  d = (e = require("@/enum/index")) && e.__esModule ? e : {
    default: e
  },
  p = require("@/utils/index");
var h = wx.getStorageSync("__mxsa__/ad/cache");
Page({
  data: {
    statusBarHeight: 0,
    navBarHeight: 0,
    menuButtonWidth: 0,
    regGuidanceSettingVo: {},
    userInfo: {},
    popupAdList: [],
    guideLoginAdList: [],
    magnetList: (null == h ? void 0 : h.magnetList) || [],
    swiperList: (null == h ? void 0 : h.swiperList) || d.default.index_placeholder,
    mainBannerList: (null == h ? void 0 : h.mainBannerList) || d.default.index_main_banner_placeholder,
    sweetNewsList: (null == h ? void 0 : h.sweetNewsList) || [],
    levelTxt: d.default.levelTxt_index || {},
    isShowPrivacy: 0,
    privacyStatus: !1,
    isProMini: !0,
    couponData: {
      count: 0,
      nextExpireCount: 0
    },
    showJointOrderType: !1,
    jointRole: 0,
    splash: {
      show: !1,
      adImg: "",
      adUrl: "",
      timer: 3
    },
    suggestData: {
      shopId: "",
      shopName: "",
      goods: []
    },
    mzhdData: {},
    showSubscribeGuide: !1,
    takeNo: [],
    showTakeNo: !1,
    takeNoFold: !1,
    loginOptions: {
      showNewGiftResult: 1
    },
    showLogin: !1,
    showLoginCom: !1,
    showAppCollect: !1,
    medalTaskList: []
  },
  shareParams: {},
  computed: {
    isHideTabBar: function(e) {
      if (!0 === e.isShowPrivacy) {
        var t = getCurrentPages();
        "pages/index/index" === t[t.length - 1].route && wx.hideTabBar()
      } else !1 === e.isShowPrivacy && this.getInitDataByLocationShop();
      return e.isShowPrivacy
    }
  },
  onLoad: function(e) {
    var n = this;
    return a(t().mark((function a() {
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            getApp().globalData.fromApp && (getApp().globalData.fromApp = !1, getApp().accessToken = wx.getStorageSync("accessToken") || ""), n.options = e, n.showAppCollect();
          case 3:
          case "end":
            return t.stop()
        }
      }), a)
    })))()
  },
  onShow: function() {
    var e = this;
    !0 === getApp().globalData.isShowPrivacy && wx.hideTabBar(), getApp().accessToken && ((0, o.getUserInfo)(), (0, i.getCouponTotal)().then((function(t) {
      var a = t.data;
      a && a.count && e.setData({
        couponData: a
      })
    })), this.getTakeNo()), this.getMzhdData()
  },
  getInitDataByLocationShop: function() {
    var e = this;
    return a(t().mark((function a() {
      var n;
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return "joint" === e.options.to && e.toJointOrder(), t.next = 3, e.getSuggestGoods();
          case 3:
            n = t.sent, getApp().hotShopId = n.shopId, e.getAdInfo(n.shopId, n.regionCode).then((function() {
              if (getApp().isBirthday()) {
                wx.hideTabBar(), e.setData({
                  "splash.show": !0
                });
                var t = setInterval((function() {
                  1 == e.data.splash.timer ? (clearInterval(t), e.setData({
                    "splash.show": !1
                  }), wx.showTabBar()) : e.setData({
                    "splash.timer": e.data.splash.timer - 1
                  })
                }), 1e3)
              }
            })), getApp().accessToken && e.getMzhdData();
          case 7:
          case "end":
            return t.stop()
        }
      }), a)
    })))()
  },
  getMzhdData: function() {
    var e = this;
    return a(t().mark((function a() {
      var r, o, i, s, c;
      return t().wrap((function(t) {
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
            return t.next = 4, (0, n.getShopMzhdAndMedal)(getApp().hotShopId);
          case 4:
            if ((r = t.sent).data) {
              t.next = 7;
              break
            }
            return t.abrupt("return", e.setData({
              mzhdData: {},
              medalTaskList: []
            }));
          case 7:
            o = r.data, i = o.accumulatePointActivity, s = o.medalActivityList, c = s && s.filter((function(e) {
              e.remainTime = e.leftSeconds || 0;
              var t = (0, p.formatDuration)(e.remainTime < 0 ? 0 : e.remainTime),
                a = t.day,
                n = t.hour,
                r = t.minute;
              return e.day = a, e.hour = n, e.minute = r, !e.lightFlag
            })), e.setData({
              mzhdData: i || {},
              medalTaskList: c || []
            });
          case 10:
          case "end":
            return t.stop()
        }
      }), a)
    })))()
  },
  getSuggestGoods: function() {
    var e = this;
    return new Promise(function() {
      var o = a(t().mark((function a(o) {
        var i, s, c, u, d, p, h, g, l, m;
        return t().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
            case 0:
              return t.next = 2, getApp().getUserLocation();
            case 2:
              if (i = t.sent, s = i.longitude, c = i.latitude, s) {
                t.next = 7;
                break
              }
              return t.abrupt("return", o({}));
            case 7:
              return t.next = 9, (0, r.getRecommendShop)({
                longitude: s,
                latitude: c
              });
            case 9:
              if (t.t0 = t.sent, t.t0) {
                t.next = 12;
                break
              }
              t.t0 = {};
            case 12:
              if (u = t.t0, !(!(d = u.data) || d && d.isOversea)) {
                t.next = 16;
                break
              }
              return t.abrupt("return", o({}));
            case 16:
              return p = d.shopId, h = d.shopName, g = d.regionCode, o({
                shopId: p,
                regionCode: g
              }), t.next = 20, (0, n.getHotGoods)(p);
            case 20:
              if (t.t1 = t.sent, t.t1) {
                t.next = 23;
                break
              }
              t.t1 = {
                data: []
              };
            case 23:
              l = t.t1, (m = l.data).length && e.setData({
                suggestData: {
                  shopId: p,
                  shopName: h,
                  goods: m
                }
              });
            case 26:
            case "end":
              return t.stop()
          }
        }), a)
      })));
      return function(e) {
        return o.apply(this, arguments)
      }
    }())
  },
  getAdInfo: function(e, t) {
    var a = this;
    return (0, n.getAdList)({
      adPlaceCodeList: ["WechartMiniHomeBanner", "WechartMiniMainBanner", "WechartMiniHomeMagnet", "WechartMiniHomeFootBanner", "WechartMiniShareChard", "WechartMiniBirthdaySplash", "WechartMiniIndexPopup"],
      shopId: e,
      areaId: t
    }).then((function(e) {
      var t, n, r;
      if (null != e && e.length) {
        var o = e.map((function(e) {
            return [e.adPlaceCode, e.adInfoList || []]
          })),
          i = Object.fromEntries(o),
          s = i.WechartMiniHomeBanner,
          c = void 0 === s ? [] : s,
          u = i.WechartMiniMainBanner,
          p = void 0 === u ? [] : u,
          h = i.WechartMiniHomeMagnet,
          g = void 0 === h ? [] : h,
          l = i.WechartMiniHomeFootBanner,
          m = void 0 === l ? [] : l,
          f = i.WechartMiniShareChard,
          v = void 0 === f ? [] : f,
          w = i.WechartMiniBirthdaySplash,
          x = void 0 === w ? [] : w,
          T = i.WechartMiniIndexPopup,
          A = void 0 === T ? [] : T;
        a.shareParams = v[0] || {};
        var D = {
          "splash.adImg": (null === (t = x[0]) || void 0 === t ? void 0 : t.adImg) || "",
          "splash.adUrl": (null === (n = x[0]) || void 0 === n ? void 0 : n.adUrl) || ""
        };
        a.data.userInfo.mobilePhone ? D.popupAdList = A : null !== (r = getApp().configData.newMemberPopUpImg) && void 0 !== r && r.miniMainImgUrl && (D.guideLoginAdList = [{
          adImg: getApp().configData.newMemberPopUpImg.miniMainImgUrl,
          adUrl: "",
          dateType: 2,
          showNum: 2
        }]);
        var k = {
          mainBannerList: d.default.index_main_banner_placeholder
        };
        g.length > 0 && (k.magnetList = g.slice(0, 4)), m.length > 0 && (k.sweetNewsList = m), c.length > 0 && (k.swiperList = c), p[0] && (k.mainBannerList[0] = p[0]), p[1] && (k.mainBannerList[1] = p[1]), a.setData(Object.assign(D, k)), getApp().setStorage("__mxsa__/ad/cache", k)
      }
    }))
  },
  toMenu: function() {
    getApp().trackEvent("takeout"), getApp().menuOptions = {
      orderType: 1
    }, wx.switchTab({
      url: "/pages/menu/index"
    })
  },
  advertiseTap: function(e) {
    var t = e.target.dataset,
      a = t.url,
      n = t.event,
      r = t.area,
      o = void 0 === r ? "" : r;
    if ("/pages/group-order/index" === a) return this.toJointOrder();
    n && getApp().trackEvent(n, {
      current_page_title: "首页",
      adUrl: a,
      element_area: o
    }), getApp().navigate(a)
  },
  toCoupon: function() {
    return a(t().mark((function e() {
      return t().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return getApp().trackEvent("Coup"), e.next = 3, (0, u.insertSubscribeMessage)({
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
    return a(t().mark((function e() {
      return t().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return getApp().trackEvent("Coin"), e.next = 3, (0, u.insertSubscribeMessage)({
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
  toJointOrder: function() {
    var e = this;
    return a(t().mark((function a() {
      var n, r, o, i, c;
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.next = 2, getApp().checkPhone("?returnUrl=/pages/index/index&to=joint");
          case 2:
            return getApp().showLoading(), t.prev = 3, t.next = 6, (0, s.queryExistJointOrder)();
          case 6:
            n = t.sent, r = n.data, wx.hideLoading(), r ? (o = r.role, i = r.cartId, 1 != r.cartStatus ? wx.redirectTo({
              url: "/pages/activity/joint-order/index?cartId=".concat(i)
            }) : (e.cartId = i, e.setData({
              jointRole: o
            }, (function() {
              e.selectComponent("#jointOrderDialog").openDialog()
            })))) : e.toCreateJoint(), t.next = 16;
            break;
          case 12:
            t.prev = 12, t.t0 = t.catch(3), c = t.t0.msg, getApp().showToast(c || "网络异常，请稍后重试 ");
          case 16:
          case "end":
            return t.stop()
        }
      }), a, null, [
        [3, 12]
      ])
    })))()
  },
  selectJointType: function(e) {
    var t = e.currentTarget.dataset.type;
    1 == +t ? wx.navigateTo({
      url: "/pages/store/index?isJointOrder=1"
    }) : 2 == +t && wx.navigateTo({
      url: "/pages/customer-center/address-list/index?isJointOrder=1"
    }), this.closeJointOrderType()
  },
  closeJointOrderType: function() {
    this.setData({
      showJointOrderType: !1
    })
  },
  toCurrentJoint: function() {
    this.cartId && wx.redirectTo({
      url: "/pages/activity/joint-order/index?cartId=".concat(this.cartId)
    })
  },
  toCreateJoint: function() {
    this.setData({
      showJointOrderType: !0
    })
  },
  closeConfirmPopup: function() {
    getApp().globalData.isShowPrivacy = !1, this.getInitDataByLocationShop(), wx.setStorageSync("privacyVersion", getApp().configData.privacyVersion);
    var e = setTimeout((function() {
      wx.showTabBar(), clearTimeout(e)
    }), 300)
  },
  disagreePrivacy: function() {
    getApp().globalData.isShowPrivacy = 0, getApp().globalData.userLocationPermission = !1;
    var e = setTimeout((function() {
      wx.showTabBar(), clearTimeout(e)
    }), 300)
  },
  closeSplash: function() {
    this.setData({
      "splash.show": !1
    }), wx.showTabBar()
  },
  updatePrivacyStatus: function() {
    this.setData({
      privacyStatus: !this.data.privacyStatus
    })
  },
  suggestGoodsTap: function(e) {
    var t = e.currentTarget.dataset.name;
    getApp().trackEvent("goods_recommend", {
      productName: t
    }), getApp().navigate("/pages/menu/index?orderType=1&shopId=".concat(this.data.suggestData.shopId, "&productName=").concat(t))
  },
  onShareAppMessage: function() {
    return {
      title: this.shareParams.adTitle || "快来".concat(d.default.brandName, "下单吧～"),
      imageUrl: this.shareParams.adImg
    }
  },
  onShareTimeline: function() {
    return {
      title: "快来".concat(d.default.brandName, "下单吧～")
    }
  },
  onContact: function() {
    wx.makePhoneCall({
      phoneNumber: "4000815520",
      fail: function() {}
    })
  },
  getTakeNo: function() {
    var e = this;
    (0, c.getIndexTakeNo)().then((function(t) {
      (t.data.takeNo || e.data.takeNo.length) && e.setData({
        takeNo: [{
          adUrl: "/pages/order/index",
          content: t.data.takeNo
        }],
        showTakeNo: !!t.data.takeNo
      })
    }))
  },
  toOrderList: function() {
    getApp().navigate("/pages/order/index")
  },
  closeTakeNo: function() {
    this.setData({
      showTakeNo: !1
    })
  },
  isExecuted: 0,
  onPageScroll: (0, p.debounceDouble)((function() {
    this.setData({
      takeNoFold: this.isExecuted = !this.isExecuted
    })
  }), 1e3, !0),
  showLoginPopup: function() {
    getApp().globalData.userInfo.mobilePhone || (this.lockClose = 1, this.setData({
      showLogin: !0,
      showLoginCom: !0
    }))
  },
  closeLoginPopup: function() {
    var e = this;
    this.lockClose = 0, this.setData({
      showLogin: !1
    });
    var t = setTimeout((function() {
      clearTimeout(t), !e.lockClose && e.setData({
        showLoginCom: !1
      })
    }), 1e3)
  },
  showAppCollect: function() {
    var e = this;
    if (wx.canIUse("checkIsAddedToMyMiniProgram")) {
      var t = "__".concat(d.default.brandKey, "__/appCollect"),
        a = wx.getStorageSync(t) || "";
      if ("" != a && a > Date.now()) return;
      wx.checkIsAddedToMyMiniProgram({
        success: function(a) {
          var n = a.added;
          if (console.log(n), !n) {
            e.setData({
              showAppCollect: !0
            });
            var r = (new Date).setHours(24, 0, 0, 0);
            getApp().setStorage(t, r)
          }
        }
      })
    }
  },
  closeAppCollect: function() {
    this.setData({
      showAppCollect: !1
    })
  }
});
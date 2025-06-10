var t, e = require("../../@babel/runtime/helpers/objectSpread2"),
  a = require("../../@babel/runtime/helpers/defineProperty"),
  o = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../@babel/runtime/helpers/asyncToGenerator"),
  i = require("@/request/store.js"),
  s = require("@/request/jointOrder.js"),
  r = require("@/utils/index"),
  c = (t = require("@/enum/index")) && t.__esModule ? t : {
    default: t
  };
Page({
  data: {
    statusBarHeight: 44,
    userLocationPermission: !0,
    currentTab: 0,
    shops: [{
      isLoading: !1,
      noShopTxt: c.default.noNearShop,
      data: []
    }, {
      isLoading: !1,
      noShopTxt: c.default.noOftenShop,
      data: []
    }, {
      isLoading: !1,
      noShopTxt: c.default.noFavoriteShop,
      data: []
    }],
    mapData: {
      showMap: !0,
      longitude: "",
      latitude: "",
      markers: []
    },
    showOfflinePopup: !1,
    showClosedPopup: !1,
    selectedStore: {},
    isShowPrivacy: 0
  },
  chooseData: {},
  onLoad: function(t) {
    var e = t.isJointOrder,
      a = t.cartId,
      o = t.latitude,
      n = t.longitude;
    this.isJointOrder = e, this.cartId = a, o && (this.chooseData = {
      latitude: o,
      longitude: n,
      request: !0
    })
  },
  onShow: function() {
    this.getShopList(!0)
  },
  handleAgree: function() {
    var t = this;
    return n(o().mark((function e() {
      return o().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            getApp().globalData.isShowPrivacy = !1, wx.setStorageSync("privacyVersion", getApp().configData.privacyVersion), t.getShopList(!0);
          case 3:
          case "end":
            return e.stop()
        }
      }), e)
    })))()
  },
  advertiseTap: function(t) {
    var e = t.target.dataset.url;
    getApp().navigate(e)
  },
  getShopList: function() {
    var t = arguments,
      e = this;
    return n(o().mark((function a() {
      var n, i, s, r, c, u, p;
      return o().wrap((function(a) {
        for (;;) switch (a.prev = a.next) {
          case 0:
            if (n = t.length > 0 && void 0 !== t[0] && t[0], 0 !== getApp().globalData.isShowPrivacy) {
              a.next = 3;
              break
            }
            return a.abrupt("return");
          case 3:
            if (i = e.data.currentTab, s = e.data.shops[i].data, c = getApp().invisibleData, u = c.longitude, p = c.latitude, u) {
              a.next = 10;
              break
            }
            return a.next = 9, getApp().getUserLocation();
          case 9:
            r = a.sent;
          case 10:
            if (0 != i) {
              a.next = 21;
              break
            }
            if (e.chooseData.request ? (u = e.chooseData.longitude, p = e.chooseData.latitude, e.chooseData.request = !1) : u || (u = r.longitude, p = r.latitude), u || s.length) {
              a.next = 14;
              break
            }
            return a.abrupt("return", e.setData({
              "mapData.latitude": 0,
              "mapData.longitude": 0
            }));
          case 14:
            if (u || !n) {
              a.next = 16;
              break
            }
            return a.abrupt("return");
          case 16:
            if (!s.length || n) {
              a.next = 18;
              break
            }
            return a.abrupt("return", e.setJosnData(0, s));
          case 18:
            e.getNearShop(u, p), a.next = 31;
            break;
          case 21:
            if (1 != i) {
              a.next = 27;
              break
            }
            if (getApp().accessToken) {
              a.next = 24;
              break
            }
            return a.abrupt("return", e.setJosnData(1));
          case 24:
            e.getOftenShop(), a.next = 31;
            break;
          case 27:
            if (2 != i) {
              a.next = 31;
              break
            }
            if (getApp().accessToken) {
              a.next = 30;
              break
            }
            return a.abrupt("return", e.setJosnData(2));
          case 30:
            e.getFavoriteShop();
          case 31:
          case "end":
            return a.stop()
        }
      }), a)
    })))()
  },
  getNearShop: function(t, e) {
    var a = this;
    this.setData({
      "shops[0].isLoading": !0
    }), (0, i.searchNearStore)(t, e).then((function(t) {
      var e = (t.data || []).filter((function(t) {
        return 1 == t.payStatus && 1 == t.shopStatus
      }));
      a.setJosnData(0, e)
    })).catch((function() {
      a.setJosnData(0)
    }))
  },
  getOftenShop: function() {
    var t = this;
    this.setData({
      "shops[1].isLoading": !0
    }), (0, i.searchOftenStore)().then((function(e) {
      var a = (e.data || []).filter((function(t) {
        return 1 == t.payStatus && 1 == t.shopStatus
      }));
      t.setJosnData(1, a)
    })).catch((function() {
      t.setJosnData(1)
    }))
  },
  getFavoriteShop: function() {
    var t = this;
    this.setData({
      "shops[2].isLoading": !0
    }), (0, i.searchFavoriteStore)().then((function(e) {
      var a = (e.data || []).filter((function(t) {
        return 1 == t.payStatus && 1 == t.shopStatus
      }));
      t.setJosnData(2, a)
    })).catch((function() {
      t.setJosnData(2)
    }))
  },
  setJosnData: function(t) {
    var e, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
    this.setData((a(e = {}, "shops[".concat(t, "].isLoading"), !1), a(e, "shops[".concat(t, "].data"), o), a(e, "mapData.markers", o ? this.getMarkersByShop(o) : []), a(e, "mapData.latitude", o[0] && o[0].latitude || getApp().invisibleData.latitude || this.chooseData.latitude), a(e, "mapData.longitude", o[0] && o[0].longitude || getApp().invisibleData.longitude || this.chooseData.longitude), e))
  },
  getMarkersByShop: function() {
    for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], a = getApp().invisibleData, o = a.longitude || this.chooseData.longitude, n = a.latitude || this.chooseData.latitude, i = [], s = t.length - 1; s >= 0; s--) {
      var u = t[s],
        p = u.longitude,
        h = u.latitude,
        d = u.shopName,
        l = u.shopAddress,
        g = u.operationStatus;
      u.distance = (0, r.getDistance)(n, o, h, p), i.push(e(e({}, c.default.markerStyle), {}, {
        id: s,
        longitude: p,
        latitude: h,
        title: d,
        iconPath: "".concat(this.data.__static__, "/main/icon_shop_").concat(1 == g ? "marker" : 2 == g ? "closed" : "busy", ".png"),
        callout: e(e({
          content: l ? l.length > 24 ? "".concat(d, "\r\n").concat(l.substring(0, 24), "...") : "".concat(d, "\r\n").concat(l) : d
        }, c.default.markerTipStyle_weixin), {}, {
          display: 0 == s ? "ALWAYS" : "BYCLICK"
        })
      }))
    }
    return i
  },
  openSetting: function() {
    wx.openSetting()
  },
  tabChange: function(t) {
    var e = this;
    this.data.currentTab != t.detail.index && this.setData({
      currentTab: t.detail.index
    }, (function() {
      e.getShopList(!0)
    }))
  },
  packUpMap: function() {
    this.setData({
      "mapData.showMap": !this.data.mapData.showMap
    })
  },
  chooseLocation: function() {
    var t = this;
    wx.chooseLocation({
      success: function(e) {
        var a = e.name,
          o = e.latitude,
          n = e.longitude;
        a && (t.chooseData = {
          latitude: o,
          longitude: n,
          request: !0
        })
      }
    })
  },
  moveToLocation: function() {
    var t = getApp().invisibleData,
      e = t.longitude,
      a = t.latitude;
    this.mapCtx = wx.createMapContext("map"), this.mapCtx.moveToLocation({
      longitude: e,
      latitude: a
    }), this.getShopList(!0)
  },
  onMarkerTap: function(t) {
    var e = {};
    this.data.mapData.markers.forEach((function(a, o) {
      o == t.detail.markerId ? e["mapData.markers[".concat(o, "].callout.display")] = "ALWAYS" : e["mapData.markers[".concat(o, "].callout.display")] = "BYCLICK"
    })), this.setData(e)
  },
  clickFavorite: function(t) {
    var e = t.detail,
      o = e.shopId,
      n = e.tabIndex,
      i = this.data.shops[n].data.findIndex((function(t) {
        return t.shopId == o
      })),
      s = this.data.shops[n].data[i];
    this.data.selectedStore.shopId === o && (getApp().globalData.selectedStore = Object.assign(getApp().globalData.selectedStore, {
      hasCollectShop: !s.hasCollectShop
    })), 2 === n ? this.getShopList(!0) : this.setData(a({}, "shops[".concat(n, "].data[").concat(i, "].hasCollectShop"), !s.hasCollectShop))
  },
  shopTap: function(t) {
    var e = t.detail,
      a = e.shopId,
      o = e.tabIndex,
      n = this.data.shops[o].data.filter((function(t) {
        return t.shopId == a
      }))[0],
      i = n.operationStatus,
      r = n.isOversea;
    if (this.setData({
        selectedStore: n
      }), r) return this.jumpToHKApp();
    if (1 != i) return 2 == i ? this.setData({
      showOfflinePopup: !0
    }) : this.setData({
      showClosedPopup: !0
    });
    if (this.isJointOrder) this.cartId ? (getApp().showLoading(), (0, s.switchShop)({
      cartId: this.cartId,
      shopId: a
    }).then((function() {
      wx.hideLoading(), wx.navigateBack()
    })).catch((function(t) {
      var e = t.msg;
      getApp().showToast(e || "网络异常，请稍后重试")
    }))) : (getApp().showLoading(), (0, s.createJointOrder)({
      orderType: 1,
      shopId: a
    }).then((function(t) {
      var e = t.data.cartId;
      wx.hideLoading(), e && wx.redirectTo({
        url: "/pages/activity/joint-order/index?cartId=".concat(e)
      })
    })).catch((function(t) {
      var e = t.msg;
      getApp().showToast(e || "网络异常，请稍后重试")
    })));
    else {
      getApp().menuOptions = {
        shopId: a,
        orderType: 1
      };
      var c = getCurrentPages(),
        u = c[c.length - 2];
      !u || "pages/menu/index" !== u.route && "pages/order_detail/cart/index" !== u.route ? wx.switchTab({
        url: "/pages/menu/index"
      }) : ("pages/order_detail/cart/index" === u.route && this.getOpenerEventChannel().emit("dataChangeStore", {
        shopId: a
      }), wx.navigateBack())
    }
  },
  closePopup: function() {
    this.setData({
      showOfflinePopup: !1,
      showClosedPopup: !1
    })
  },
  jumpToHKApp: function() {
    wx.navigateToMiniProgram({
      appId: "wx0304780e5844c076",
      path: "pages/store/index",
      extraData: {},
      envVersion: "trial",
      success: function(t) {
        console.log("打开成功", t)
      }
    })
  }
});
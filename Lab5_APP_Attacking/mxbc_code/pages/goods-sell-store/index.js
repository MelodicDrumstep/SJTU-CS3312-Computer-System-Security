var e = require("../../@babel/runtime/helpers/defineProperty"),
  t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("@/request/store");
Page({
  data: {
    storeList: [],
    goods: {},
    userLocationPermission: getApp().globalData.userLocationPermission,
    showPhoneConfirm: !1,
    openAnimation: {
      duration: 300,
      timingFunction: "ease-in-out"
    },
    selectedStore: {}
  },
  _goods: {},
  onLoad: function() {
    var e = this;
    this.getOpenerEventChannel().on("dataFromMenu", (function(t) {
      t.productImages = t.productImages.map((function(e) {
        return {
          adImg: e
        }
      })), e.setData({
        goods: t
      }), e._goods = t, e.getStoreList()
    }))
  },
  onShow: function() {
    var e = this;
    return o(t().mark((function o() {
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            e.getStoreList();
          case 1:
          case "end":
            return t.stop()
        }
      }), o)
    })))()
  },
  getStoreList: function() {
    var e = this;
    return o(t().mark((function o() {
      var n, a, i, s, u, d, c;
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            if (e._goods.productId) {
              t.next = 2;
              break
            }
            return t.abrupt("return");
          case 2:
            if (n = getApp().invisibleData, a = n.longitude, i = n.latitude, a && i) {
              t.next = 6;
              break
            }
            return t.next = 6, getApp().getUserLocation();
          case 6:
            s = e._goods, u = s.productId, d = s.orderType, c = s.shopId, getApp().showLoading(), (0, r.findStoreBySaleoutGoods)({
              productId: u,
              longitude: a,
              latitude: i,
              shopId: c,
              orderType: d
            }).then((function(t) {
              var o = t.data;
              e.setData({
                storeList: o
              }), wx.hideLoading()
            })).catch((function() {
              wx.hideLoading()
            }));
          case 9:
          case "end":
            return t.stop()
        }
      }), o)
    })))()
  },
  clickFavorite: function(t) {
    var o = t.detail.shopId,
      r = this.data.storeList.findIndex((function(e) {
        return e.shopId == o
      })),
      n = this.data.storeList[r];
    this.setData(e({}, "storeList[".concat(r, "].hasCollectShop"), !n.hasCollectShop))
  },
  shopTap: function(e) {
    var t = e.detail.shopId,
      o = this.data.storeList.filter((function(e) {
        return e.shopId == t
      }))[0];
    this.setData({
      selectedStore: o
    });
    var r = this.data.goods,
      n = r.orderType,
      a = r.productName;
    getApp().menuOptions = {
      shopId: t,
      orderType: n,
      productName: a
    };
    var i = getCurrentPages(),
      s = i[i.length - 2];
    s && "pages/menu/index" === s.route ? wx.navigateBack() : wx.switchTab({
      url: "/pages/menu/index"
    })
  },
  closePopup: function() {
    this.setData({
      showPhoneConfirm: !1
    })
  },
  close: function() {
    wx.navigateBack()
  }
});
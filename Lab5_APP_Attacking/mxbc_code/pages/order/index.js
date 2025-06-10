require("../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../@babel/runtime/helpers/toConsumableArray"),
  t = require("../../@babel/runtime/helpers/defineProperty"),
  r = require("@/request/order.js"),
  o = require("@/request/activity"),
  a = require("@/request/menu.js");
Page({
  data: {
    activeTab: 0,
    orderList: [{
      currPage: 1,
      totalCount: 0,
      list: []
    }, {
      currPage: 1,
      totalCount: 0,
      list: []
    }, {
      currPage: 1,
      totalCount: 0,
      list: []
    }],
    freshTrigger: !0,
    scrollTop: 0,
    productLimit: 4
  },
  onShow: function() {
    getApp().accessToken ? this.refreshList() : this.setData({
      orderList: [{
        currPage: 1,
        totalCount: 0,
        list: []
      }, {
        currPage: 1,
        totalCount: 0,
        list: []
      }, {
        currPage: 1,
        totalCount: 0,
        list: []
      }]
    }), this.setData({
      scrollTop: 0
    })
  },
  refreshList: function() {
    var e = this;
    if (!this._freshing) {
      this._freshing = !0;
      var o = this.data.activeTab;
      if (this.setData({
          freshTrigger: !0
        }), getApp().accessToken)(0, r.getOrderList)({
        page: 1,
        type: o + 1
      }).then((function(r) {
        var a = r.data;
        e._freshing = !1, e.dealMzhd(a && a.list).then((function() {
          e.setData(t({
            freshTrigger: !1
          }, "orderList[".concat(o, "]"), a || {
            list: []
          }))
        }))
      })).catch((function() {
        e._freshing = !1, e.setData({
          freshTrigger: !1
        })
      }));
      else var a = setTimeout((function() {
        e._freshing = !1, e.setData({
          freshTrigger: !1
        }), clearTimeout(a)
      }), 1e3)
    }
  },
  loadMore: function() {
    var e = this,
      o = this.data,
      a = o.activeTab,
      n = o.orderList[a],
      i = n.list,
      s = n.currPage,
      d = n.totalPage;
    this._loadMore || s == d || (this._loadMore = !0, (0, r.getOrderList)({
      page: s + 1,
      type: a + 1
    }).then((function(r) {
      var o = r.data,
        n = void 0 === o ? {
          list: []
        } : o;
      e._loadMore = !1, e.dealMzhd(n && n.list, i).then((function() {
        n.list = i.concat(n.list), e.setData(t({}, "orderList[".concat(a, "]"), n))
      }))
    })).catch((function() {
      e._loadMore = !1
    })))
  },
  onChange: function(e) {
    var t = this,
      r = e.detail.index;
    this.setData({
      activeTab: r,
      scrollTop: 0
    }, (function() {
      var e = setTimeout((function() {
        t.refreshList(), clearTimeout(e)
      }), 300)
    }))
  },
  dealMzhd: function(t, r) {
    if (t && t.length) {
      var a = e(new Set(t.map((function(e) {
        return e.shopId
      }))));
      if (r) {
        var n = r.map((function(e) {
          return e.shopId
        }));
        a = a.filter((function(e) {
          return !n.includes(e)
        }))
      }
      return a && a.length ? (0, o.getMzhdInfo)(a).then((function(e) {
        var r = e.data;
        if (r && r.length)
          for (var o = function() {
              var e = r[a];
              t.find((function(t) {
                return t.shopId == e.shopId
              })).mzhdData = e
            }, a = 0; a < r.length; a++) o()
      })).catch((function(e) {
        return console.log(e)
      })) : Promise.resolve()
    }
    return Promise.resolve()
  },
  tapOrder: function(e) {
    var t = e.currentTarget.dataset.ordercode || 0,
      r = e.currentTarget.dataset.orderstatus || 0;
    10 == r ? wx.navigateTo({
      url: "/pages/order_detail/pay/index?orderCode=" + t
    }) : 20 == r || 30 == r || 40 == r ? wx.navigateTo({
      url: "/pages/order_detail/take/index?orderCode=" + t
    }) : 70 != r && 80 != r || wx.navigateTo({
      url: "/pages/order_detail/finish/index?orderCode=" + t
    })
  },
  goPay: function(e) {
    var t = e.currentTarget.dataset.ordercode;
    wx.navigateTo({
      url: "/pages/order_detail/pay/index?orderCode=" + t
    })
  },
  goDrink: function() {
    getApp().trackEvent("orderlist_shop"), wx.switchTab({
      url: "/pages/menu/index"
    })
  },
  toRefund: function(e) {
    var t = e.currentTarget.dataset.ordercode;
    wx.navigateTo({
      url: "/pages/order_detail/refund/index?orderCode=".concat(t)
    })
  },
  toMenuPage: function(e) {
    var t = e.currentTarget.dataset.shopid;
    getApp().menuOptions = {
      shopId: t
    }, wx.switchTab({
      url: "/pages/menu/index"
    })
  },
  OneMoreTap: function(e) {
    var t = e.currentTarget.dataset.orderCode;
    getApp().trackEvent("orderlist_another"), (0, a.queryOrderGoodsToCart)({
      orderCode: t
    }).then((function(e) {
      var t = e.data;
      getApp().setStorageSync("invalidProductList", JSON.stringify(t.invalidProductList)), getApp().menuOptions = {
        shopId: t.shopId,
        orderType: t.orderType,
        source: "onemore",
        consigneeAddressId: t.consigneeAddressId
      }, wx.switchTab({
        url: "/pages/menu/index"
      })
    })).catch((function(e) {
      getApp().showToast(e.msg)
    }))
  },
  sendBlessToSnowKing: function(e) {
    var r = this,
      a = e.currentTarget.dataset,
      n = a.orderCode,
      i = a.shopCode,
      s = a.index;
    (0, o.sendBirthdayWish)({
      shopCode: i,
      orderCode: n
    }).then((function() {})).finally((function() {
      r.selectComponent("#mxDialog").openDialog(), r.setData(t({}, "orderList[".concat(s[0], "].list[").concat(s[1], "].blessIsShow"), !1))
    }))
  },
  onCloseTip: function() {
    this.selectComponent("#mxDialog").closeDialog()
  }
});
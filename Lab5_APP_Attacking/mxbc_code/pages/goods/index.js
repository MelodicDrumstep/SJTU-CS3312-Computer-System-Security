require("../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("@/request/menu"),
  t = require("@/mixins/index");
Page({
  data: {
    goods: {},
    useBuyNow: !1
  },
  onLoad: function() {
    var e = this;
    this.getOpenerEventChannel().on("menuToGoods", (function(o) {
      var r = o.goods,
        t = o.orderType,
        n = o.shopId,
        a = o.useBuyNow;
      r.shopId = n, r.orderType = t, r = JSON.parse(JSON.stringify(r)), e.setData({
        goods: r,
        useBuyNow: a
      }), e.getGoodsDetail({
        goods: r,
        orderType: t,
        shopId: n
      })
    })), getApp().menuOptions.skipRefresh = 1
  },
  getGoodsDetail: function(e) {
    var o = this,
      t = e.goods,
      n = e.orderType,
      a = e.shopId;
    (0, r.getGoodsDetail)({
      productId: t.productId,
      orderType: n,
      shopId: a
    }).then((function(e) {
      o.setData({
        goods: Object.assign(t, e.data)
      })
    }))
  },
  dialogUpdateGoods: function(r) {
    var n = this;
    return o(e().mark((function o() {
      var a, s;
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return a = getApp().isGuide, s = r.detail.goods, e.next = 4, (0, t.checkGroupAndWelfare)(s);
          case 4:
            if (e.sent) {
              e.next = 8;
              break
            }
            return n.selectComponent("#joinGroupGuide").openWelfareDialog(s.groupLink), e.abrupt("return");
          case 8:
            n.getOpenerEventChannel().emit("goodsToMenu", r.detail), (getApp().globalData.userInfo.mobilePhone || a) && n.goBack();
          case 10:
          case "end":
            return e.stop()
        }
      }), o)
    })))()
  },
  goBack: function() {
    wx.navigateBack()
  },
  onShareAppMessage: function() {
    getApp().trackEvent("product_share");
    var e = this.data.goods,
      o = e.productId,
      r = e.productName,
      t = e.productLogoOriginal;
    return {
      title: r,
      imageUrl: t.includes(".gif") ? void 0 : t,
      path: "/pages/menu/index?productId=".concat(o)
    }
  }
});
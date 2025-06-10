var e = require("@/request/activity"),
  t = require("@/env");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    shopId: {
      type: String,
      value: ""
    },
    orderType: {
      type: String,
      value: "1"
    },
    productId: {
      type: String,
      value: ""
    },
    exchangeMarketingId: {
      type: String,
      value: ""
    }
  },
  data: {
    pointText: ["立即兑换", "已售罄", "已达兑换上限", "雪王币不足", "库存不足"],
    showRule: !1,
    showExchange: !1,
    pointExchangeDetail: {}
  },
  lifetimes: {
    attached: function() {
      this.getExchangeActDetail()
    }
  },
  pageLifetimes: {
    show: function() {
      console.log("onshow"), getApp().captchaVerifyParam ? this.exchangeCouponByPoints() : this.getExchangeActDetail()
    }
  },
  methods: {
    getExchangeActDetail: function(t) {
      var a = this,
        n = t || {},
        i = n.estimatedPrice,
        o = (n.couponCode, this.data),
        c = o.productId,
        p = o.orderType,
        h = o.shopId,
        s = o.exchangeMarketingId;
      (0, e.getExchangeActDetail)({
        productId: c,
        orderType: p,
        shopId: h,
        productExchangeMarketingId: s
      }).then((function(e) {
        var t = e.data,
          n = t.pointExchangeDetail,
          o = t.productExchangeDetail;
        a.setData({
          pointExchangeDetail: n
        }), a.triggerEvent("exchange", {
          productExchangeDetail: o,
          estimatedPrice: i
        })
      })).catch((function(e) {
        a.triggerEvent("exchange", {
          estimatedPrice: i
        })
      }))
    },
    onConfirmExchange: function() {
      this.selectComponent("#comfirmExchange").openDialog()
    },
    onExchange: function(e) {
      getApp().captchaVerifyParam ? this.exchangeCouponByPoints() : getApp().navigate("".concat(t.baseUrl_Web, "/#/captcha?id=8xxl6vw1"))
    },
    exchangeCouponByPoints: function() {
      var t = this,
        a = this.data,
        n = {
          marketingId: a.pointExchangeDetail.marketingId,
          shopId: a.shopId,
          orderType: a.orderType,
          productId: a.productId,
          captchaVerifyParam: getApp().captchaVerifyParam
        };
      getApp().showLoading(), (0, e.exchangeCouponByPoints)(n).then((function(e) {
        wx.hideLoading(), t.getExchangeActDetail(e.data), getApp().captchaVerifyParam = null, getApp().menuOptions.skipRefresh = 0, getApp().menuOptions.estimatedPriceFresh = 1, t.setData({
          showExchange: !0
        })
      })).catch((function(e) {
        getApp().captchaVerifyParam = null, getApp().showToast(e.msg || "兑换失败"), t.getExchangeActDetail()
      }))
    },
    onToggleRule: function() {
      this.setData({
        showRule: !this.data.showRule
      })
    },
    closeTap: function() {
      this.setData({
        showExchange: !1
      })
    }
  }
});
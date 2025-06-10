require("../../@babel/runtime/helpers/Arrayincludes"), Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    showError: {
      type: Boolean,
      value: !1
    },
    showOffline: {
      type: Boolean,
      value: !1
    },
    showClosed: {
      type: Boolean,
      value: !1
    },
    showGoHomeAndSwitch: {
      type: Boolean,
      value: !1
    },
    selectedStore: {
      type: Object,
      value: {}
    },
    orderType: {
      type: Number,
      value: 1
    }
  },
  methods: {
    toStore: function() {
      1 === this.data.orderType ? wx.navigateTo({
        url: "/pages/store/index"
      }) : wx.navigateTo({
        url: "/pages/coupon/store/index"
      })
    },
    toOtherShop: function() {
      this.triggerEvent("close");
      for (var e = getCurrentPages(), t = !1, o = 0, r = ["pages/coupon/store/index", "pages/store/index"], a = e.length - 1, s = a; s >= 0; s--) {
        var n = e[s].route;
        if (r.includes(n)) {
          t = !0;
          break
        }
        o++
      }
      e && "pages/order_detail/cart/index" == e[a].route || (t && o > 0 ? wx.navigateBack({
        delta: o
      }) : t || this.toStore())
    },
    goHome: function() {
      wx.reLaunch({
        url: "/pages/index/index"
      })
    },
    switchOrderType: function(e) {
      this.triggerEvent("toggleType", e)
    }
  }
});
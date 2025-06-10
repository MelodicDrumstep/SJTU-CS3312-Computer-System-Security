var t = require("@/request/coupon");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    orderId: {
      type: String,
      value: ""
    },
    orderDetailList: {
      type: Array,
      value: []
    }
  },
  data: {
    show: !1,
    couponList: []
  },
  methods: {
    init: function() {
      var o = this,
        e = this.data.orderDetailList.map((function(t) {
          return t.productVoucherList || []
        })).flat().filter((function(t) {
          return 6 === t.channelSource
        }));
      e.length > 0 ? this.setData({
        couponList: e,
        show: !0
      }) : (0, t.getOrderCoupon)(this.data.orderId).then((function(t) {
        var e = t.data,
          s = t.msg;
        e && e.length ? o.setData({
          couponList: e,
          show: !0
        }) : getApp().showToast(s || "网络异常，请稍后重试")
      })).catch((function(t) {
        getApp().showToast(t && t.msg || "网络异常，请稍后重试")
      }))
    },
    closePopup: function() {
      this.setData({
        show: !1
      })
    }
  }
});
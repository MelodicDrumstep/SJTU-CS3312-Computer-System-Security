var t = require("@/env");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  properties: {
    payGiftData: {
      type: Object,
      value: {}
    },
    customClass: {
      type: String,
      value: ""
    }
  },
  data: {
    isShowPopup: !1
  },
  methods: {
    showAd: function() {
      this.setData({
        isShowPopup: !0
      })
    },
    closeAd: function() {
      this.setData({
        isShowPopup: !1
      })
    },
    advertiseTap: function(t) {
      var a = t.currentTarget.dataset.url;
      getApp().navigate(a), this.closeAd()
    },
    toReward: function() {
      var a = this.data.payGiftData,
        e = a.orderCode,
        o = a.marketingId;
      getApp().navigate("".concat(t.baseUrl_Web, "/#/marketing/award-form?disShare=1&needToken=2&orderCode=").concat(e, "&marketingId=").concat(o))
    }
  }
});
var t = require("@/request/store.js");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  properties: {
    shopId: String
  },
  data: {
    qrcodeUrl: "",
    bgImgUrl: ""
  },
  lifetimes: {
    attached: function() {
      var e = this;
      (0, t.getShopIccCode)(this.data.shopId).then((function(t) {
        var r = t.data,
          o = r.qrcodeUrl,
          s = r.bgImgUrl;
        e.setData({
          qrcodeUrl: o,
          bgImgUrl: s
        })
      }))
    }
  },
  methods: {
    onLongPress: function() {
      getApp().trackEvent("Order_shop-code")
    }
  }
});
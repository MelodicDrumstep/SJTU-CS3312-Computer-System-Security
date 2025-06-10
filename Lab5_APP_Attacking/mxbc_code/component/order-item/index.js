var e = require("@/request/menu.js");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  mixins: [],
  data: {
    productLimit: 4
  },
  properties: {
    orderDetail: {
      type: Object,
      value: {}
    },
    fromPage: {
      type: String,
      value: "order"
    },
    shopId: {
      type: String,
      value: ""
    },
    orderType: {
      type: String,
      value: "1"
    },
    consigneeAddressId: {
      type: String,
      value: ""
    }
  },
  methods: {
    toMenuPage: function(e) {
      var t = e.currentTarget.dataset.shopid;
      getApp().menuOptions = {
        shopId: t
      }, getApp().navigate("/pages/menu/index?shopId=".concat(t))
    },
    onAddGoodsToCart: function() {
      var t = this;
      if ("order" !== this.data.fromPage) {
        getApp().showLoading();
        var r = this.data,
          o = r.orderDetail.orderCode,
          a = r.orderType,
          d = r.consigneeAddressId,
          s = getApp().globalData.selectedStore.shopId;
        (0, e.queryOrderGoodsToCart)({
          orderCode: o,
          shopId: s,
          orderType: a,
          consigneeAddressId: d
        }).then((function(e) {
          var r = e.data;
          getApp().setStorageSync("invalidProductList", JSON.stringify(r.invalidProductList)), t.triggerEvent("addCartFromOnemore"), wx.hideLoading()
        })).catch((function(e) {
          getApp().showToast(e.msg)
        }))
      }
    }
  }
});
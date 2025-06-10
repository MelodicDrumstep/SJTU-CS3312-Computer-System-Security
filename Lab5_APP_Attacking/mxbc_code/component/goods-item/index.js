Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    show: {
      type: Boolean,
      value: !0
    },
    model: {
      type: String,
      value: "list"
    },
    hideNumberButton: {
      type: Boolean,
      value: !1
    },
    fromPage: {
      type: String,
      value: ""
    }
  },
  data: {},
  methods: {
    showGoodsDetail: function(o) {
      var t = o.currentTarget.dataset.goodsId,
        e = this.data.goods,
        s = e.presellFlag,
        a = e.presellUrlmini;
      1 !== s ? this.triggerEvent("showGoodsDetail", {
        goodsId: t
      }) : getApp().navigate(a)
    },
    addGoods: function(o) {
      var t = o.currentTarget.dataset.goodsId;
      this.data.goods.exchangeMarketingId ? this.triggerEvent("showGoodsDetail", {
        goodsId: t
      }) : this.triggerEvent("addGoods", {
        goodsId: t
      })
    },
    removeGoods: function(o) {
      var t = o.currentTarget.dataset.goodsId;
      this.triggerEvent("removeGoods", {
        goodsId: t
      })
    },
    toPackDetail: function(o) {
      var t = o.currentTarget.dataset.goodsId;
      this.triggerEvent("toPackDetail", {
        goodsId: t
      })
    },
    toGoodsSellStore: function() {
      console.log("toGoodsSellStore", this.data.goods);
      var o = this.data.goods,
        t = o.productName,
        e = o.productImages,
        s = o.productId,
        a = o.splitSprice,
        d = o.currentShopId,
        r = o.currentOrderType;
      wx.navigateTo({
        url: "/pages/goods-sell-store/index",
        success: function(o) {
          o.eventChannel.emit("dataFromMenu", {
            splitSprice: a,
            productName: t,
            productImages: e,
            productId: s,
            shopId: d,
            orderType: r
          })
        }
      })
    }
  }
});
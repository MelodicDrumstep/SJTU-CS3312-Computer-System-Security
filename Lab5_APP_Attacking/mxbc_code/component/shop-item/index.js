var t = require("@/utils/index"),
  e = require("@/request/store.js");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    data: {
      type: Object,
      value: {}
    },
    tabIndex: {
      type: Number,
      value: 0
    },
    orderType: {
      type: Number,
      value: 1
    },
    selected: {
      type: Boolean,
      value: !1
    },
    operateType: {
      type: String,
      value: "default"
    },
    isShowDistance: {
      type: Boolean,
      value: !0
    }
  },
  data: {
    showPhoneConfirm: !1,
    contactPhone: []
  },
  methods: {
    shopTap: function() {
      this.triggerEvent("shopTap", {
        shopId: this.data.data.shopId,
        tabIndex: this.data.tabIndex
      })
    },
    clickNavigate: function() {
      var t = this.data.data,
        e = t.latitude,
        a = t.longitude,
        o = t.shopName,
        n = t.shopAddress;
      wx.openLocation({
        latitude: e,
        longitude: a,
        address: n,
        name: o,
        scale: 17
      })
    },
    clickContactShop: function() {
      var t = this.data.data,
        e = t.contactPhone,
        a = t.contactPhone2;
      e && (a ? this.setData({
        contactPhone: [e, a],
        showPhoneConfirm: !0
      }) : wx.makePhoneCall({
        phoneNumber: e,
        fail: function() {}
      }))
    },
    selectPhone: function(t) {
      var e = this,
        a = t.currentTarget.dataset.phoneNumber;
      wx.makePhoneCall({
        phoneNumber: a,
        success: function() {
          e.setData({
            showPhoneConfirm: !1
          })
        },
        fail: function() {}
      })
    },
    closeConfirmPopup: function() {
      this.setData({
        showPhoneConfirm: !1
      })
    },
    clickFavorite: (0, t.debounce)((function() {
      var t = this;
      if (!getApp().accessToken) return getApp().navigate("/pages/register/index");
      var a = this.data.data;
      (0, e.changeShopFavorite)({
        favorited: !a.hasCollectShop,
        shopId: a.shopId
      }).then((function(e) {
        e.data && (getApp().showToast("".concat(a.hasCollectShop ? "已取消收藏" : "收藏成功")), t.triggerEvent("clickFavorite", {
          shopId: t.data.data.shopId,
          tabIndex: t.data.tabIndex
        }))
      })).catch((function(t) {
        getApp().showToast(t && t.msg || "网络异常")
      }))
    }), 500)
  }
});
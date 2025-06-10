require("../../@babel/runtime/helpers/Arrayincludes");
var e = require("@/request/order.js");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    pageType: {
      type: String,
      value: "cart"
    },
    noBag: {
      type: Boolean,
      value: !0
    },
    orderCode: {
      type: String,
      value: ""
    },
    shopCode: {
      type: String,
      value: ""
    }
  },
  data: {
    showType: "",
    showRule: !1,
    selectedNeed: !1,
    isReceived: !0,
    pure_XhhEmblemVo: {},
    pure_XhhLink: {},
    forceChoiceBag: !1,
    noTip: !1
  },
  observers: {
    orderCode: function(e) {
      var t = getApp().configData.tencentFlowerSettingContentVo;
      this.data.noBag && t.getFlowerShowSwitch && this.getFlower()
    },
    shopCode: function(e) {
      var t = getApp().configData.tencentFlowerSettingContentVo || {},
        a = t.excludeShopCodes && t.excludeShopCodes.replace(/[\n\s+]/g, "").split(";");
      "cart" == this.data.pageType && t.doNeedBagShowSwitch && !a.includes(this.data.shopCode) ? this.setData({
        showType: "1",
        selectedNeed: !1
      }) : this.setData({
        showType: ""
      })
    }
  },
  pageLifetimes: {
    show: function() {
      var e = getApp().configData.tencentFlowerSettingContentVo || {};
      "detail" == this.data.pageType && this.data.noBag && e.getFlowerShowSwitch ? this.getFlower() : "order" == this.data.pageType && e.getMedalShowSwitch && this.getMedal()
    }
  },
  methods: {
    selectedBagTap: function() {
      var e = this;
      this.setData({
        selectedNeed: !this.data.selectedNeed
      }, (function() {
        e.triggerEvent("select", +e.data.selectedNeed)
      }))
    },
    forceChoiceBagTap: function() {
      var e = getApp().getStorageSync("noForbid") || 0,
        t = this.data,
        a = t.showType,
        o = t.selectedNeed;
      return "1" == a && !o && 0 == e && (this.setData({
        forceChoiceBag: !0
      }), !0)
    },
    onTap: function(e) {
      var t = this,
        a = e.currentTarget.dataset.select;
      this.setData({
        forceChoiceBag: !1
      }), wx.nextTick((function() {
        t.triggerEvent("forceselect", +a)
      }))
    },
    onTipSelect: function() {
      var e = this;
      this.setData({
        noTip: !this.data.noTip
      }, (function() {
        getApp().setStorage("noForbid", +e.data.noTip)
      }))
    },
    getFlower: function() {
      var t = this;
      (0, e.checkTencentFlower)(this.data.orderCode).then((function(e) {
        var a = e.data;
        if (a) {
          var o = a.xhhCode;
          t.setData({
            isReceived: !!o,
            showType: "2",
            pure_XhhLink: a
          })
        }
      }))
    },
    receiveFlowerTap: function() {
      var t = this,
        a = this.data.pure_XhhLink,
        o = a.xhhCode,
        i = a.miniAppId,
        n = a.check;
      o && i ? this.toMiniProgramTap({
        currentTarget: {
          dataset: {
            type: "2"
          }
        }
      }) : n ? (0, e.getTencentFlowerFetch)(this.data.orderCode).then((function(e) {
        var a = e.data;
        a && (t.setData({
          pure_XhhLink: a
        }), t.toMiniProgramTap({
          currentTarget: {
            dataset: {
              type: "2"
            }
          }
        }))
      })).catch((function(e) {
        var t = e.msg;
        getApp().showToast(t || "网络异常，请稍后重试")
      })) : getApp().showToast(this.data.pure_XhhLink.attach)
    },
    toggleCloseRule: function() {
      this.setData({
        showRule: !this.data.showRule
      })
    },
    getMedal: function() {
      var t = this;
      if (getApp().accessToken) {
        var a = getApp().configData.tencentFlowerSettingContentVo;
        (0, e.getMedalFetch)().then((function(e) {
          var o = e.data;
          if (o) {
            var i = o.qualified,
              n = o.registration;
            (a.medalActivitySwitch && i || n) && t.setData({
              showType: "3",
              pure_XhhEmblemVo: o
            })
          }
        }))
      }
    },
    toMiniProgramTap: function(e) {
      var t = "2" == e.currentTarget.dataset.type ? this.data.pure_XhhLink : this.data.pure_XhhEmblemVo,
        a = t.miniAppId,
        o = t.miniUrl;
      wx.navigateToMiniProgram({
        appId: a,
        path: o,
        complete: function() {}
      })
    }
  }
});
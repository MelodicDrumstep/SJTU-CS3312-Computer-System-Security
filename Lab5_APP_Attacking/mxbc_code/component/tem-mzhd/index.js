var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("@/request/activity"),
  r = require("@/mixins/index");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    type: {
      type: String,
      value: "index"
    },
    data: {
      type: Object,
      value: {}
    }
  },
  data: {
    showRule: !1,
    showReward: !1,
    rewardList: []
  },
  pageLifetimes: {
    hide: function() {
      this.onClose()
    }
  },
  methods: {
    receiveActivity: function() {
      var n = this;
      return t(e().mark((function t() {
        var s, i, o, c;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, (0, r.insertSubscribeMessage)({
                key: "集杯赠券-跨店",
                isOnceADay: !0
              });
            case 2:
              return s = n.data.data.marketingId, e.next = 5, (0, a.receiveMzhd)({
                marketingId: s
              });
            case 5:
              i = e.sent, o = i.code, c = i.msg, 0 === o ? (getApp().showToast("领取成功"), n.triggerEvent("receive")) : getApp().showToast(c || "领取失败，请重试");
            case 9:
            case "end":
              return e.stop()
          }
        }), t)
      })))()
    },
    remindMe: function() {
      getApp().showToast("操作成功")
    },
    toMenu: function() {
      var a = this;
      return t(e().mark((function t() {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, (0, r.insertSubscribeMessage)({
                key: "集杯赠券-跨店",
                isOnceADay: !0
              });
            case 2:
              if (2 != a.data.data.rankType) {
                e.next = 5;
                break
              }
              return a.advertiseTap(), e.abrupt("return");
            case 5:
              getApp().navigate("/pages/menu/index");
            case 6:
            case "end":
              return e.stop()
          }
        }), t)
      })))()
    },
    advertiseTap: function() {
      var e = this.data.data,
        t = e.ruleTextType,
        a = e.rulePageUrl,
        r = e.ruleDesc;
      1 === e.isActivityPage ? getApp().navigate(a) : 1 === t ? this.setData({
        showRule: !0
      }) : getApp().navigate(r)
    },
    onClose: function() {
      this.setData({
        showRule: !1,
        showReward: !1
      })
    },
    selectDiscount: function() {
      this.triggerEvent("selectDiscount")
    },
    selectMzhd: function() {
      this.triggerEvent("selectMzhd")
    },
    openRewardTap: function() {
      var n = this;
      return t(e().mark((function t() {
        var s, i;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, (0, r.insertSubscribeMessage)({
                key: "集杯赠券-单店阶梯",
                isOnceADay: !0
              });
            case 2:
              s = n.data.data.marketingId, i = getApp().globalData.selectedStore.shopId, (0, a.getMzhdRewardList)({
                shopId: i,
                marketingId: s
              }).then((function(e) {
                var t = e.data;
                n.setData({
                  rewardInfo: t,
                  showReward: !0
                })
              })).catch((function(e) {
                var t = e.msg;
                getApp().showToast(t)
              }));
            case 5:
            case "end":
              return e.stop()
          }
        }), t)
      })))()
    },
    onExchangeReward: function(a) {
      var n = this;
      return t(e().mark((function t() {
        var s, i;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (s = a.currentTarget.dataset, i = s.id, 1 == s.status) {
                e.next = 3;
                break
              }
              return e.abrupt("return");
            case 3:
              return n.id = i, e.next = 6, (0, r.insertSubscribeMessage)({
                key: "集杯赠券-单店阶梯",
                isOnceADay: !0
              });
            case 6:
              n.selectComponent("#exchangeDialog").openDialog();
            case 7:
            case "end":
              return e.stop()
          }
        }), t)
      })))()
    },
    onConfirm: function() {
      var e = this,
        t = getApp().globalData.selectedStore.shopId,
        r = this.data.data.marketingId;
      (0, a.exchangeMzhdReward)({
        shopId: t,
        marketingId: r,
        id: this.id
      }).then((function() {
        getApp().showToast("兑换成功"), e.openRewardTap(), e.triggerEvent("updateMzhdData")
      })).catch((function(e) {
        getApp().showToast(e.msg || "兑换失败，请稍后重试")
      }))
    },
    onExchangeRewardRecord: function() {
      var e = this.data.rewardInfo.exchangeRecordUrl;
      e && getApp().navigate(e)
    }
  }
});
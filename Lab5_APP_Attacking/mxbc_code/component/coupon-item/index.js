var e = require("@/utils/index");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    couponData: {
      type: Object,
      value: {}
    },
    disabled: {
      type: Boolean,
      value: !1
    },
    designType: {
      type: String,
      value: "default"
    }
  },
  data: {
    startTime: "",
    endTime: "",
    limitTime: "",
    couponTag: "",
    amountDesc: "",
    channelType: "",
    orderType: "",
    limitDate: "",
    priceOriginal: "",
    inThisDay: !1
  },
  observers: {
    couponData: function(i) {
      var a = i.createdTime,
        t = i.startTime,
        o = i.endTime,
        n = i.limitTime,
        l = void 0 === n ? "" : n,
        p = i.limitDate,
        r = void 0 === p ? "" : p,
        c = i.couponTag,
        s = void 0 === c ? "" : c,
        u = i.amountDesc,
        d = void 0 === u ? "" : u,
        T = i.channelType,
        m = void 0 === T ? "" : T,
        g = i.orderType,
        v = void 0 === g ? "" : g,
        D = i.priceOriginal,
        y = void 0 === D ? "" : D,
        h = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        f = a ? new Date(a.replace(/-/g, "/")).setHours(24, 0, 0, 0) : Date.now();
      this.setData({
        priceOriginal: +y || 0,
        startTime: (0, e.dealTime)(t),
        endTime: (0, e.dealTime)(o),
        limitTime: l && l.replace(/,/g, "、"),
        couponTag: s && s.slice(0, 7),
        amountDesc: d && d.slice(0, 6),
        channelType: m && m.replace("1", "APP").replace("2", "小程序").replace(",", "、"),
        orderType: v && v.replace("1", "自提").replace("2", "外送").replace(",", "、"),
        limitDate: r && r.split(",").map((function(e) {
          return h[+e - 1]
        })).join("、"),
        inThisDay: f > Date.now()
      })
    }
  },
  methods: {
    couponClick: function(e) {
      this.triggerEvent("couponTap", e)
    },
    toRule: function() {
      getApp().toRuleCoupon = this.data.couponData, wx.navigateTo({
        url: "/pages/coupon/rules/index"
      })
    }
  }
});
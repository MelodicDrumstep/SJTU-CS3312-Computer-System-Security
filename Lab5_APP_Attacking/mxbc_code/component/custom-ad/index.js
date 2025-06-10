var e = require("../../@babel/runtime/helpers/objectSpread2");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    adType: {
      type: String,
      value: "banner"
    },
    adData: {
      type: Array,
      value: []
    },
    adPosition: {
      type: String,
      value: "center"
    },
    adKey: {
      type: String,
      value: ""
    },
    adLimit: {
      type: Number,
      value: 1e3
    },
    adEvent: {
      type: String,
      value: ""
    },
    adInterval: {
      type: String,
      value: 4e3
    },
    adAniFold: {
      type: Boolean,
      value: !1
    },
    isVibrate: {
      type: Boolean,
      value: !1
    }
  },
  data: {
    current: 0,
    showPopupAd: !1
  },
  observers: {
    adData: function(e) {
      var t = this.data,
        a = t.adType,
        s = t.adKey;
      "popup" !== a && "suspensionAd" !== a && "suspensionAdBanner" !== a || !e.length || this.transPopTimes({
        adKey: s,
        adData: e
      }) && this.openAd();
      "banner" === this.data.adType && e.length && this.setData({
        current: 0
      })
    }
  },
  methods: {
    advertiseTap: function(t) {
      var a = t.currentTarget.dataset,
        s = a.url,
        p = a.event,
        n = a.title;
      if (p) {
        var r = p.split(",");
        if (r.length > 1) {
          var i = r.shift();
          getApp().trackEvent(i, e(e({
            adUrl: s
          }, r.reduce((function(e, t) {
            return Object.assign(e, JSON.parse(t))
          }), {})), {}, {
            adTitle: n
          }))
        } else getApp().trackEvent(p, {
          adUrl: s,
          adTitle: n
        })
      }
      s && getApp().navigate(s), this.triggerEvent("adTap"), "popup" !== this.data.adType && "suspensionAdBanner" !== this.data.adType || this.closeAd()
    },
    closeAd: function() {
      this.setData({
        showPopupAd: !1
      }), this.triggerEvent("adClose")
    },
    openAd: function() {
      this.setData({
        showPopupAd: !0
      }), this.data.isVibrate && wx.vibrateShort({
        type: "light"
      })
    },
    transPopTimes: function(e) {
      var t = e.adKey,
        a = e.adData,
        s = t,
        p = a[0],
        n = p.showNum,
        r = p.dateType;
      if (n && s) {
        var i = getApp().getStorageSync("__mxsa__/ad/popup") || {};
        if (i[s]) {
          var o = parseInt(i[s].split("&")[0].split("=")[1]),
            d = parseInt(i[s].split("&")[1].split("=")[1]);
          if (parseInt(i[s].split("&")[2].split("=")[1]) == r && 3 !== r && o >= n && d >= Date.now()) return !1
        }
        return this.setPopData(i, s, a[0].dateType), !0
      }
      return !1
    },
    setPopData: function(e, t, a) {
      var s;
      if (s = 2 === a ? (new Date).setHours(24, 0, 0, 0) : Date.now() + 864e7, e[t]) {
        var p = parseInt(e[t].split("&")[0].split("=")[1]),
          n = parseInt(e[t].split("&")[1].split("=")[1]);
        parseInt(e[t].split("&")[2].split("=")[1]) !== a || n <= Date.now() ? e[t] = "value=1&expires=".concat(s, "&dateType=").concat(a) : e[t] = "value=".concat(p + 1, "&expires=").concat(n, "&dateType=").concat(a)
      } else e[t] = "value=1&expires=".concat(s, "&dateType=").concat(a);
      getApp().setStorageSync("__mxsa__/ad/popup", e)
    },
    closeTakeNo: function() {
      this.triggerEvent("close")
    }
  }
});
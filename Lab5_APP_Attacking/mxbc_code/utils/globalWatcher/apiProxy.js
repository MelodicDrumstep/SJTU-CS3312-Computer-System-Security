Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var t = {
  showLoading: function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
      e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    wx.showLoading({
      title: t,
      mask: e
    })
  },
  showToast: function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
      e = arguments.length > 1 ? arguments[1] : void 0,
      o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1500,
      n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none",
      a = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
    wx.showToast({
      title: t,
      duration: o,
      mask: a,
      icon: n,
      complete: function() {
        if (e) var t = setTimeout((function() {
          e(), clearTimeout(t)
        }), o)
      }
    })
  },
  getStorageSync: function(t) {
    return wx.getStorageSync(t)
  },
  setStorageSync: function(t, e) {
    wx.setStorageSync(t, e)
  },
  removeStorageSync: function(t) {
    wx.removeStorageSync(t)
  },
  clearStorageSync: function() {
    wx.clearStorageSync()
  },
  getStorage: function(t) {
    return wx.getStorage({
      key: t
    })
  },
  setStorage: function(t, e) {
    wx.setStorage({
      key: t,
      data: e
    })
  },
  removeStorage: function(t) {
    wx.removeStorage({
      key: t
    })
  },
  trackEvent: function(t, e) {
    wx.uma && wx.uma.trackEvent && wx.uma.trackEvent(t, e)
  }
};
exports.default = t;
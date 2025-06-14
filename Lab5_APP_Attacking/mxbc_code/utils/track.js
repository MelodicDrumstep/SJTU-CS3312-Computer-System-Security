Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var t, e = require("@/request/user"),
  i = (t = require("@/enum/index")) && t.__esModule ? t : {
    default: t
  };
var n = {
  data: [],
  isReporting: !1,
  limit: 3,
  init: function() {
    this.data = JSON.parse(wx.getStorageSync("__".concat(i.default.brandKey, "__/track")) || "[]"), wx.onAppHide(this.onAppHide.bind(this)), wx.onAppShow(this.onAppShow.bind(this))
  },
  track: function(t) {
    this.data.push(t), getApp().setStorage("__".concat(i.default.brandKey, "__/track"), JSON.stringify(this.data)), this.data.length >= this.limit && this.report()
  },
  report: function() {
    var t = this;
    if (!this.isReporting && 0 != this.data.length && getApp().accessToken) {
      var n = [];
      this.data.map((function(t) {
        t.map((function(t) {
          var e = n.findIndex((function(e) {
            return e.tplId === t
          })); - 1 !== e ? n[e].times++ : n.push({
            tplId: t,
            times: 1
          })
        }))
      })), 0 !== n.length && (this.isReporting = !0, (0, e.reportTrack)({
        templates: n
      }).then((function(e) {
        e.data && (t.data = [], getApp().removeStorage("__".concat(i.default.brandKey, "__/track"))), t.isReporting = !1
      })).catch((function() {
        t.isReporting = !1
      })))
    }
  },
  onAppHide: function() {
    this.report()
  },
  onAppShow: function() {
    this.report(), wx.offAppShow(this.onAppShow)
  }
};
exports.default = n;
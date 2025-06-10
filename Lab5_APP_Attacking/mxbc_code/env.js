var t, e = (t = require("@/enum/index")) && t.__esModule ? t : {
  default: t
};
var a, c, n, s, i, r = !0;
(function() {
  var t = wx.getStorageSync("env");
  "uat" === t && (t = "qa");
  var m = wx.getAccountInfoSync().miniProgram.envVersion;
  "release" !== m && (r = !1), "release" !== m && t && "pro" !== t ? (a = "https://mxsa-".concat(t, ".mxbc.net"), n = "https://".concat(e.default.brandKey, "-").concat(t, ".mxbc.net"), c = "https://third-activity-".concat(t, ".mxbc.net/activity"), i = "https://activity-".concat(t, ".mxbc.net"), s = "https://mxsa-".concat(t, ".mxbc.net")) : (a = "https://".concat(e.default.brandKey, ".mxbc.net"), n = "https://".concat(e.default.brandKey, "-h5.mxbc.net"), c = "https://third-activity.mxbc.net/activity", i = "https://activity.mxbc.net", s = "https://mxsa.mxbc.net")
})(), module.exports = {
  __static__: r ? "https://mxsa-oss.mxbc.net/mini" : "https://mxsa-qa.mxbc.net/assets/mxbc",
  version: "2.5.5",
  isProMini: r,
  baseUrl: a,
  baseUrl_ThirdActivity: c,
  baseUrl_Web: n,
  baseUrl_report: s,
  baseUrl_Activity: i
};
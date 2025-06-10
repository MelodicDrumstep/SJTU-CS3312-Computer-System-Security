Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.assistFetch = function(t) {
  return e.default.post("".concat(s.baseUrl_Activity, "/ordact/api/v2/assist-act/assist"), t)
}, exports.inviteAssistFetch = function(t) {
  return e.default.post("".concat(s.baseUrl_Activity, "/ordact/api/v2/assist-act/info/get"), t)
}, exports.inviteAssistProgressFetch = function(t) {
  return e.default.post("".concat(s.baseUrl_Activity, "/ordact/api/v2/assist-act/record"), t)
};
var t, e = (t = require("./index")) && t.__esModule ? t : {
    default: t
  },
  s = require("@/env");
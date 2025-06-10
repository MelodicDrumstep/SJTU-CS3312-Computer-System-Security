Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getExpandInfo = function(e) {
  return t.default.get("".concat(s.baseUrl_Activity, "/skc/api/v1/secretwordDraw/assistExpandInfo"), r({}, e))
}, exports.secretwordDrawAssist = function(e) {
  return t.default.post("".concat(s.baseUrl_Activity, "/skc/api/v1/secretwordDraw/assist"), r({}, e))
};
var e, r = require("../@babel/runtime/helpers/objectSpread2"),
  t = (e = require("./index")) && e.__esModule ? e : {
    default: e
  },
  s = require("@/env");
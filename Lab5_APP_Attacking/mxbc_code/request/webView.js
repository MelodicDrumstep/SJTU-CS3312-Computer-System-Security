Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getDBLoginUrl = function(e) {
  return r.default.get("/v1/duiba/getLoginUrl", {
    dbredirect: e
  })
};
var e, r = (e = require("./index")) && e.__esModule ? e : {
  default: e
};
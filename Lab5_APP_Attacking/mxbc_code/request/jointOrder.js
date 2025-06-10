Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.clearMyCart = function(t) {
  return r.default.post("/v1/groupcart/product/clear", {
    cartId: t
  })
}, exports.confirmSelect = function(t) {
  return r.default.post("/v1/groupcart/product/confirm", t)
}, exports.createJointOrder = function(t) {
  return r.default.post("/v1/groupcart/create", t)
}, exports.getJointOrder = function(t) {
  return r.default.post("/v1/groupcart/allinfo", {
    cartId: t
  })
}, exports.getJointOrderConfig = function() {
  return r.default.get("/v1/groupcart/info")
}, exports.getMqToken = function(t) {
  return r.default.post("/v1/groupcart/getToken", {
    cartId: t
  })
}, exports.joinOther = function(t) {
  return r.default.post("/v1/groupcart/join", {
    cartId: t
  })
}, exports.leaveJointOrder = function(t, e) {
  return r.default.post("/v1/groupcart/".concat(1 == e ? "cancel" : "leave"), {
    cartId: t
  })
}, exports.queryExistJointOrder = function() {
  return r.default.post("/v1/groupcart/current")
}, exports.switchShop = function(t) {
  return r.default.post("/v1/groupcart/switch-shop", t)
}, exports.unlockJointOrder = function(t) {
  return r.default.post("/v1/groupcart/unlock", {
    cartId: t
  })
};
var t, r = (t = require("./index")) && t.__esModule ? t : {
  default: t
};
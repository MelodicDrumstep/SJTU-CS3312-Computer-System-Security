Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.cancelOrderById = function(r) {
  return e.default.post("/v2/order/cancel", {
    orderCode: r
  })
}, exports.checkTencentFlower = function(r) {
  return e.default.post("/v2/xhh/check/".concat(r))
}, exports.getIndexTakeNo = function() {
  return e.default.get("/v2/order/getTakeNo")
}, exports.getMedalFetch = function() {
  return e.default.post("/v2/xhh/externalGetRegistrationInfo")
}, exports.getOrderDetail = function(r) {
  return e.default.get("/v2/order/cust/info/".concat(r))
}, exports.getOrderList = function(r) {
  r.limit = 10, 1 == r.type && (r.type = 0);
  return e.default.post("/v2/order/cust/list", r)
}, exports.getOrderPoint = function(r) {
  return e.default.get("/v1/customer/getOrderPoint", {
    orderId: r
  })
}, exports.getOrderPointAndGrowth = function(r) {
  return e.default.post("/v1/customer/getOrderPointAndGrowth", r)
}, exports.getQueueOrder = function(r) {
  return e.default.post("/v2/order/queue/waitQueue", r)
}, exports.getReasonTypes = function() {
  return e.default.get("/v1/refundreasonconf/list")
}, exports.getTencentFlowerFetch = function(r) {
  return e.default.post("/v2/xhh/preTry/".concat(r))
}, exports.getUserCollect = function() {
  return e.default.get("/v1/customer/product/taste/list")
}, exports.getVirtualOrderList = function(r) {
  return e.default.post("/v2/order/virtual/list", r)
}, exports.orderRefresh = function(r) {
  return e.default.post("/v2/order/check/pay", {
    orderCode: r
  })
}, exports.preOrderToRealTimeOrder = function(r) {
  return e.default.post("/v2/order/rezAhead", {
    orderCode: r
  })
}, exports.prePay = function(t) {
  return getApp().getOpenId().then((function(o) {
    var n = o.OPENID;
    return e.default.post("/v2/order/prepay", {
      miniAppId: r.default.pro.miniAppId_weixin,
      orderCode: t,
      payType: 1,
      openId: n
    })
  }))
}, exports.refund = function(r) {
  return e.default.post("/v2/order/refund", r)
}, exports.refundVirtualOrder = function(r) {
  return e.default.post("/v2/order/virtual/refund", r)
}, exports.saveOrder = function(r) {
  return e.default.post(r.cartId ? "/v2/group/order/save" : "/v2/order/save", r)
}, exports.saveVirtualOrder = function(r) {
  return e.default.post("/v2/order/virtual/save", r)
};
var e = t(require("./index")),
  r = t(require("@/config/index"));

function t(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
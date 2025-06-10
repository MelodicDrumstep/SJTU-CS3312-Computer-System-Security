Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.fetchAcceptCoupons = function(o) {
  return t.default.post("/v1/customercoupons/acceptCoupon", o)
}, exports.fetchForwardCouponCancel = function(o) {
  return t.default.post("/v1/customercoupons/couponGiveCancel", {
    couponCode: o
  })
}, exports.getAvailableCoupon = function(o) {
  return t.default.post("/v1/customercoupons/availableCouponsNew", o)
}, exports.getCouponTotal = function() {
  return t.default.post("/v1/customercoupons/total", {
    couponStatus: 0
  })
}, exports.getForwardCoupons = function(o) {
  return t.default.post("/v1/customercoupons/acceptCouponList", o)
}, exports.getGroupBuyingDetail = function(o) {
  return t.default.post("/v1/mtCoupons/couponStatus", o)
}, exports.getGroupBuyingList = function(o) {
  return t.default.post("/v1/mtCoupons/userCoupons", o)
}, exports.getMyCoupon = function(o) {
  return t.default.post("/v1/customercoupons/coupons", o)
}, exports.getOrderCoupon = function(o) {
  return t.default.post("/v1/customercoupons/orderCouponDetail", {
    orderId: o
  })
}, exports.getPackDetail = function(o) {
  return t.default.post("/v1/customercoupons/couponPackInfo", {
    orderId: o
  })
}, exports.getShopCouponTotal = function(o) {
  return t.default.post("/v1/customercoupons/shopTotal", {
    shopId: o
  })
}, exports.giveCoupon = function(o) {
  return t.default.post("/v1/customercoupons/giveCoupon", o)
};
var o, t = (o = require("./index")) && o.__esModule ? o : {
  default: o
};
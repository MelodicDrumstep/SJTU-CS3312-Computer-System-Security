Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.batchReceiveCard = function(t) {
  return r.default.post("/v1/giftcard/give/batchreceive", t)
}, exports.cancelGive = function(t) {
  return r.default.post("/v1/giftcard/give/batchcancel", t)
}, exports.cardActive = function(t) {
  return r.default.post("/v1/giftcard/exchange/activate", {
    cardAuthCode: t
  })
}, exports.cardOrderDetail = function(t) {
  return r.default.get("/v1/giftcard/order/detail", t)
}, exports.checkAssets = function() {
  return r.default.get("/v1/giftcard/asset")
}, exports.checkPopup = function(t) {
  return r.default.post("/v1/giftcard/order/payGift", t)
}, exports.createCardOrder = function(t) {
  return r.default.post("/v1/giftcard/order/create", e(e({}, t), {}, {
    appType: 3,
    payType: 1
  }))
}, exports.getAvailableCards = function(t) {
  return r.default.post("/v1/giftcard/available/list", t)
}, exports.getCardByOrder = function(t) {
  return r.default.get("/v1/giftcard/order/cardlist", {
    orderId: t
  })
}, exports.getCardLimit = function() {
  return r.default.get("/v1/giftcard/purchase/limit")
}, exports.getCardTemplate = function(t) {
  return r.default.get("/v1/giftcard/purchase/template/info", t)
}, exports.getDetail = function(t) {
  return r.default.get("/v1/giftcard/order/detail", {
    orderId: t
  })
}, exports.getExchangeList = function(t) {
  return r.default.post("/v1/giftcard/exchange/list", e(e({}, t), {}, {
    limit: 10
  }))
}, exports.getGiftCardMenuList = function(t) {
  return r.default.get("/v1/giftcard/purchase/menu", t)
}, exports.getGiveDetail = function(t) {
  return r.default.post("/v1/giftcard/give/detail", t)
}, exports.getMyCardList = function(t) {
  return r.default.get("/v1/giftcard/my_card/list", t)
}, exports.getOrderList = function(t) {
  return r.default.post("/v1/giftcard/order/query", t)
}, exports.getRecordList = function(t) {
  return r.default.post("/v1/giftcard/give/getgiverecords", e(e({}, t), {}, {
    limit: 10
  }))
}, exports.getSendCards = function() {
  return r.default.get("/v1/giftcard/unActivate/list")
}, exports.giftCardDetail = function(t) {
  return r.default.get("/v1/giftcard/info", t)
}, exports.giftcardActivate = function(t) {
  return r.default.post("/v1/giftcard/activate", t)
}, exports.giveCard = function(t) {
  return r.default.post("/v1/giftcard/give/batchgive", t)
}, exports.queryCard = function() {
  return r.default.get("/v1/giftcard/summary")
}, exports.queryCardByCode = function(t) {
  return r.default.get("/v1/giftcard/exchange/getTemplateByCardAuthCode", {
    cardAuthCode: t
  })
}, exports.refundApply = function(t) {
  return r.default.post("/v1/giftcard/refund/apply", t)
};
var t, e = require("../@babel/runtime/helpers/objectSpread2"),
  r = (t = require("./index")) && t.__esModule ? t : {
    default: t
  };
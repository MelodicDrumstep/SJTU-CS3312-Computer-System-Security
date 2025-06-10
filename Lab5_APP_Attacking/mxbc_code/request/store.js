Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.changeShopFavorite = function(e) {
  return e.favorited ? t.default.post("/v3/shopinfo/favorite", {
    shopId: e.shopId
  }) : t.default.post("/v3/shopinfo/cancelFavorite", {
    shopId: e.shopId
  })
}, exports.findStoreBySaleoutGoods = function(e) {
  return t.default.post("/v4/shopinfo/findCanSellNearShopList", e)
}, exports.getDeliverableStore = function(e, o) {
  return t.default.post("/v3/shopinfo/findDeliverable", {
    longitude: e,
    latitude: o,
    distance: 20,
    page: 1,
    limit: 20
  }).then((function(e) {
    return e && e.data ? (e.data.inRange.forEach((function(e) {
      e.shopAddress = (e.regionName || "") + e.shopAddress
    })), e.data.outRange.forEach((function(e) {
      e.shopAddress = (e.regionName || "") + e.shopAddress
    })), e) : e
  }))
}, exports.getDeliverableStoreV4 = function(e, o) {
  return t.default.post("/v4/shopinfo/findDeliverable", {
    longitude: e,
    latitude: o,
    distance: 20,
    page: 1,
    limit: 20
  }).then((function(e) {
    return e && e.data ? (e.data.inRange.forEach((function(e) {
      e.shopAddress = (e.regionName || "") + e.shopAddress
    })), e.data.outRange.forEach((function(e) {
      e.shopAddress = (e.regionName || "") + e.shopAddress
    })), e.data.isRecommend && (e.data.recommendedShop.shopAddress = (e.data.recommendedShop.regionName || "") + e.data.recommendedShop.shopAddress), e) : e
  }))
}, exports.getDeliverableStoreWithCoupon = function(e, o, n, d, a) {
  return t.default.post("/v3/shopinfo/findDeliverableWithCoupon", {
    longitude: e,
    latitude: o,
    distance: 20,
    couponRuleId: n,
    isDynamicShop: d,
    shopIds: a
  }).then((function(e) {
    return e && e.data ? (e.data.inRange.forEach((function(e) {
      e.shopAddress = (e.regionName || "") + e.shopAddress
    })), e.data.outRange.forEach((function(e) {
      e.shopAddress = (e.regionName || "") + e.shopAddress
    })), e) : e
  }))
}, exports.getNearStoreWithCoupon = function(e, o, n) {
  return t.default.post("/v2/shopinfo/findNearWithCoupon", {
    longitude: e,
    latitude: o,
    couponRuleId: n,
    distance: 10
  }).then((function(e) {
    return e && e.data && e.data.length ? (e.data.forEach((function(e) {
      e.shopAddress = (e.regionName || "") + e.shopAddress
    })), e) : e
  }))
}, exports.getRecommendShop = function(e) {
  return t.default.post("/v3/shopinfo/findRecommend", e)
}, exports.getRecommendShopV4 = function(e) {
  return t.default.post("/v4/shopinfo/findRecommend", e).then((function(e) {
    return e && e.data && e.data.length ? (e.data.forEach((function(e) {
      e.shopAddress = (e.regionName || "") + e.shopAddress
    })), e) : e
  }))
}, exports.getShopIccCode = function(e) {
  return t.default.get("/v2/shopinfo/icc/get/".concat(e))
}, exports.getShopInfo = function(e) {
  return t.default.get("/v2/shopinfo/get/".concat(e)).then((function(e) {
    return e && e.data ? (e.data.shopAddress = (e.data.regionName || "") + e.data.shopAddress, e) : e
  }))
}, exports.searchFavoriteStore = function() {
  return t.default.post("/v3/shopinfo/findFavorite").then((function(e) {
    return e && e.data && e.data.length ? (e.data.forEach((function(e) {
      e.shopAddress = (e.regionName || "") + e.shopAddress
    })), e) : e
  }))
}, exports.searchNearStore = function(e, o) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
    d = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 20,
    a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 10;
  return t.default.post("/v2/shopinfo/findNear", {
    longitude: e,
    latitude: o,
    page: n,
    limit: d,
    distance: a
  }).then((function(e) {
    return e && e.data && e.data.length ? (e.data.forEach((function(e) {
      e.shopAddress = (e.regionName || "") + e.shopAddress
    })), e) : e
  }))
}, exports.searchOftenStore = function() {
  return t.default.post("/v2/shopinfo/findOften").then((function(e) {
    return e && e.data && e.data.length ? (e.data.forEach((function(e) {
      e.shopAddress = (e.regionName || "") + e.shopAddress
    })), e) : e
  }))
};
var e, t = (e = require("./index")) && e.__esModule ? e : {
  default: e
};
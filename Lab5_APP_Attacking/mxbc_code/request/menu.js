Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.cancelFavoriteTaste = function(t) {
  return r.default.post("/v1/customer/product/taste/cancel", t)
}, exports.clearCart = function(t, e) {
  return r.default.post("/v3/shoppingCart/clearCart", {
    shopId: t,
    orderType: e,
    customerId: 1
  })
}, exports.collectFavoriteTaste = function(t) {
  return r.default.post("/v1/customer/product/taste/favorite", t)
}, exports.getGoodsDetail = function(t) {
  return r.default.post("/v2/shop/product/detail", t)
}, exports.getMarketingInfo = function(t, e) {
  return r.default.post("/v2/shop/listMarketing", {
    shopId: t,
    orderType: e
  })
}, exports.getMarketingMenuList = function(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
  return r.default.post("/v1/marketingMenu/query", {
    shopId: t,
    orderType: e
  })
}, exports.getMenuList = function(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
    o = arguments.length > 2 ? arguments[2] : void 0;
  return o ? r.default.post("/v2/shop/menu/groupcart/productlist", {
    shopId: t,
    orderType: e,
    cartId: o
  }) : r.default.post("/v2/shop/menu/info", {
    shopId: t,
    orderType: e
  })
}, exports.getSomeProductDetail = function(t, e) {
  for (var o = [], u = 0; u < e.length; u += 10) o.push(r.default.post("/v2/shop/product/multiquery", {
    shopId: t,
    productIdList: e.slice(u, u + 10)
  }));
  return Promise.all(o).then((function(t) {
    return t.reduce((function(t, e) {
      return t.concat(e.data)
    }), [])
  }))
}, exports.queryCalcPrice = function(t) {
  return r.default.post(t.cartId ? "/v1/groupcart/calcprice" : "/v3/shoppingCart/calcprice", e(e({}, t), {}, {
    customerId: 1
  }))
}, exports.queryCart = function(t) {
  return r.default.post("/v3/shoppingCart/listCartProducts", e(e({}, t), {}, {
    customerId: 1
  }))
}, exports.queryCartForSettle = function(t) {
  return r.default.post(t.cartId ? "/v1/groupcart/settlement/update" : "/v3/shoppingCart/settlement/update", e(e({}, t), {}, {
    customerId: 1
  }))
}, exports.queryOrderGoodsToCart = function(t) {
  return r.default.post("/v3/shoppingCart/order/onemore", t)
}, exports.switchShopInCart = function(t) {
  return r.default.post("/v3/shoppingCart/switch-shop", t)
}, exports.updateCart = function(t) {
  return r.default.post("/v3/shoppingCart/updateProductQty", e(e({}, t), {}, {
    customerId: 1
  }))
};
var t, e = require("../@babel/runtime/helpers/objectSpread2"),
  r = (t = require("./index")) && t.__esModule ? t : {
    default: t
  };
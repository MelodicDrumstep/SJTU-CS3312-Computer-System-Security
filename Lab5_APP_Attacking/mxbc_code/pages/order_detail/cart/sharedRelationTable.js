Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.updateParamsController = function(e, p, s) {
  var r;
  if (!p.data || !p.data.cartData) throw new Error("updateParamsControl函数cartData参数缺失！");
  var n = p.data,
    i = n.cartData,
    d = i.couponCode,
    a = i.products,
    l = void 0 === a ? [] : a,
    y = n.pointDeductMarketing,
    T = y.marketingId,
    g = y.pointUsed,
    C = y.isPointDed ? {
      marketingId: T,
      pointUsed: g
    } : null,
    D = (0, o.getPlusDiscountProductList)(p.frontCartData.products),
    P = (0, o.getSelectedProductVoucherList)(l),
    f = P.selectedProductVoucherList,
    h = P.isUnUsedVoucherCoupon,
    M = p.selectedGiftCardList,
    m = (t(r = {}, u.pointDeductType, {
      lastSelect: {
        type: u.pointDeductType
      },
      pointDeduct: C,
      useCouponMode: -1,
      useProductVoucherMode: -1
    }), t(r, u.useCouponType, {
      lastSelect: {
        type: u.useCouponType
      },
      couponCode: d,
      useCouponMode: d ? 1 : -1,
      useProductVoucherMode: h ? -1 : 1,
      selectedProductVoucherList: f
    }), t(r, u.collectingCup, {
      lastSelect: {
        type: u.collectingCup
      },
      useCouponMode: -1,
      useProductVoucherMode: -1
    }), t(r, u.plusDiscountProductType, {
      lastSelect: {
        type: u.plusDiscountProductType
      },
      plusDiscountProductList: D
    }), t(r, u.recommendDiscountType, {
      useCouponMode: 0,
      useProductVoucherMode: 0
    }), t(r, u.giftType, {
      selectedGiftCardList: M,
      lastSelect: null
    }), r),
    V = c[e].reduce((function(e, t) {
      return Object.assign(e, m[t])
    }), {});
  switch (console.log("同享参数：", c[e], V), e) {
    case u.pointDeductType:
      Object.assign(V, m[e], s), getApp().showToast("不与其他优惠同享");
      break;
    default:
      Object.assign(V, m[e], s)
  }
  return console.log("update参数：", V), V
};
var e, t = require("../../../@babel/runtime/helpers/defineProperty"),
  o = require("@/mixins/index"),
  u = require("./relationTypeMap"),
  c = (t(e = {}, u.pointDeductType, [u.giftType]), t(e, u.useCouponType, [u.plusDiscountProductType, u.giftType]), t(e, u.collectingCup, [u.giftType]), t(e, u.plusDiscountProductType, [u.giftType, u.useCouponType]), t(e, u.giftType, [u.pointDeductType, u.collectingCup, u.plusDiscountProductType, u.useCouponType]), t(e, u.recommendDiscountType, [u.giftType]), e);
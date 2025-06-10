require("../../../@babel/runtime/helpers/Arrayincludes");
var t, a = require("../../../@babel/runtime/helpers/defineProperty"),
  e = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../@babel/runtime/helpers/slicedToArray"),
  o = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  s = require("@/request/order"),
  i = require("@/request/menu"),
  d = require("@/request/activity"),
  c = require("@/request/coupon"),
  u = require("@/request/store"),
  p = require("@/request/address"),
  h = require("@/request/giftCard"),
  g = require("@/utils/index"),
  l = require("@/mixins/index"),
  f = (t = require("@/enum/index")) && t.__esModule ? t : {
    default: t
  },
  D = require("@/env"),
  m = require("./sharedRelationTable"),
  C = require("./relationTypeMap");
Page({
  data: {
    regGuidanceSettingVo: {},
    statusBarHeight: 0,
    navBarHeight: 0,
    isShowDetail: !1,
    showClosedPopup: !1,
    isShowTakeOutInfo: !1,
    isShowtableWarePopup: !1,
    remarkStr: "",
    tableware: 0,
    tableWareList: [{
      text: "按餐量提供"
    }, {
      text: "无需餐具",
      image: "".concat(D.__static__, "/order_detail/unTableWare.png")
    }],
    cartData: {},
    selectedStore: {},
    totalCouponsNum: 0,
    currentAddress: {},
    mzhdData: {
      discountsType: 1,
      hasDiscount: !1
    },
    addMoreMarketingData: {
      totalNum: 0,
      orderLimitTotal: 0,
      warningText: "",
      products: []
    },
    showPackGuide: !1,
    options: {},
    isShowAddMore: !1,
    isShowPopupAddMore: !1,
    showCoinRule: !1,
    orderPoint: 0,
    growth: 0,
    isShowGoodsError: !1,
    goodsErrorMsg: "存在部分商品信息发生变更，请重新选购。",
    pointDeductMarketing: {
      isPointDed: !1
    },
    showPointDeductRule: !1,
    coinName: f.default.coinName,
    luckyCutDiscount: null,
    isShowLuckyCut: !1,
    showJointDiscountRule: !1,
    currentIndexPlus: 0,
    userInfo: {},
    packBagInfo: {
      enabled: 1
    },
    payGiftData: {},
    exchangeMarketingCouponName: "",
    cartTipText: "",
    giftCardDeduct: {
      useOpen: !1,
      supportGiftCard: 0,
      giftCardDeductTotalPrice: 0,
      selectedGiftCardVos: [],
      totalNum: null
    },
    ruleTypeName: "",
    cleanVersionFlag: !1
  },
  normalCoupons: [],
  productCoupons: [],
  frontCartData: {
    totalNum: 0,
    products: []
  },
  diffFrontCartData: {
    totalNum: 0,
    products: []
  },
  bestDiscount: !1,
  orderExtVo: {
    noBag: 0
  },
  selectedGiftCardList: null,
  onLoad: function(t) {
    var a = this;
    return n(o().mark((function e() {
      var r, s, i, d, c, u, p, h;
      return o().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            if (r = {
                options: t,
                showPackGuide: !!t.productId,
                cleanVersionFlag: a.data.selectedStore.cleanVersionFlag
              }, !t.cartId) {
              e.next = 11;
              break
            }
            return a.cartId = t.cartId, e.next = 5, a.queryCart((0, m.updateParamsController)(C.recommendDiscountType, a));
          case 5:
            s = a.data, i = s.cartData, d = i.shopId, c = i.consigneeAddressId, u = i.hasDiscounts, p = s.currentAddress, h = s.selectedStore, d && h.shopId != d && a.getShopInfo(d), !p.consigneeAddressId && c && a.getAddressInfo(c), a.bestDiscount = u, e.next = 17;
            break;
          case 11:
            r.cartData = getApp().cartData, a.bestDiscount = getApp().cartData.hasDiscounts, r.useProductExchangeMode = !!getApp().cartData.exchangeMarketingId, a.exchangeMarketingId = getApp().cartData.exchangeMarketingId, r.exchangeMarketingCouponName = getApp().cartData.exchangeMarketingCouponName, r["giftCardDeduct.useOpen"] = getApp().configData && getApp().configData.giftCard && getApp().configData.giftCard.useOpen;
          case 17:
            a.setData(r, n(o().mark((function e() {
              var r, n;
              return o().wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if ("buyNow" !== t.source) {
                      e.next = 13;
                      break
                    }
                    if (!getApp().cartData.exchangeMarketingId) {
                      e.next = 7;
                      break
                    }
                    return e.next = 4, a.queryCart((0, m.updateParamsController)(C.useCouponType, a, {
                      marketingId: a.exchangeMarketingId,
                      selectedProductVoucherList: getApp().cartData.selectedProductVoucherList,
                      useProductVoucherMode: 1
                    }));
                  case 4:
                    n = e.sent, e.next = 10;
                    break;
                  case 7:
                    return e.next = 9, a.queryCart((0, m.updateParamsController)(C.recommendDiscountType, a));
                  case 9:
                    n = e.sent;
                  case 10:
                    if (n) {
                      e.next = 12;
                      break
                    }
                    return e.abrupt("return");
                  case 12:
                    a.bestDiscount = n.hasDiscounts;
                  case 13:
                    null !== (r = a.data.cartData) && void 0 !== r && r.shopId && (a.getMarketingInfo(), a.getAvailableList(), a.getOrderPoint());
                  case 14:
                  case "end":
                    return e.stop()
                }
              }), e)
            }))));
          case 18:
          case "end":
            return e.stop()
        }
      }), e)
    })))()
  },
  onShow: function() {
    var t = this;
    return n(o().mark((function a() {
      var e, r, n;
      return o().wrap((function(a) {
        for (;;) switch (a.prev = a.next) {
          case 0:
            if (!getApp().payPackSuccess) {
              a.next = 8;
              break
            }
            return e = (0, l.getPlusDiscountProductList)(t.frontCartData.products), r = t.data.pointDeductMarketing.isPointDed, n = r ? (0, m.updateParamsController)(C.pointDeductType, t) : e.length ? (0, m.updateParamsController)(C.plusDiscountProductType, t) : (0, m.updateParamsController)(C.recommendDiscountType, t), a.next = 6, t.queryCart(n).then((function(a) {
              0 == a.code && t.getMarketingInfo(), t.bestDiscount = a.hasDiscounts
            }));
          case 6:
            t.getAvailableList(), getApp().payPackSuccess = !1;
          case 8:
            getApp().captchaVerifyParam && t.goPay();
          case 9:
          case "end":
            return a.stop()
        }
      }), a)
    })))()
  },
  computed: {
    warningText: function(t) {
      var a = t.addMoreMarketingData,
        e = "";
      return a.products && a.products.forEach((function(t, a) {
        t.addNum && (e += (0 != a && e ? "，" : "") + t.productNameShow + "X" + t.addNum)
      })), e
    }
  },
  toAddress: function() {
    if (!this.data.currentAddress.address || 1 != this.data.cartData.orderSource) {
      var t = this;
      wx.navigateTo({
        url: "/pages/customer-center/address-list/index?shopId=".concat(this.data.selectedStore.shopId, "&clickAndBack=1"),
        events: {
          dataFromAddress: function() {
            var a, e = t.data,
              r = e.pointDeductMarketing.isPointDed,
              s = e.cartData.products,
              i = e.mzhdData.discountsType,
              d = (0, l.getSelectedProductVoucherList)(s).isUnUsedVoucherCoupon;
            a = 2 === i ? (0, m.updateParamsController)(C.collectingCup, t, {
              discountsType: i
            }) : !d && t.exchangeMarketingId ? (0, m.updateParamsController)(C.useCouponType, t, {
              marketingId: t.exchangeMarketingId
            }) : r ? (0, m.updateParamsController)(C.pointDeductType, t) : (0, m.updateParamsController)(C.giftType, t, {
              useProductVoucherMode: 0,
              useCouponMode: 0
            }), wx.nextTick(n(o().mark((function e() {
              return o().wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, t.queryCart(a);
                  case 2:
                    t.getAvailableList();
                  case 3:
                  case "end":
                    return e.stop()
                }
              }), e)
            }))))
          }
        }
      })
    }
  },
  queryCart: function() {
    var t = this,
      a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    getApp().showLoading();
    var e = {};
    if (this.cartId) e.cartId = this.cartId;
    else {
      var r = this.data,
        o = r.cartData,
        n = o.shopId,
        s = o.orderType,
        d = o.transToken,
        c = r.currentAddress.consigneeAddressId,
        u = r.options.source;
      e = {
        shopId: n,
        orderType: s,
        consigneeAddressId: c,
        transToken: d,
        products: "buyNow" === u ? (0, l.getParamsByCartGoods)(getApp().cartData.products) : void 0
      }
    }
    return (0, i.queryCartForSettle)(Object.assign(e, a)).then((function(a) {
      var e = a.data;
      console.log("queryCartForSettle", e), e.hasInvalidProduct && t.selectComponent("#confirmDialog").openDialog();
      var r = {
        cartData: e || {},
        luckyCutDiscount: e.luckyCutDiscount,
        "giftCardDeduct.giftCardDeductTotalPrice": e.giftCardDeductVo && e.giftCardDeductVo.giftCardDeductTotalPrice || 0,
        "giftCardDeduct.selectedGiftCardVos": e.giftCardDeductVo && e.giftCardDeductVo.selectedGiftCardVos || [],
        "pointDeductMarketing.isPointDed": !(!e.pointDeductDiscount || !e.pointDeductDiscount.pointDed)
      };
      return e.cartTip && t.setData({
        cartTipText: "".concat(e.cartTip.split("%s元")[0], '<span style="color:#E60012;">').concat(e.cartTipPrice.split(",")[0], "元</span>").concat(e.cartTip.split("%s元")[1], '<span style="color:#E60012;">').concat(e.cartTipPrice.split(",")[1], "元</span>")
      }), t.updMzhdCard(r), t.getOrderPoint(), wx.hideLoading(), 0 != e.errorCode && t.dealError({
        code: e.errorCode,
        msg: e.errorMsg,
        errFromCart: 1
      }), e
    })).catch((function(a) {
      t.cartId ? getApp().showToast(a && a.msg || "网络异常，请稍后重试", (function() {
        wx.navigateBack()
      })) : t.dealError(a)
    }))
  },
  getShopInfo: function(t) {
    var a = this;
    (0, u.getShopInfo)(t).then((function(t) {
      var e = t.data;
      e && getApp().getUserLocation().then((function(t) {
        var r = t.longitude,
          o = t.latitude;
        (o || r) && (e.distance = (0, g.getDistance)(e.latitude, e.longitude, o, r)), a.setData({
          selectedStore: e
        })
      })).catch((function() {
        a.setData({
          selectedStore: e
        })
      }))
    }))
  },
  getAddressInfo: function(t) {
    var a = this;
    (0, p.getAddressInfo)(t).then((function(t) {
      var e = t.data;
      e && a.setData({
        currentAddress: e
      })
    }))
  },
  getAvailableList: function() {
    var t = this,
      a = this.data.cartData,
      e = a.shopId,
      r = a.originPrice,
      o = a.originPriceNoDeliveryFee,
      n = a.mealFee,
      s = a.products,
      i = a.orderType,
      d = a.couponThresholdPrice,
      u = a.partitions;
    if ((1 != i || r) && (2 != i || o - n)) {
      var p = [];
      ((u && u.length ? u.flatMap((function(t) {
        return t.products
      })) : s) || []).forEach((function(t) {
        if (t.canUseCoupon) {
          var a = [];
          t.specs && (a = a.concat(t.specs)), t.comboProductDetail && t.comboProductDetail.forEach((function(t) {
            t.specs && (a = a.concat(t.specs))
          })), p.push({
            goodsId: t.productId,
            num: t.productAmount,
            originPrice: t.originPrice,
            specs: a.length ? a : void 0
          })
        }
      })), (0, c.getAvailableCoupon)({
        shopId: e,
        orderType: i,
        discountAmount: d / 100,
        goodsList: p,
        pageNumber: 1,
        pageSize: 100,
        couponCallbackInfo: this.data.cartData.couponCallbackInfo
      }).then((function(a) {
        var e = a.data,
          r = e ? e.normalCoupons.length + e.productCoupons.length : 0;
        t.setData({
          totalCouponsNum: r
        }), t.normalCoupons = e && e.normalCoupons || [], t.productCoupons = e && e.productCoupons || []
      }))
    }
  },
  getMarketingInfo: function() {
    var t = this;
    getApp().showLoading();
    var a = this.data.cartData,
      e = a.shopId,
      s = a.orderType,
      i = a.transToken,
      c = this.cartId;
    (0, d.getMarketing)(c ? {
      shopId: e,
      cartId: c
    } : {
      shopId: e,
      orderType: s,
      transToken: i
    }).then(function() {
      var a = n(o().mark((function a(e) {
        var r, n, s, i, d, c, p, f, D, m, C;
        return o().wrap((function(a) {
          for (;;) switch (a.prev = a.next) {
            case 0:
              if (r = e.data, n = r.collectCardVo, s = r.plusDiscountMarketing, i = r.pointDeductMarketing, d = r.packBagInfo, c = r.payGiftReward, p = r.giftCardDeductVo, f = u(s), D = {
                  isShowAddMore: !!s,
                  isShowPopupAddMore: f,
                  mzhdData: {
                    discountsType: t.data.mzhdData.discountsType,
                    hasDiscount: t.data.mzhdData.hasDiscount
                  },
                  addMoreMarketingData: {
                    totalNum: t.frontCartData.totalNum
                  },
                  pointDeductMarketing: i || {},
                  packBagInfo: d || {
                    enabled: 0
                  },
                  payGiftData: Object.assign(c || {}, {
                    page: "cart"
                  }),
                  "giftCardDeduct.supportGiftCard": p && p.supportGiftCard || 0
                }, !p || !p.supportGiftCard) {
                a.next = 15;
                break
              }
              return a.prev = 4, a.next = 7, (0, h.queryCard)();
            case 7:
              m = a.sent, C = m.data, D["giftCardDeduct.totalNum"] = null === C ? null : C.totalNum + "", a.next = 15;
              break;
            case 12:
              a.prev = 12, a.t0 = a.catch(4), console.log("========:", a.t0);
            case 15:
              t.orderExtVo.noBag = 0, s && s.products.forEach((function(a) {
                var e = t.frontCartData.products.findIndex((function(t) {
                  return a.productId == t.productId
                }));
                a.splitSprice = (0, g.splitSprice)(a.productPrice), a.addNum = -1 !== e ? t.frontCartData.products[e].addNum : 0, t.transImage(a), t.transProductNameShow(a), a.cartViewId = (0, l.getUniKeyByParam)(0, a.productId, a.cupId), a.selectCup = 0, a.productAttrs.forEach((function(t) {
                  t.selectAttr = 0
                })), a.disabledIdsObj = (0, l.getDisabledIds)(a)._disabled
              })), n && n.curOrderNum && Object.assign(D.mzhdData, n), s && s.products && Object.assign(D.addMoreMarketingData, s), t.updMzhdCard(D), wx.hideLoading(), t.hasMzhdInfo = 1;
            case 22:
            case "end":
              return a.stop()
          }
        }), a, null, [
          [4, 12]
        ])
      })));
      return function(t) {
        return a.apply(this, arguments)
      }
    }()).catch((function() {
      wx.hideLoading(), t.hasMzhdInfo = 1
    }));
    var u = function(a) {
      if (!a || t.addMoreHasPopup || a && 1 == a.popupLimitType) return !1;
      if (!a.popupLimitType || 2 == a.popupLimitType) return !0;
      var e = JSON.parse(getApp().getStorageSync("discountMarketingPopNum") || "{}"),
        o = a.popupLimitType,
        n = a.popupLimitNum,
        s = a.marketingId;
      if (!e[s]) return e[s] = [1, (new Date).setHours(24, 0, 0, 0)], getApp().setStorageSync("discountMarketingPopNum", JSON.stringify(e)), !0;
      var i = r(e[s], 2),
        d = i[0],
        c = void 0 === d ? 0 : d,
        u = i[1],
        p = void 0 === u ? Date.now() : u;
      return 3 == o && p <= Date.now() ? (e[s] = [1, (new Date).setHours(24, 0, 0, 0)], getApp().setStorageSync("discountMarketingPopNum", JSON.stringify(e)), !0) : (e[s] = [++c, p], c <= n ? (getApp().setStorageSync("discountMarketingPopNum", JSON.stringify(e)), !0) : (a && (t.addMoreHasPopup = 1), !1))
    }
  },
  addGoods: function(t) {
    var r = this;
    return n(o().mark((function n() {
      var s, i, d, c, u, p;
      return o().wrap((function(o) {
        for (;;) switch (o.prev = o.next) {
          case 0:
            s = t.currentTarget.dataset.index, i = r.frontCartData.totalNum, d = r.data.addMoreMarketingData.products[s], c = r.frontCartData.products.findIndex((function(t) {
              return d.cartViewId == t.cartViewId
            })), u = d.addNum || 0, r.frontCartData.totalNum = i + 1, -1 != c ? r.frontCartData.products[c].addNum = u + 1 : r.frontCartData.products.push(e(e({}, d), {}, {
              addNum: 1
            })), p = a({
              "addMoreMarketingData.totalNum": i + 1
            }, "addMoreMarketingData.products[".concat(s, "].addNum"), u + 1), r.setData(p, (function() {
              r.updateAddMoreToCart()
            }));
          case 9:
          case "end":
            return o.stop()
        }
      }), n)
    })))()
  },
  removeGoods: function(t) {
    var e = this,
      r = t.currentTarget.dataset,
      o = r.index,
      n = r.isSubmit,
      s = this.frontCartData.totalNum,
      i = this.data.addMoreMarketingData.products[o],
      d = this.frontCartData.products.findIndex((function(t) {
        return i.cartViewId == t.cartViewId
      })),
      c = i.addNum || 0;
    this.frontCartData.totalNum = s >= 1 ? s - 1 : 0, c > 1 ? this.frontCartData.products[d].addNum = c - 1 : this.frontCartData.products.splice(d, 1);
    var u = this.diffFrontCartData.products.findIndex((function(t) {
      return i.cartViewId == t.cartViewId
    }));
    this.diffFrontCartData.totalNum--, -1 != u ? this.diffFrontCartData.products[u].addNum-- : 1 == c && (this.diffFrontCartData.products.splice(d, 1), this.diffFrontCartData.totalNum = 0);
    var p = a({
      "addMoreMarketingData.totalNum": this.frontCartData.totalNum
    }, "addMoreMarketingData.products[".concat(o, "].addNum"), c >= 1 ? c - 1 : 0);
    this.setData(p, (function() {
      n && e.updateAddMoreToCart()
    }))
  },
  updateAddMoreToCart: function(t) {
    var a = this;
    if (t) {
      for (var e = 0; e < this.data.addMoreMarketingData.products.length; e++) {
        var r = this.data.addMoreMarketingData.products[e];
        if (r.addNum && r.productAttrs && r.productAttrs.length)
          for (var o = 0; o < r.productAttrs.length; o++) {
            var n = r.productAttrs[o],
              s = n.selectAttr,
              i = n.attributeName;
            if (-1 == s) return getApp().showToast("请选择".concat(r.productNameShow).concat(i))
          }
      }
      this.frontCartData = this.filterFrontCartDataFromMarketingData(), getApp().trackEvent("pop_recommend")
    }
    this.queryCart((0, m.updateParamsController)(C.plusDiscountProductType, this)).then((function() {
      a.setData({
        isShowPopupAddMore: !1
      })
    })), this.diffFrontCartData = {
      totalNum: 0,
      products: []
    }
  },
  closeAddMorePopup: function() {
    var t = this,
      a = {};
    this.diffFrontCartData.products.forEach((function(e) {
      var r = t.data.addMoreMarketingData.products.findIndex((function(t) {
          return t.cartViewId === e.cartViewId
        })),
        o = t.frontCartData.products.findIndex((function(t) {
          return t.cartViewId === e.cartViewId
        })),
        n = t.frontCartData.products[o];
      if (n) {
        var s = JSON.parse(JSON.stringify(n.productAttrs));
        a["addMoreMarketingData.products[".concat(r, "].addNum")] = n.addNum, a["addMoreMarketingData.products[".concat(r, "].productAttrs")] = s
      } else a["addMoreMarketingData.products[".concat(r, "].addNum")] = 0
    })), a["addMoreMarketingData.totalNum"] = this.frontCartData.totalNum, this.setData(a), this.diffFrontCartData = {
      totalNum: 0,
      products: []
    }, this.setData({
      isShowPopupAddMore: !1
    })
  },
  clearAddMore: function() {
    var t = {
      "addMoreMarketingData.totalNum": 0
    };
    this.data.addMoreMarketingData.products && this.data.addMoreMarketingData.products.forEach((function(a, e) {
      t["addMoreMarketingData.products[".concat(e, "].addNum")] = 0
    })), this.diffFrontCartData = {
      totalNum: 0,
      products: []
    }, this.frontCartData = {
      totalNum: 0,
      products: []
    }, this.setData(t)
  },
  clearPointDeduce: function() {
    this.setData({
      "pointDeductMarketing.isPointDed": !1
    })
  },
  updMzhdCard: function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      a = t.mzhdData || this.data.mzhdData,
      e = t.cartData || this.data.cartData;
    t["mzhdData.hasDiscount"] = this.bestDiscount || e.hasDiscounts, t["mzhdData.discountsType"] = a.curOrderNum && !e.hasDiscounts ? 2 : 1, this.setData(t)
  },
  selectGiftCard: function() {
    var t = this;
    return n(o().mark((function a() {
      var e, r, n, s, i, d, c, u, p, h;
      return o().wrap((function(a) {
        for (;;) switch (a.prev = a.next) {
          case 0:
            return a.next = 2, getApp().checkPhone();
          case 2:
            if (e = t.data, r = e.cartData, n = r.shopId, s = r.orderType, i = r.total, d = e.giftCardDeduct, c = d.supportGiftCard, u = d.selectedGiftCardVos, p = void 0 === u ? [] : u, c) {
              a.next = 5;
              break
            }
            return a.abrupt("return");
          case 5:
            h = p.map((function(t) {
              return t.cardNo
            })), wx.navigateTo({
              url: "/pages/wallet/gift-card/select/index",
              events: {
                card2settle: function(a) {
                  a.join(",") !== h.join(",") && (t.selectedGiftCardList = a.map((function(t) {
                    return {
                      cardNo: t
                    }
                  })), t.queryCart((0, m.updateParamsController)(C.giftType, t)))
                }
              },
              success: function(t) {
                t.eventChannel.emit("settle2card", {
                  shopId: n,
                  orderType: s,
                  selected: h,
                  totalPrice: i
                })
              }
            });
          case 7:
          case "end":
            return a.stop()
        }
      }), a)
    })))()
  },
  selectDiscount: function() {
    1 != this.data.mzhdData.discountsType && this.queryCart((0, m.updateParamsController)(C.recommendDiscountType, this, {
      discountsType: 1
    }))
  },
  selectMzhd: function() {
    var t = this.data,
      a = t.mzhdData.discountsType,
      e = t.addMoreMarketingData;
    2 != a && (e && e.products && this.clearAddMore(), this.clearPointDeduce(), this.queryCart((0, m.updateParamsController)(C.collectingCup, this, {
      discountsType: 2
    })))
  },
  updDiscounts: function() {
    var t = this,
      a = this.normalCoupons,
      e = this.productCoupons,
      r = this.data.cartData;
    this.data.useProductExchangeMode || (getApp().trackEvent("pay_coup"), wx.navigateTo({
      url: "/pages/coupon/upd-discounts/index",
      events: {
        datafromUpdDiscounts: function(a) {
          var e = a.params;
          Object.keys(e).length && t.queryCart((0, m.updateParamsController)(C.useCouponType, t, e))
        }
      },
      success: function(t) {
        t.eventChannel.emit("dataToUpdDiscounts", {
          cartData: r,
          normalCoupons: a,
          productCoupons: e
        })
      }
    }))
  },
  toPackDetail: function() {
    var t = this.data.selectedStore.shopId,
      a = this.data.options,
      e = a.productId,
      r = a.productIdList;
    this.setData({
      showPackGuide: !1
    }), wx.navigateTo({
      url: "/pages/coupon/pack-list/index?shopId=".concat(t, "&productId=").concat(e, "&productIdList=").concat(r)
    })
  },
  onBeforePay: function() {
    this.goPay()
  },
  goPay: function() {
    var t = this;
    if (2 != this.data.cartData.orderType || void 0 !== this.data.currentAddress.address) {
      if (!(this.isPaying || !this.hasMzhdInfo || this.data.cartData.productAmount <= 0)) {
        if ((0, l.getIsNeedMemCheck)(this.data.cartData) && !getApp().captchaVerifyParam) return getApp().navigate("".concat(D.baseUrl_Web, "/#/captcha?id=14yuubba"));
        this.isPaying = !0, getApp().showLoading("支付中"), getApp().trackEvent("pay_confirm");
        var a = this.data,
          e = a.cartData,
          r = e.shopId,
          o = e.couponCode,
          n = e.orderType,
          i = e.products,
          d = e.partitions,
          c = e.transToken,
          u = a.mzhdData.discountsType,
          p = a.remarkStr,
          h = a.tableware,
          g = a.pointDeductMarketing,
          f = g.marketingId,
          m = g.pointUsed,
          C = g.isPointDed,
          k = a.packBagInfo.enabled,
          y = a.giftCardDeduct.selectedGiftCardVos,
          v = (0, l.getSelectedProductVoucherList)(d && d.length ? d.flatMap((function(t) {
            return t.products
          })) : i).selectedProductVoucherList,
          P = (0, l.getPlusDiscountProductList)(this.frontCartData.products),
          w = C ? {
            marketingId: f,
            pointUsed: m
          } : null;
        (0, s.saveOrder)({
          captchaVerifyParam: getApp().captchaVerifyParam,
          cartId: this.cartId,
          shopId: r,
          products: c ? (0, l.getParamsByCartGoods)(getApp().cartData.products) : void 0,
          transToken: c,
          discountsType: u,
          couponCode: 1 === u && o || "",
          selectedProductVoucherList: v,
          plusDiscountProductList: P,
          orderType: n,
          miniProgType: 1,
          orderChannel: 2,
          remark: p,
          tableware: h,
          takeType: 1,
          pointDeduct: w,
          orderExtVo: 1 == n && k ? this.orderExtVo : null,
          marketingId: this.exchangeMarketingId,
          selectedGiftCardList: y.map((function(t) {
            return {
              cardNo: t.cardNo
            }
          }))
        }).then((function(a) {
          var e = a.data.orderCode;
          (0, s.prePay)(e).then((function(a) {
            var r = a.data,
              o = r.nonceStr,
              n = r.packageStr,
              s = r.paySign,
              i = r.signType,
              d = r.timestamp,
              c = r.isZeroPay;
            wx.hideLoading(), c ? (getApp().trackEvent("Pay_succeed", {
              type: "zero"
            }), t.toTakePage(e)) : wx.requestPayment({
              timeStamp: d,
              nonceStr: o,
              package: n,
              signType: i,
              paySign: s,
              success: function() {
                getApp().trackEvent("Pay_succeed", {
                  type: "not_zero"
                }), t.toTakePage(e)
              },
              fail: function() {
                t.toPayPage(e)
              }
            })
          })).catch((function(a) {
            getApp().trackEvent("Pay_failed", {
              process: "pre_pay"
            }), t.isPaying = !1, wx.hideLoading(), a && 7002 == a.code ? getApp().showToast("暂无法支付，请稍后重试", (function() {
              t.toPayPage(e)
            })) : getApp().showToast(a && a.msg || "网络异常，请稍后重试", (function() {
              t.toPayPage(e)
            }))
          })), getApp().menuOptions.estimatedPriceFresh = 1
        })).catch(this.dealError), getApp().captchaVerifyParam = null
      }
    } else getApp().showToast("请选择收货地址")
  },
  toTakePage: function(t) {
    var a = this.data,
      e = a.mzhdData,
      r = e.discountsType,
      o = e.curOrderNum,
      n = e.needNum,
      s = e.manZengType,
      i = e.rankType,
      d = e.needPointList,
      c = e.currentNum,
      u = a.cartData,
      p = u.orderType,
      h = u.deliveryType,
      g = "/pages/order_detail/take/index?orderCode=".concat(t, "&isPayReturn=1&orderType=").concat(p),
      l = 2 === i ? d[0] : n,
      f = 2 === i ? 3 : s,
      D = 2 === i ? c + o : o;
    console.log("_curOrderNum, _needNum, _manZengType:", D, l, f), 2 == r && D >= l && (g += "&showReward=".concat(f)), 2 == p && 1 == h && (g += "&showPhoneTip=1"), wx.redirectTo({
      url: g
    })
  },
  toPayPage: function(t) {
    var a = this.data,
      e = a.mzhdData,
      r = e.discountsType,
      o = e.curOrderNum,
      n = e.needNum,
      s = e.manZengType,
      i = e.rankType,
      d = e.needPointList,
      c = a.cartData,
      u = c.orderType,
      p = c.deliveryType,
      h = "/pages/order_detail/pay/index?orderCode=".concat(t),
      g = 2 === i ? d[0] : n;
    2 == r && o >= g && (h += "&showReward=".concat(2 === i ? 3 : s)), 2 == u && 1 == p && (h += "&showPhoneTip=1"), wx.redirectTo({
      url: h
    })
  },
  toMzRule: function() {
    getApp().navigate(this.data.mzhdData.rulePageUrl)
  },
  toRegister: function() {
    getApp().navigate("/pages/register/index?showNewGiftResult=1")
  },
  goRemark: function() {
    getApp().trackEvent("pay_tips"), wx.navigateTo({
      url: "/pages/order_detail/remark/index?remark=".concat(this.data.remarkStr, "&orderType=").concat(this.data.cartData.orderType)
    })
  },
  toggle: function() {
    this.setData({
      isShowDetail: !this.data.isShowDetail
    })
  },
  showTakeOutInfo: function() {
    this.setData({
      isShowTakeOutInfo: !0
    })
  },
  hideTakeOutInfo: function() {
    this.setData({
      isShowTakeOutInfo: !1
    })
  },
  closePopup: function() {
    this.setData({
      showClosedPopup: !1
    }), this.selectStore()
  },
  changeTableWarePopup: function() {
    this.setData({
      isShowtableWarePopup: !this.data.isShowtableWarePopup
    })
  },
  changeTableWareValue: function(t) {
    var a = t.detail.value;
    this.setData({
      tableware: +a
    })
  },
  dealError: function(t) {
    var a = this,
      e = t && t.code,
      r = {
        6107: "门店外卖已关闭",
        6210: "外卖已置休"
      },
      s = {
        8002: "存在部分商品信息发生变更，请重新选购。",
        8003: "优惠信息已变更，请确认后重新提交。",
        8005: "存在部分商品无法购买，请重新选购。",
        8006: "存在部分商品无法购买，请重新选购。",
        8007: "存在部分商品无法购买，请重新选购。",
        8008: "超过最大加购数量",
        8010: "当前场景不能加购此商品，\n请选择其他商品",
        8104: "订单金额发生变化",
        8110: "门店未设置配送信息",
        8141: "部分商品已超出购买上限，请重新选购。",
        8142: t.msg
      },
      i = {
        8004: "购物车信息不存在"
      },
      d = {
        8201: "不满足积分抵现活动条件",
        8202: "积分抵现活动已失效"
      },
      c = {
        8206: "门店暂不支持礼品卡抵扣",
        8207: "不满足礼品卡抵扣条件"
      };
    this.isPaying = !1, wx.hideLoading(), [6101, 6102, 6103, 6104, 6105, 6106, 6109, 6110, 6111].includes(e) ? this.setData({
      showClosedPopup: !0
    }) : s[e] ? (this.setData({
      goodsErrorMsg: s[e],
      isShowGoodsError: !0
    }), getApp().menuOptions.isOtherError = 1) : r[e] || i[e] || d[e] ? getApp().showToast(r[e] || i[e] || d[e], (function() {
      wx.navigateBack()
    }), 2e3) : [8130, 8131, 8132, 8133, 8134, 8135, 8136, 8137, 8138, 8139].includes(e) ? getApp().showToast(t && t.msg || "超值加购活动信息变更，请重新加购", n(o().mark((function e() {
      return o().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            if (a.clearAddMore(), t.errFromCart) {
              e.next = 4;
              break
            }
            return e.next = 4, a.queryCart((0, m.updateParamsController)(C.recommendDiscountType, a));
          case 4:
            a.getMarketingInfo();
          case 5:
          case "end":
            return e.stop()
        }
      }), e)
    }))), 500) : 8140 === e ? this.clearAddMore() : 7041 === e ? getApp().showToast(t && t.msg || "网络异常，请稍后重试") : 7043 === e ? getApp().navigate("".concat(D.baseUrl_Web, "/#/captcha?id=14yuubba")) : c[e] ? (getApp().showToast(c[e]), this.selectedGiftCardList = null) : getApp().showToast(t && t.msg || "网络异常，请稍后重试", (function() {
      wx.navigateBack()
    }), 500)
  },
  transImage: function(t) {
    t.productLogoOriginal = t.productLogo.split("?")[0]
  },
  transProductNameShow: function(t) {
    var a = t.cupName,
      e = a ? "(" + a + ")" : "";
    t.productNameShow = e ? t.productName + e : t.productName
  },
  cancelSettle: function() {
    wx.navigateBack()
  },
  confirmPay: function() {
    2 == this.data.cartData.orderType || this.cartId || this.data.useProductExchangeMode ? this.onBeforePay() : this.selectComponent("#confirmStore").openDialog()
  },
  selectStore: function() {
    var t = this;
    2 == this.data.cartData.orderType || this.exchangeMarketingId ? wx.redirectTo({
      url: "/pages/store/index"
    }) : wx.navigateTo({
      url: "/pages/store/index",
      events: {
        dataChangeStore: function(a) {
          var e = a.shopId;
          t.data.selectedStore.shopId != e && ("buyNow" === t.data.options.source ? t.freshPageSwitchShop(e) : t.fetchSwitchShop(e))
        }
      }
    })
  },
  fetchSwitchShop: function(t) {
    var a = this;
    (0, i.switchShopInCart)({
      fromShopId: this.data.selectedStore.shopId,
      toShopId: t,
      orderType: "1"
    }).then(n(o().mark((function e() {
      return o().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            a.freshPageSwitchShop(t);
          case 1:
          case "end":
            return e.stop()
        }
      }), e)
    })))).catch((function(e) {
      8002 === e.code && (getApp().menuOptions.shopId = t), a.dealError(e)
    }))
  },
  freshPageSwitchShop: function(t) {
    var a = this;
    return n(o().mark((function e() {
      var r;
      return o().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return a.getShopInfo(t), a.frontCartData.totalNum = 0, a.frontCartData.products.length = 0, e.next = 5, a.queryCart((0, m.updateParamsController)(C.recommendDiscountType, a, {
              shopId: t
            }));
          case 5:
            r = e.sent, a.setData({
              "cartData.shopId": t,
              totalCouponsNum: 0
            }, (function() {
              r && (a.bestDiscount = r.hasDiscounts, a.getMarketingInfo(), a.getAvailableList())
            }));
          case 7:
          case "end":
            return e.stop()
        }
      }), e)
    })))()
  },
  toggleCoinRule: function() {
    this.setData({
      showCoinRule: !this.data.showCoinRule
    })
  },
  goBack: function() {
    wx.navigateBack()
  },
  pointDeduceTap: function() {
    var t = this,
      a = this.data.pointDeductMarketing.isPointDed,
      e = a ? C.recommendDiscountType : C.pointDeductType;
    this.setData({
      "pointDeductMarketing.isPointDed": !a
    });
    var r = (0, m.updateParamsController)(e, this);
    this.queryCart(r).then((function() {
      t.clearAddMore(), 1013 === e && getApp().showToast("不与其他优惠同享")
    })), getApp().trackEvent("point_deduct")
  },
  toOpenRule: function(t) {
    var a = t.target.dataset.ruleId,
      e = {};
    e["".concat(a)] = !0, e.ruleTypeName = a, this.setData(e)
  },
  toCloseRule: function() {
    this.setData({
      showPointDeductRule: !1,
      showJointDiscountRule: !1
    })
  },
  closeLuckyCutPopup: function() {
    this.setData({
      isShowLuckyCut: !1
    })
  },
  getOrderPoint: function() {
    var t = this;
    (0, s.getOrderPointAndGrowth)({
      pageType: 1,
      actualPayAmount: this.data.cartData.total
    }).then((function(a) {
      var e = a.data;
      t.setData({
        orderPoint: e.point || 0,
        growth: e.growth || 0
      })
    })).catch((function() {
      getApp().showToast("网络异常，请稍后重试")
    }))
  },
  addGoodsAtCartPage: function(t) {
    var a = t.currentTarget.dataset,
      e = a.index,
      r = a.isSubmit,
      o = a.name;
    if (+this.data.addMoreMarketingData.products[e].detailType) this.setData({
      isShowPopupAddMore: !0,
      currentIndexPlus: e,
      cleanVersionFlag: !1
    });
    else {
      if (!this.checkGoodsTotalNum(e)) return;
      this.addGoods({
        currentTarget: {
          dataset: {
            index: e,
            isSubmit: r
          }
        }
      }), getApp().trackEvent("Ads_recommend", {
        goods: o
      })
    }
  },
  addGoodsAtPopUp: function(t) {
    var r = t.currentTarget.dataset,
      o = r.index,
      n = r.productAmount;
    if (!(n > 0) || this.checkGoodsTotalNum(o)) {
      var s = this.data.addMoreMarketingData.products[o],
        i = s.addNum,
        d = this.data.addMoreMarketingData.totalNum,
        c = this.diffFrontCartData.products.findIndex((function(t) {
          return t.cartViewId === s.cartViewId
        }));
      this.diffFrontCartData.totalNum += n, c > -1 ? this.diffFrontCartData.products[c].addNum += n : this.diffFrontCartData.products.push(e(e({}, s), {}, {
        addNum: n
      }));
      var u = a({
        "addMoreMarketingData.totalNum": d + n
      }, "addMoreMarketingData.products[".concat(o, "].addNum"), i + n);
      this.setData(u)
    }
  },
  selectAttr: function(t) {
    var a = t.currentTarget.dataset,
      r = a.indexs,
      o = a.mutexAttrs,
      n = {},
      s = this.data.addMoreMarketingData.products[r[0]];
    (o || []).forEach((function(t) {
      return n[t] = 1
    }));
    var i = s.cups,
      d = void 0 === i ? [] : i,
      c = s.selectCup;
    if (!d[c] || !n[d[c].specId]) {
      var u = (0, l.resetProductCups)(s, n),
        p = (0, l.resetProductAttrs)(s, n, [r[1], r[2]]),
        h = this.diffFrontCartData.products.findIndex((function(t) {
          return t.cartViewId === s.cartViewId
        }));
      h > -1 ? this.diffFrontCartData.products[h].productAttrs = p : this.diffFrontCartData.products.push(e({}, s));
      var g = {};
      g["addMoreMarketingData.products[".concat(r[0], "].selectCup")] = u, g["addMoreMarketingData.products[".concat(r[0], "].productAttrs")] = p, g["addMoreMarketingData.products[".concat(r[0], "].disabledIdsObj")] = n, this.setData(g)
    }
  },
  checkGoodsTotalNum: function(t) {
    var a = this.data.addMoreMarketingData,
      e = a.orderLimitTotal,
      r = a.totalNum,
      o = this.data.addMoreMarketingData.products[t],
      n = o.addNum || 0,
      s = o.productAttrs;
    if (s && s.length)
      for (var i = 0; i < s.length; i++) {
        var d = s[i],
          c = d.selectAttr,
          u = d.attributeName;
        if (-1 == c) return getApp().showToast("请选择".concat(u))
      }
    return r >= e ? getApp().showToast("最多加购".concat(e, "个哦")) : n >= o.orderLimit ? getApp().showToast("该商品最多加购".concat(o.orderLimit, "个哦")) : !(n >= o.marketingStock) || getApp().showToast("加购商品库存不足")
  },
  filterFrontCartDataFromMarketingData: function() {
    var t = this.data.addMoreMarketingData,
      a = t.totalNum,
      e = t.products,
      r = {
        totalNum: a
      };
    return r.products = e.reduce((function(t, a) {
      var e = JSON.parse(JSON.stringify(a));
      return a.addNum > 0 && t.push(e), t
    }), []), r
  },
  selectFlower: function(t) {
    var a = t.detail;
    this.orderExtVo.noBag = a
  },
  onForceSelect: function(t) {
    var a = t.detail;
    this.orderExtVo.noBag = a, this.goPay()
  }
});
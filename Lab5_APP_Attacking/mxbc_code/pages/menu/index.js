require("../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../@babel/runtime/helpers/defineProperty"),
  t = require("../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../@babel/runtime/helpers/toConsumableArray"),
  r = require("../../@babel/runtime/helpers/slicedToArray"),
  a = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../@babel/runtime/helpers/asyncToGenerator"),
  s = require("@/request/user"),
  i = require("@/request/menu"),
  c = require("@/request/store"),
  d = require("@/request/activity"),
  u = require("@/request/jointOrder"),
  p = require("@/request/address"),
  h = require("@/request/order"),
  l = require("@/utils/index"),
  g = I(require("@/utils/js-md5")),
  m = require("@/env"),
  f = require("@/mixins/index"),
  v = I(require("@/enum/index"));

function I(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
var w = "经典菜单",
  A = ["", "", "已下架", "已售罄", "已失效", "限购", "社群商品"];
Page({
  data: {
    userInfo: {},
    isJuniorMember: !1,
    statusBarHeight: 0,
    navBarHeight: 0,
    menuButtonWidth: 0,
    vtabs: [],
    popupAdList: [],
    guideLoginAdList: [],
    swiperList: v.default.menu_placeholder,
    selectedStore: {},
    cartData: {},
    activites: [],
    mzhdData: {},
    isLoading: !0,
    showAnimate: !0,
    isShowCartDetail: !1,
    isShowConfirmDialog: !1,
    isShowFarDistanceConfirm: !1,
    showErrorPopup: !1,
    showOfflinePopup: !1,
    showClosedPopup: !1,
    showRecommendTip: !1,
    showMultiShopPopup: !1,
    orderType: 1,
    currentAddress: {},
    userLocationPermission: !0,
    showTakeoutTipsDialog: !1,
    hasAccessToken: !1,
    isShowAbnormalGoods: !1,
    invalidProductList: [],
    jointRole: 1,
    hotSearchWord: "",
    showSubscribeGuide: !1,
    showLogin: !1,
    showLoginCom: !1,
    curViewShowIndex: 0,
    regGuidanceSettingVo: {},
    loginOptions: {
      showNewGiftResult: 1
    },
    suspensionAdList: [],
    suspensionFold: !1,
    recommendShopLists: [],
    recommendAdList: [],
    timeFiveSecond: !1,
    menuTabs: [w],
    marketingMenuList: [],
    activeTab: 0,
    _jointOrderConfig: {},
    showUserPreference: !!getApp().globalData.userInfo.mobilePhone,
    orderList: [],
    collectList: [],
    currentOrderTab: 0,
    showRightsBarTitle: !0,
    maybePreferList: [],
    isShowPrivacy: 0
  },
  computed: {
    isShowSuspensionBanner: function(e) {
      var t = e.showMultiShopPopup,
        o = e.showErrorPopup,
        r = e.showOfflinePopup,
        a = e.showClosedPopup,
        n = e.timeFiveSecond,
        s = e.recommendAdList,
        i = e.isLoading;
      return t || o || r || a || 0 == s.length || this.isAlreadyShowSuspensionBanner || i ? (this.timer_recommend_goods && this.clearRecommendTimer(this.timer_recommend_goods), !1) : (!n && this._suspensionBannerStartTimingFun(), n && getApp().trackEvent("menu_recommend_suspension_banner", {
        event_type: "曝光",
        element_name: s[0].adTitle
      }), n)
    }
  },
  saleOutText: "外送",
  timer_recommend_goods: null,
  isAlreadyShowSuspensionBanner: !1,
  _cartData: {},
  estimatedPriceProducts: [],
  exchangeProducts: [],
  isRequestOrderList: !1,
  suggestWordsList: [],
  onLoad: function(e) {
    var t = this;
    return n(a().mark((function o() {
      var r, n;
      return a().wrap((function(o) {
        for (;;) switch (o.prev = o.next) {
          case 0:
            wx.hideShareMenu({
              menus: ["shareAppMessage", "shareTimeline"]
            }), t.refreshPage(Object.assign(e, {
              sendAds: 1,
              estimatedPriceFresh: 1
            })), r = getApp(), (n = r.saleCategoryId) && (t.saleCategoryId = n), t.getJointOrderConfig(), getApp().globalData.userInfo.mobilePhone && !t.data.showUserPreference && t.setData({
              showUserPreference: !0
            });
          case 6:
          case "end":
            return o.stop()
        }
      }), o)
    })))()
  },
  onShow: function() {
    var e = this;
    return n(a().mark((function t() {
      var o, r, n, s, i, c, d, u, p, h;
      return a().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            if (e.lockToOrder = 0, !e.data.isLoading || e.isOtherError) {
              t.next = 3;
              break
            }
            return t.abrupt("return");
          case 3:
            o = getApp().menuOptions, r = o.orderType, n = o.shopId, s = o.source, i = o.isOtherError, c = getApp(), d = c.saleCategoryId, e.saleCategoryId = d || "", e.isOtherError = i || e.isOtherError, u = r && +r != +e.data.orderType, p = n && n !== e.data.selectedStore.shopId, h = e.data.hasAccessToken != getApp().accessToken, u || p || h || "onemore" == s || e.isOtherError ? (getApp().menuOptions.skipRefresh = 0, e.refreshPage({
              sendAds: p,
              estimatedPriceFresh: 1
            })) : e.refreshPage({
              productName: getApp().productName,
              showToast: 1,
              sendCart: 1,
              sendMzhd: 1,
              showAnimate: 0,
              closeDialog: 0,
              sendAds: 0,
              sendMain: 0,
              sendStore: 0,
              sendMarketing: 0
            }), getApp().globalData.userInfo.mobilePhone && !e.data.showUserPreference && e.setData({
              showUserPreference: !0
            }), getApp().fromCaptchaVerify && getApp().captchaVerifyParam && e.onExchange();
          case 13:
          case "end":
            return t.stop()
        }
      }), t)
    })))()
  },
  onHide: function() {
    this.saleCategoryId = "", this.setData({
      showRecommendTip: !1,
      recommendAdList: []
    }), this.timer && clearTimeout(this.timer), this.timer = null, this.clearRecommendTimer(this.timer_recommend_goods)
  },
  refreshPage: function() {
    var e = arguments,
      t = this;
    return n(a().mark((function o() {
      var r, n, s, i, d, u, p, h, g, m, f, v, I, w, A, x, T, b, D, y, S, C, P, k, L, M, O, N, E, _, G, j, q, V, R, U, B, F, W, H, J, z, Q, K;
      return a().wrap((function(o) {
        for (;;) switch (o.prev = o.next) {
          case 0:
            if (r = e.length > 0 && void 0 !== e[0] ? e[0] : {}, n = Object.assign(r, getApp().menuOptions), s = n.q, i = n.source, d = n.productId, u = n.productName, p = void 0 === u ? getApp().productName : u, h = n.consigneeAddressId, g = n.orderType, m = void 0 === g ? t.data.orderType : g, f = n.shopId, v = void 0 === f ? t.data.selectedStore.shopId : f, I = n.showToast, w = void 0 === I ? 0 : I, A = n.showAnimate, x = void 0 === A ? 1 : A, T = n.closeDialog, b = void 0 === T ? 1 : T, D = n.sendAds, y = void 0 === D ? 0 : D, S = n.sendCart, C = void 0 === S ? 0 : S, P = n.sendMain, k = void 0 === P ? 1 : P, L = n.sendStore, M = void 0 === L ? 1 : L, O = n.sendMarketing, N = void 0 === O ? 1 : O, E = n.sendMzhd, _ = void 0 === E ? 1 : E, G = n.skipRefresh, j = void 0 === G ? 0 : G, q = n.categoryNameSale, V = void 0 === q ? getApp().categoryNameSale : q, R = n.estimatedPriceFresh, U = void 0 === R ? 1 : R, getApp().menuOptions = {}, t.isOtherError = 0, getApp().categoryNameSale = V, !j) {
              o.next = 7;
              break
            }
            return o.abrupt("return");
          case 7:
            if (s && (B = (0, l.getUrlParam)(decodeURIComponent(s)), m = B.orderType || 1, v = B.shopId, getApp().trackEvent("qrcode_enter", {
                orderType: m
              })), t.setData({
                isLoading: !0,
                showAnimate: x
              }), b && t.closeAllWarnDialog(), w && getApp().showLoading(), t.shopId = v, t.shopId) {
              o.next = 34;
              break
            }
            return o.next = 15, getApp().getUserLocation2();
          case 15:
            if (F = o.sent, W = F.longitude, H = F.latitude, !W) {
              o.next = 33;
              break
            }
            if (0 !== getApp().globalData.isShowPrivacy && !0 !== getApp().globalData.isShowPrivacy) {
              o.next = 21;
              break
            }
            return o.abrupt("return", wx.reLaunch({
              url: "/pages/store/index"
            }));
          case 21:
            return o.next = 23, (0, c.getRecommendShopV4)({
              longitude: W,
              latitude: H
            }).catch((function(e) {
              t.dealError(e), t.shopId = void 0
            }));
          case 23:
            if ((null == (z = o.sent) || null === (J = z.data) || void 0 === J ? void 0 : J.length) > 0 && (t.shopId = z.data[0].shopId, z.data.length > 1 && t.showMultiShopConfirm({
                recommendShopLists: z.data
              })), t.shopId) {
              o.next = 29;
              break
            }
            return o.abrupt("return", wx.reLaunch({
              url: "/pages/store/index"
            }));
          case 29:
            t.setData({
              showRecommendTip: !0
            }), t.timer = setTimeout((function() {
              t.setData({
                showRecommendTip: !1
              }), clearTimeout(t.timer), t.timer = null
            }), 5e3);
          case 31:
            o.next = 34;
            break;
          case 33:
            return o.abrupt("return", wx.reLaunch({
              url: "/pages/store/index"
            }));
          case 34:
            if (h || t.shopId === t.data.selectedStore.shopId || (getApp().globalData.currentAddress = {}), Q = {
                orderType: m,
                hasAccessToken: getApp().accessToken
              }, "onemore" == i && h && (Q["currentAddress.consigneeAddressId"] = h), k && (Q.activeTab = 0), t.setData(Q), t.saleCategoryId && !k && t.getMarketingMenu(), !k) {
              o.next = 49;
              break
            }
            return o.next = 43, t.getMainData();
          case 43:
            return t.initVtabsHeight(), t.selectComponent("#vtabs").setData({
              contentScrollTop: Math.random()
            }), o.next = 47, t.getMarketingMenu();
          case 47:
            o.next = 55;
            break;
          case 49:
            if (!C) {
              o.next = 55;
              break
            }
            return o.next = 52, t.getCartData().catch(t.dealError.bind(t));
          case 52:
            K = o.sent, t.setMenuNum(null == K ? void 0 : K.data), w && wx.hideLoading();
          case 55:
            U && t.menuDiscountGoods(t._clearEstimatePrice(!0)), t.openGoodsDetail({
              productId: d,
              productName: p
            }), t.appointCategory({
              categoryNameSale: V
            }), M && (t.getStoreDetail().then((function(e) {
              var o = e.contractStatus,
                r = e.shopStatus,
                a = e.payStatus,
                n = e.operationStatus,
                s = e.licenseStatus,
                i = e.takeoutStatus,
                c = e.takeoutOperationStatus;
              return e.isOversea ? t.toStore() : (y && t.getAdInfo(), 2 == t.data.orderType && t.setData({
                showTakeoutTipsDialog: 0 === i || 1 === i && 1 === n && 2 === c
              }), 1 == o && 1 == r && 1 == a && 1 == n && 1 == s || t.data.hasAccessToken ? void 0 : t.setData({
                showOfflinePopup: 2 == n,
                showClosedPopup: 0 == n,
                showErrorPopup: 1 == n && (1 != o || 0 == s || 0 == r || 0 == a)
              }))
            })), t.getSearchHotWord()), N && t.getMarketingData(), y && (t.isRequestOrderList = 0), t.data.hasAccessToken && _ && t.getMzhdData(), "onemore" == i && t.initOneMore(m, h);
          case 63:
          case "end":
            return o.stop()
        }
      }), o)
    })))()
  },
  getMainData: function() {
    var e = this;
    return Promise.all([(0, i.getMenuList)(this.shopId, this.data.orderType), this.getCartData()]).then((function(t) {
      var o = r(t, 2),
        a = o[0].data,
        n = o[1].data;
      if (!a || !a.length) return e.setData({
        isLoading: !1,
        showErrorPopup: !0
      });
      a = (0, l.filterNull)(a), a = e.sellOutGoodsToEnd2(a), a = e.initMenu(a), e.setMenuNum(n, a), wx.hideLoading()
    })).catch(this.dealError.bind(this))
  },
  getCartData: function() {
    var e = this;
    return new Promise((function(t, o) {
      if (getApp().accessToken) {
        var r = e.shopId,
          a = e.data,
          n = a.orderType,
          s = a.currentAddress.consigneeAddressId;
        (0, i.queryCart)({
          shopId: r,
          orderType: n,
          consigneeAddressId: s,
          useProductVoucherMode: 0,
          useCouponMode: 0
        }).then(t).catch((function(e) {
          e && 401 === e.code ? t({
            data: {}
          }) : o(e)
        }))
      } else t({
        data: {}
      })
    }))
  },
  getMarketingMenu: function() {
    var e = this;
    return this.saleCategoryIdMap = {}, (0, i.getMarketingMenuList)(this.shopId, this.data.orderType).then((function(t) {
      var r = t.data;
      r = r.filter((function(t) {
        var o = t.products.filter((function(t) {
          return e.goodsIndexMap[t] && 3 !== e.getCurrentGoods(t).productStatus
        })).map((function(t) {
          return {
            productId: t,
            productIndexs: e.goodsIndexMap[t][0]
          }
        }));
        o.forEach((function(e, t) {
          e.sortIndex = t
        }));
        var r = o.filter((function(e, t) {
            return t % 2 != 0
          })),
          a = o.filter((function(e, t) {
            return t % 2 == 0
          }));
        return t.products = a.concat(r), o.length
      }));
      var a = 0,
        n = r.map((function(t, o) {
          return e.saleCategoryIdMap[o + 1] = t.saleCategoryId, o < 2 && e.saleCategoryId === t.saleCategoryId && (a = o + 1), t.categoryIcon ? {
            path: t.categoryIcon,
            type: "img",
            name: t.categoryName
          } : t.categoryName
        })).slice(0, 2);
      getApp().globalData.userInfo.mobilePhone && n.push("我的常点"), e.setData({
        marketingMenuList: r.slice(0, 2),
        menuTabs: [w].concat(o(n)),
        activeTab: a
      }, (function() {
        getApp().saleCategoryId = ""
      }))
    }))
  },
  getStoreDetail: function() {
    var e = this;
    return n(a().mark((function t() {
      var o, r, n, s, i, d;
      return a().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.next = 2, (0, c.getShopInfo)(e.shopId);
          case 2:
            return o = t.sent, r = o.data, n = void 0 === r ? {} : r, t.prev = 5, t.next = 8, getApp().getUserLocation2(n.cleanVersionFlag);
          case 8:
            s = t.sent, i = s.longitude, ((d = s.latitude) || i) && (n.distance = (0, l.getDistance)(n.latitude, n.longitude, d, i)), getApp().isGuide = n.cleanVersionFlag;
          case 13:
            return t.prev = 13, t.abrupt("return", getApp().globalData.selectedStore = n || {});
          case 16:
          case "end":
            return t.stop()
        }
      }), t, null, [
        [5, , 13, 16]
      ])
    })))()
  },
  getAdInfo: function() {
    var e = this,
      t = this.data.selectedStore,
      o = t.shopId,
      r = t.regionCode,
      a = this.data.orderType;
    (0, d.getAdList)({
      adPlaceCodeList: ["WechartMiniOrderBanner", "WechartMiniOrderPopup", "WechatMiniOrderIcon", "WechatMiniOrderRecommend"],
      shopId: o,
      areaId: r,
      orderType: a
    }).then((function(t) {
      var o, r = t.map((function(e) {
          return [e.adPlaceCode, e.adInfoList || []]
        })),
        a = Object.fromEntries(r),
        n = a.WechartMiniOrderBanner,
        s = void 0 === n ? [] : n,
        i = a.WechartMiniOrderPopup,
        c = void 0 === i ? [] : i,
        d = a.WechatMiniOrderIcon,
        u = a.WechatMiniOrderRecommend,
        p = void 0 === u ? [] : u,
        h = {
          swiperList: s.length ? s : v.default.menu_placeholder,
          recommendAdList: p
        };
      getApp().globalData.userInfo.mobilePhone ? h.popupAdList = c : null !== (o = getApp().configData.newMemberPopUpImg) && void 0 !== o && o.miniOrderPageImgUrl && (h.guideLoginAdList = [{
        adImg: getApp().configData.newMemberPopUpImg.miniOrderPageImgUrl,
        dateType: 2,
        showNum: 2
      }]), h.suspensionAdList = d, e.setData(h, (function() {
        e.initVtabsHeight()
      }))
    })).catch((function() {
      e.initVtabsHeight()
    }))
  },
  getMarketingData: function() {
    var e = this;
    return n(a().mark((function t() {
      return a().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.abrupt("return", (0, i.getMarketingInfo)(e.shopId, e.data.orderType).then((function(t) {
              var o = t.data;
              e.setData({
                activites: o || []
              })
            })));
          case 1:
          case "end":
            return t.stop()
        }
      }), t)
    })))()
  },
  getMzhdData: function() {
    var e = this;
    (0, d.getMzhdInfo)([this.shopId]).then((function(t) {
      var o = t.data;
      o && o[0] ? e.setData({
        mzhdData: o[0]
      }) : e.setData({
        mzhdData: {}
      })
    }))
  },
  initOneMore: function(e, t) {
    var o = this,
      r = {},
      a = JSON.parse(getApp().getStorageSync("invalidProductList")).map((function(e) {
        return e.productStatusText = A[e.productStatus], e
      }));
    getApp().removeStorageSync("invalidProductList"), a.length ? (r.invalidProductList = a, r.isShowAbnormalGoods = !0) : r.isShowCartDetail = !0, 2 == e && t ? (0, p.getAddressInfo)(t).then((function(e) {
      var t = e.data;
      t && (r.currentAddress = t, o.setData(r), getApp().globalData.currentAddress = t)
    })) : this.setData(r)
  },
  setMenuNum: function() {
    var e = this,
      t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      o = arguments.length > 1 ? arguments[1] : void 0,
      r = {
        isLoading: !1,
        cartData: this.formatCart(t)
      };
    if (this.isAlreadyShowSuspensionBanner = this.isAlreadyShowSuspensionBanner || t.productAmount > 0, o ? r.vtabs = o : o = this.data.vtabs, o.forEach((function(e, t) {
        e.products.forEach((function(e, o) {
          e.addNum > 0 && (r["vtabs[".concat(t, "].products[").concat(o, "].addNum")] = 0)
        }))
      })), !t.products) return this.setData(r);
    t.products.forEach((function(t) {
      var o = t.productId,
        a = t.productAmount,
        n = e.goodsIndexMap[o];
      null == n || n.forEach((function(e) {
        ["vtabs[".concat(e[0], "].products[").concat(e[1], "].addNum")].forEach((function(e) {
          Object.prototype.hasOwnProperty.call(r, e) ? r[e] += a : r[e] = a
        }))
      }))
    })), this.setData(r)
  },
  initMenu: function() {
    var e = this,
      t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return this.packIdList = [], this.cheapPack = null, this.goodsIndexMap = {}, this.goodsNameMap = {}, this.categoryIndex = {}, t.forEach((function(t, o) {
      t.products.forEach((function(t, r) {
        var a = t.detailType,
          n = t.productSpecs,
          s = t.productAttrs,
          i = t.cups,
          c = t.productPrice,
          d = t.productId,
          u = t.productName,
          p = t.productType,
          h = t.giftPack,
          g = t.combos; + a && (n.forEach((function(e) {
          var t = e.minSelect,
            o = e.maxSelect,
            r = e.specs;
          1 == o && 1 == t ? e.selectSpec = 0 : 1 == o && 0 == t ? e.selectSpec = "" : r && r.length && r.forEach((function(e) {
            e.addNum = 0
          }))
        })), s.forEach((function(e) {
          e.selectAttr = 0
        }))), Object.assign(t, {
          addNum: 0,
          selectCup: 0,
          splitSprice: (0, l.splitSprice)(c),
          hasMorePrice: i.length || n.length || 2 == t.productType || 4 == t.productType,
          disableClassName: (0, f.getDisableClassName)(t, e.data.orderType),
          currentShopId: e.shopId,
          currentOrderType: e.data.orderType
        }), Object.prototype.hasOwnProperty.call(e.goodsIndexMap, d) ? e.goodsIndexMap[d].push([o, r]) : e.goodsIndexMap[d] = [
          [o, r]
        ], Object.prototype.hasOwnProperty.call(e.goodsNameMap, u) || (e.goodsNameMap[u] = d), 3 === p && (t.disableClassName.includes("no-out") || t.disableClassName.includes("no-in") || e.packIdList.includes(d) || (e.packIdList.push(d), (!e.cheapPack || e.cheapPack.productPrice > c || e.cheapPack.productPrice === c && e.cheapPack.maxDiscount < h.giftPackMaxDiscountAmountShow) && (e.cheapPack = {
          productId: d,
          productPrice: c,
          maxDiscount: h.giftPackMaxDiscountAmountShow
        }))), e.transImage(t), g && g.forEach((function(t) {
          return e.transImage(t)
        }))
      })), Object.prototype.hasOwnProperty.call(e.categoryIndex, t.categoryNameSale) || (e.categoryIndex[t.categoryNameSale] = o)
    })), t
  },
  getCurrentGoods: function(e) {
    if (!e || !this.goodsIndexMap) return {};
    var t = this.goodsIndexMap[e];
    if (t) {
      var o = r(t, 1),
        a = r(o[0], 2),
        n = a[0],
        s = a[1];
      return this.data.vtabs[n].products[s]
    }
    return {}
  },
  checkGoodsStatus: function(e) {
    return 3 == e.productStatus ? (getApp().showToast("商品已售磬"), !1) : !e.disableClassName
  },
  openGoodsDetail: function(e) {
    var t, o, r = e.productId || (null === (t = e.detail) || void 0 === t ? void 0 : t.goodsId),
      a = e.productName || (null === (o = e.detail) || void 0 === o ? void 0 : o.productName);
    if ((r || a) && this.goodsIndexMap && !this.data.showMultiShopPopup && !(this.data.showErrorPopup || this.data.showOfflinePopup || this.data.showClosedPopup)) {
      if (getApp().trackEvent("shop_product"), a && !r && (r = this.goodsNameMap[a], getApp().productName = null), !this.goodsIndexMap[r]) return getApp().showToast("商品已下架或不在当前门店菜单内", null, 2e3);
      var n = this.getCurrentGoods(r),
        s = n.productType;
      this.checkGoodsStatus(n) && (3 == s ? this.toPackDetail({
        goodsId: r
      }) : 2 == s || 4 == s ? this.toCombo(n) : this.toGoodsDetail(n))
    }
  },
  toggleType: function(e) {
    var t = this;
    return n(a().mark((function o() {
      var r, n, s, i;
      return a().wrap((function(o) {
        for (;;) switch (o.prev = o.next) {
          case 0:
            if (r = e.detail.target || e.target, n = r.dataset.orderType, getApp().trackEvent(1 == n ? "shop_takeout" : "shop_deliver"), t.setData({
                showTakeoutTipsDialog: !1
              }), s = t.data.orderType, (i = n) !== s) {
              o.next = 7;
              break
            }
            return o.abrupt("return");
          case 7:
            if (2 !== i || t.data.selectedStore.takeoutStatus) {
              o.next = 9;
              break
            }
            return o.abrupt("return", getApp().showToast("门店暂未开通".concat(t.saleOutText, "业务")));
          case 9:
            if (1 != s) {
              o.next = 14;
              break
            }
            if (2 !== t.data.selectedStore.takeoutOperationStatus) {
              o.next = 12;
              break
            }
            return o.abrupt("return", getApp().showToast("".concat(t.saleOutText, "已置休")));
          case 12:
            return o.next = 14, getApp().checkPhone();
          case 14:
            t.refreshPage({
              orderType: i,
              sendAds: 1,
              showToast: 1,
              showAnimate: 0
            });
          case 15:
          case "end":
            return o.stop()
        }
      }), o)
    })))()
  },
  clickFavorite: (0, l.debounce)((function() {
    var e = this;
    if (!getApp().accessToken) return getApp().navigate("/pages/register/index");
    var t = this.data.selectedStore;
    (0, c.changeShopFavorite)({
      favorited: !t.hasCollectShop,
      shopId: t.shopId
    }).then((function(o) {
      o.data && (getApp().showToast("".concat(t.hasCollectShop ? "已取消收藏" : "收藏成功")), e.setData({
        "selectedStore.hasCollectShop": !t.hasCollectShop
      }))
    })).catch((function(e) {
      getApp().showToast(e && e.msg || "网络异常")
    }))
  }), 500),
  confirmClear: function() {
    var e = this;
    return n(a().mark((function t() {
      var o;
      return a().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return e.closeConfirmDialog(), getApp().showLoading(), t.next = 4, (0, i.clearCart)(e.shopId, e.data.orderType).catch(e.dealError.bind(e));
          case 4:
            return t.next = 6, e.getCartData().catch(e.dealError.bind(e));
          case 6:
            o = t.sent, e.setMenuNum(null == o ? void 0 : o.data), wx.hideLoading(), e.closeCartDetail();
          case 10:
          case "end":
            return t.stop()
        }
      }), t)
    })))()
  },
  addGoods: function(e) {
    var t = e.detail.goodsId,
      o = this.getCurrentGoods(t);
    this.checkGoodsStatus(o) && (getApp().trackEvent("shop_add"), +o.detailType || 2 == o.productType || 4 == o.productType ? this.openGoodsDetail({
      productId: t
    }) : this.updateGoods(o))
  },
  removeGoods: function(e) {
    var t = e.detail.goodsId,
      o = this.getCurrentGoods(t);
    getApp().trackEvent("shop_reduction"), +o.detailType || 2 == o.productType || 4 == o.productType ? this.setData({
      isShowCartDetail: !0
    }) : this.updateGoods(o, -1)
  },
  cartAddGoods: function(e) {
    var t = e.currentTarget.dataset.index;
    this.updateGoods(this.data.cartData.products[t])
  },
  cartRemoveGoods: function(e) {
    var t = e.currentTarget.dataset.index;
    this.updateGoods(this.data.cartData.products[t], -1)
  },
  dialogUpdateGoods: function(e) {
    var t = e.detail,
      o = t.goods,
      r = t.productAmount,
      a = t.action;
    this.updateGoodsOrBuyNow({
      goods: o,
      productAmount: r,
      action: a
    })
  },
  updateGoodsOrBuyNow: function(e) {
    var t = this;
    return n(a().mark((function o() {
      var r, n, s, i, c, d;
      return a().wrap((function(o) {
        for (;;) switch (o.prev = o.next) {
          case 0:
            if (r = e.goods, n = e.productAmount, "buyNow" !== (s = e.action)) {
              o.next = 11;
              break
            }
            return o.next = 4, t.checkGuide();
          case 4:
            r.addNum = n, t.products = [(0, f.menuToCartGoods)(r)], t.source = s, r.exchangeMarketingId && (i = (0, f.getSelectedProductVoucherList)([r]), c = i.selectedProductVoucherList, t._cartData.selectedProductVoucherList = c, t._cartData.exchangeMarketingId = r.exchangeMarketingId), d = setTimeout((function() {
              t.toOrder(), clearTimeout(d)
            }), 500), o.next = 12;
            break;
          case 11:
            t.updateGoods(r, n);
          case 12:
          case "end":
            return o.stop()
        }
      }), o)
    })))()
  },
  updateGoods: function() {
    var e = arguments,
      o = this;
    return n(a().mark((function r() {
      var n, s, i, c, d, u, p, h, l, g, m, v, I, w, A, x, T, b, D, y, S, C, P, k, L, M, O, N, E, _, G, j, q, V, R, U;
      return a().wrap((function(r) {
        for (;;) switch (r.prev = r.next) {
          case 0:
            return n = e.length > 0 && void 0 !== e[0] ? e[0] : {}, s = e.length > 1 && void 0 !== e[1] ? e[1] : 1, r.next = 4, o.checkGuide();
          case 4:
            if (i = n.productId, c = n.cups, d = n.selectCup, u = n.productAttrs, p = void 0 === u ? [] : u, h = n.productSpecs, l = void 0 === h ? [] : h, g = n.productCouponId, m = n.cupId, v = n.attrs, I = n.specs, w = n.couponId, A = n.modifiedTime, x = n.productType, T = n.combos, b = n.selectedComboGoodsByFrontCart, D = n.comboProductDetail, y = n.productName, S = n.productLogo, C = n.productPrice, P = n.groupLink, k = o.shopId, L = o.goodsIndexMap, M = o.data, O = M.vtabs, N = M.cartData, E = M.currentAddress, _ = E.consigneeAddressId, G = E.customerId, j = M.orderType, q = L[i], i) {
              r.next = 10;
              break
            }
            return r.abrupt("return");
          case 10:
            if (!(1 == s && N.productAmount && N.productAmount > N.maxAddProductNum - 1)) {
              r.next = 12;
              break
            }
            return r.abrupt("return", getApp().showToast("超出最大加购数量"));
          case 12:
            return r.next = 14, (0, f.checkGroupAndWelfare)(n);
          case 14:
            if (r.sent) {
              r.next = 18;
              break
            }
            return o.selectComponent("#joinGroupGuide").openWelfareDialog(P), r.abrupt("return");
          case 18:
            V = {
              shopId: k,
              productId: i,
              productName: y,
              productLogo: S,
              productPrice: C,
              productAmount: s,
              productType: x,
              productCouponId: g || w,
              modifiedTime: A,
              consigneeAddressId: _,
              customerId: G,
              cupId: m,
              orderType: N.orderType || j,
              useProductVoucherMode: 0,
              useCouponMode: 0
            }, getApp().showLoading(), c ? (R = {}, 2 == x ? R.comboProductDetail = T.map((function(e) {
              var o = e.productId,
                r = e.productName,
                a = e.productNum,
                n = e.cups,
                s = e.productSpecs,
                i = e.productAttrs;
              return t({
                productId: o,
                productName: r,
                productAmount: a
              }, (0, f.createCartData)(s, i, n[0]))
            })) : 4 == x ? R.comboProductDetail = b : R = (0, f.createCartData)(l, p, c[d]), Object.assign(V, R)) : (U = {
              modifiedTime: O[q[0][0]].products[q[0][1]].modifiedTime || ""
            }, 2 == x || 4 == x ? U.comboProductDetail = D : (U.specs = I, U.attrs = v), Object.assign(V, U)), o.updateCart(V).then((function(e) {
              var t = e.data;
              wx.hideLoading();
              var r = {
                  cartData: o.formatCart(t)
                },
                a = t.errorCode;
              o.isAlreadyShowSuspensionBanner = !0, null == q || q.forEach((function(e) {
                var t = O[e[0]].products[e[1]].addNum;
                r["vtabs[".concat(e[0], "].products[").concat(e[1], "].addNum")] = Math.max(t + s, 0)
              })), o.setData(r), c || t && t.productAmount || o.closeCartDetail(), 8101 === a || 8103 === a ? getApp().showToast("超出购买上限，\n超出部分已恢复原价") : 8102 === a && getApp().showToast("活动最大参与数量已满，\n恢复原价")
            })).catch(o.dealError.bind(o));
          case 22:
          case "end":
            return r.stop()
        }
      }), r)
    })))()
  },
  updateCart: function(e) {
    return this.dealCartToParams(e), (0, i.updateCart)(e)
  },
  dealCartToParams: function(e) {
    var t = this,
      o = e.specs,
      r = e.attrs,
      a = e.comboProductDetail;
    o && o.length && (e.specIds = o.map((function(e) {
      return {
        specId: e.specId,
        selectAmount: e.selectAmount
      }
    })), delete e.specs), r && r.length && (e.attributeIds = r.map((function(e) {
      return e.attributeId
    })), delete e.attrs), a && a.length && a.forEach((function(e) {
      t.dealCartToParams(e)
    })), delete e.cupName, delete e.cupPrice, delete e.productName, delete e.productLogo, delete e.productPrice, delete e.productType
  },
  formatCart: function(e) {
    var t = e.price,
      o = e.priceNoDeliveryFee,
      r = e.products;
    if (!r || !r.length) return e;
    e.splitSprice = (0, l.splitSprice)(2 == this.data.orderType ? o || 0 : t);
    for (var a = 0; a < r.length; a++) {
      var n = r[a],
        s = n.cupName,
        i = n.specs,
        c = n.attrs,
        d = n.comboProductDetail;
      d && d.length ? r[a].selectNames = d.reduce((function(e, t) {
        var o = t.productName,
          r = t.productAmount,
          a = t.cupName,
          n = t.specs,
          s = t.attrs,
          i = (0, f.generateSelectName)(a, n, s);
        return e + "".concat(o).concat(i ? "（".concat(i, "）") : "", " x ").concat(r, "\n")
      }), "") : r[a].selectNames = (0, f.generateSelectName)(s, i, c)
    }
    return e
  },
  generateIds: function(e, t, o, r) {
    var a = [e || "", (t || []).map((function(e) {
      return "".concat(e.specId, "_").concat(e.addNum || e.selectAmount || 1)
    })).join("/") || "", (o || []).map((function(e) {
      return e.attributeId || e
    })).join("/") || ""].join(",");
    return (0, g.default)("".concat(r, "_").concat(a))
  },
  checkGuide: function() {
    var e = this;
    return n(a().mark((function t() {
      return a().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.abrupt("return", new Promise(function() {
              var t = n(a().mark((function t(o) {
                return a().wrap((function(t) {
                  for (;;) switch (t.prev = t.next) {
                    case 0:
                      if (getApp().isGuide || e.data.selectedStore.cleanVersionFlag) {
                        t.next = 6;
                        break
                      }
                      return getApp().isGuide = !0, t.next = 4, getApp().checkPhone();
                    case 4:
                      t.next = 11;
                      break;
                    case 6:
                      if (getApp().accessToken) {
                        t.next = 11;
                        break
                      }
                      return t.next = 9, getApp().getAuthCode(!0);
                    case 9:
                      return t.next = 11, (0, s.regByUnionid)();
                    case 11:
                      o();
                    case 12:
                    case "end":
                      return t.stop()
                  }
                }), t)
              })));
              return function(e) {
                return t.apply(this, arguments)
              }
            }()));
          case 1:
          case "end":
            return t.stop()
        }
      }), t)
    })))()
  },
  showCartDetail: function() {
    if (this.data.cartData.productAmount) {
      var e = this.data.isShowCartDetail;
      this.setData({
        isShowCartDetail: !e
      })
    }
  },
  closeCartDetail: function() {
    this.setData({
      isShowCartDetail: !1
    })
  },
  showConfirmDialog: function() {
    this.setData({
      isShowConfirmDialog: !0
    })
  },
  closeConfirmDialog: function() {
    this.setData({
      isShowConfirmDialog: !1,
      isShowFarDistanceConfirm: !1
    })
  },
  closeConfirmShop: function() {
    this.closeConfirmDialog(), this.toStore()
  },
  closeAllWarnDialog: function() {
    this.selectComponent("#jointOrderDialog").closeDialog(), this.setData({
      isShowConfirmDialog: !1,
      isShowFarDistanceConfirm: !1,
      showErrorPopup: !1,
      showOfflinePopup: !1,
      showClosedPopup: !1,
      isShowCartDetail: !1,
      showTakeoutTipsDialog: !1,
      isShowAbnormalGoods: !1,
      showMultiShopPopup: !1
    })
  },
  closeAbnormalGoodsDialog: function() {
    this.setData({
      isShowAbnormalGoods: !1
    })
  },
  showMultiShopConfirm: function(e) {
    this.setData(t({
      showMultiShopPopup: !0
    }, e))
  },
  closeMultiShopConfirm: function() {
    this.setData({
      showMultiShopPopup: !1
    }), this.openGoodsDetail({
      productName: getApp().productName
    }), this.appointCategory({
      categoryNameSale: getApp().categoryNameSale
    })
  },
  showLoginPopup: function() {
    getApp().globalData.userInfo.mobilePhone || this.setData({
      showLogin: !0,
      showLoginCom: !0
    })
  },
  closeLoginPopup: function() {
    var e = this;
    this.setData({
      showLogin: !1
    });
    var t = setTimeout((function() {
      clearTimeout(t), e.setData({
        showLoginCom: !1
      })
    }), 1e3);
    this.data.hasAccessToken !== getApp().accessToken && this.menuDiscountGoods()
  },
  toggleFoldStatus: function(t) {
    var o = this,
      r = t.currentTarget.dataset.categoryindex,
      a = t.currentTarget.dataset.foldsaleoutgoods;
    this.setData(e({}, "vtabs[".concat(r, "].foldSaleOutGoods"), !a), (function() {
      o.initVtabsHeight()
    }))
  },
  toOrder: function() {
    getApp().trackEvent("shop_pay"), this.confirmToOrder()
  },
  confirmToOrder: function() {
    var e = this;
    return n(a().mark((function t() {
      var o, r, n, s, i, c;
      return a().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            if (!e.lockToOrder) {
              t.next = 2;
              break
            }
            return t.abrupt("return");
          case 2:
            return e.lockToOrder = 1, e.setData({
              isShowFarDistanceConfirm: !1,
              isShowCartDetail: !1
            }), getApp().cartData = Object.assign(e.data.cartData, e._cartData), "buyNow" === e.source && (getApp().cartData.products = e.products, getApp().cartData.shopId || (getApp().cartData.shopId = e.shopId, getApp().cartData.orderType = e.data.orderType)), o = 1 == e.data.orderType ? "自提" : 1 == +e.data.selectedStore.deliveryType ? "自配送" : "三方配送", t.next = 9, (0, f.insertSubscribeMessage)({
              key: o
            });
          case 9:
            e.cheapPack ? (n = e.cheapPack, s = n.maxDiscount, i = n.productPrice, c = n.productId, r = "/pages/order_detail/cart/index?source=".concat(e.source || "", "&maxDiscount=").concat(s, "&productPrice=").concat(i, "&productId=").concat(c, "&productIdList=").concat(JSON.stringify(e.packIdList))) : r = "/pages/order_detail/cart/index?source=".concat(e.source || ""), e.source = "", wx.navigateTo({
              url: r
            });
          case 12:
          case "end":
            return t.stop()
        }
      }), t)
    })))()
  },
  toPackDetail: function(e) {
    var t = e.goodsId,
      o = this.getCurrentGoods(t);
    this.checkGoodsStatus(o) && wx.navigateTo({
      url: "/pages/coupon/pack-list/index?shopId=".concat(this.shopId, "&productId=").concat(t, "&productIdList=").concat(JSON.stringify(this.packIdList))
    })
  },
  toStore: function() {
    getApp().trackEvent("shop_name"), 1 == this.data.orderType ? wx.navigateTo({
      url: "/pages/store/index"
    }) : wx.navigateTo({
      url: "/pages/coupon/store/index?pageType=takeout"
    })
  },
  toAddress: function() {
    wx.navigateTo({
      url: "/pages/customer-center/address-list/index?shopId=".concat(this.shopId, "&clickAndBack=1")
    })
  },
  toStoreOrAddress: function() {
    this.data.currentAddress.address ? this.toStore() : this.toAddress()
  },
  toSearch: function() {
    var e, t = this;
    getApp().trackEvent("search"), wx.navigateTo({
      url: "/pages/goods-search/index",
      events: {
        dataFromSearch: (e = n(a().mark((function e(o) {
          var r, n, s, i;
          return a().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                r = o.productId, n = o.productName, s = o.categoryNameSale, i = setTimeout((function() {
                  t.openGoodsDetail({
                    productId: r,
                    productName: n
                  }), t.appointCategory({
                    categoryNameSale: s
                  }), clearTimeout(i)
                }), 600);
              case 2:
              case "end":
                return e.stop()
            }
          }), e)
        }))), function(t) {
          return e.apply(this, arguments)
        })
      },
      success: function(e) {
        e.eventChannel.emit("sendDataToOpenPage", {
          data: t.data.vtabs,
          shopId: t.shopId,
          suggestList: t.suggestWordsList
        })
      }
    })
  },
  toGoodsDetail: function(e) {
    var t = this;
    wx.navigateTo({
      url: "/pages/goods/index",
      events: {
        goodsToMenu: function(e) {
          var o = e.goods,
            r = e.productAmount,
            a = e.action,
            n = e.productExchangeDetail;
          n && (o.productVoucherList = [n], t._cartData.exchangeMarketingCouponName = n.couponName), t.updateGoodsOrBuyNow({
            goods: o,
            productAmount: r,
            action: a
          })
        }
      },
      success: function(o) {
        o.eventChannel.emit("menuToGoods", {
          goods: e,
          shopId: t.shopId,
          orderType: t.data.orderType,
          useBuyNow: !e.singleNotDelivery
        })
      }
    })
  },
  toCombo: function(e) {
    var t = this;
    wx.navigateTo({
      url: 4 == e.productType ? "/pages/combo-diy/index" : "/pages/combo/index",
      events: {
        comboToMenu: function(e) {
          var o = e.goods,
            r = e.productAmount,
            a = e.action;
          t.updateGoodsOrBuyNow({
            goods: o,
            productAmount: r,
            action: a
          })
        }
      },
      success: function(o) {
        o.eventChannel.emit("menuToCombo", {
          goods: e,
          shopId: t.shopId,
          orderType: t.data.orderType,
          isJointOrder: !1
        })
      }
    })
  },
  toFoodSafety: function() {
    getApp().navigate("".concat(m.baseUrl, "/#/preview/foodSafety?shopId=").concat(this.shopId))
  },
  toJointOrder: function() {
    var e = this;
    return n(a().mark((function t() {
      var o, r, n, s, i, c, d, p, h;
      return a().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return getApp().trackEvent("shop_group"), o = e.shopId, r = e.data, n = r.orderType, s = r.currentAddress.consigneeAddressId, t.next = 4, getApp().checkPhone("?returnUrl=/pages/activity/joint-order/index&orderType=".concat(n, "&consigneeAddressId=").concat(s, "&shopId=").concat(o));
          case 4:
            return getApp().showLoading(), t.prev = 5, t.next = 8, (0, u.queryExistJointOrder)();
          case 8:
            i = t.sent, c = i.data, wx.hideLoading(), c ? (d = c.role, p = c.cartId, 1 != c.cartStatus ? wx.navigateTo({
              url: "/pages/activity/joint-order/index?cartId=".concat(p)
            }) : (e.currentCartId = p, e.setData({
              jointRole: d
            }, (function() {
              e.selectComponent("#jointOrderDialog").openDialog()
            })))) : e.toCreateJoint(), t.next = 18;
            break;
          case 14:
            t.prev = 14, t.t0 = t.catch(5), h = t.t0.msg, getApp().showToast(h || "网络异常，请稍后重试 ");
          case 18:
          case "end":
            return t.stop()
        }
      }), t, null, [
        [5, 14]
      ])
    })))()
  },
  toCurrentJoint: function() {
    this.currentCartId && wx.navigateTo({
      url: "/pages/activity/joint-order/index?cartId=".concat(this.currentCartId)
    })
  },
  toCreateJoint: function() {
    getApp().showLoading();
    var e = this.shopId,
      t = this.data,
      o = t.orderType,
      r = t.currentAddress.consigneeAddressId;
    (0, u.createJointOrder)({
      orderType: o,
      shopId: e,
      consigneeAddressId: r
    }).then((function(e) {
      var t = e.data.cartId;
      wx.hideLoading(), t && wx.navigateTo({
        url: "/pages/activity/joint-order/index?cartId=".concat(t)
      })
    })).catch(this.dealError.bind(this))
  },
  popupChangeStore: function() {
    this.setData({
      showMultiShopPopup: !1
    }), this.toStore()
  },
  toLogin: function() {
    this.showLoginPopup()
  },
  sellOutGoodsToEnd2: function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
      t = 3,
      o = 5,
      r = 3;
    return (e = e.filter((function(e) {
      e.products = (0, f.sellOutGoodsToEnd)(e.products);
      var a = e.products.filter((function(e) {
          return e.productStatus == r
        })),
        n = e.products.length - a.length;
      return 1 == e.pullType && n >= t && (e.products = e.products.filter((function(e, t) {
        return t < o
      }))), e.isExistSaleOut = a.length > 0, e.isAllSaleOut = a.length === e.products.length, e.foldSaleOutGoods = !0, 1 != e.pullType || n >= t
    }))).sort((function(e, t) {
      return e.isAllSaleOut && !t.isAllSaleOut ? 1 : !e.isAllSaleOut && t.isAllSaleOut ? -1 : 0
    })), e
  },
  transImage: function(e) {
    e.productLogoOriginal = e.productLogo.split("?")[0]
  },
  dealError: function(e) {
    var t = this;
    console.log(e);
    var o = e && e.code;
    wx.hideLoading();
    var r = {
        8002: "商品信息变更，\n请重新添加",
        8005: "商品不存在，\n无法选购此商品",
        8006: "商品不存在，\n无法选购此商品",
        8007: "商品已售罄，\n请选择其他商品",
        8008: "超过最大加购数量",
        8110: "门店未设置配送信息",
        8010: "当前场景不能加购此商品，\n请选择其他商品"
      },
      s = {
        6107: "门店".concat(this.saleOutText, "已关闭"),
        6210: "".concat(this.saleOutText, "已置休"),
        6211: "门店".concat(this.saleOutText, "未开启")
      };
    if (r[o] || s[o]) {
      this.setData({
        isLoading: !1
      });
      if (s[o] && [1011, 1012, 1013].includes(wx.getLaunchOptionsSync().scene)) return;
      getApp().showToast(r[o] || s[o], n(a().mark((function e() {
        return a().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (e.t0 = r[o], !e.t0) {
                e.next = 4;
                break
              }
              return e.next = 4, t.getMainData();
            case 4:
              t.menuDiscountGoods();
            case 5:
            case "end":
              return e.stop()
          }
        }), e)
      }))))
    } else [6101, 6102, 6103, 6104, 6105, 6106, 6109, 6110, 6111].includes(o) ? this.setData({
      isLoading: !1,
      showOfflinePopup: 6104 == o,
      showClosedPopup: 6103 == o,
      showErrorPopup: ![6103, 6104].includes(o)
    }) : 5012 != o && (this.isOtherError = 1, getApp().showToast(e && e.msg || "网络异常，请稍后重试"))
  },
  advertiseTap: function(e) {
    var t = e.currentTarget.dataset.url;
    t && (t.startsWith("thirdMini://") || (t = (0, l.updUrlParam)(t, "shopCode", this.data.selectedStore.shopCode)), getApp().navigate(t))
  },
  initVtabsHeight: function() {
    var e = this;
    return n(a().mark((function t() {
      var o, r, n;
      return a().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            if (!e.data.vtabs.length) {
              t.next = 11;
              break
            }
            return clearTimeout(e.timeout), t.next = 4, e.selectComponent("#vtabs").initHeightRecords();
          case 4:
            o = t.sent, r = o.top, e.vtabsTop = r || 0, wx.createSelectorQuery().select("#pageTab").boundingClientRect((function(t) {
              if (t && t.bottom) {
                var o = 8;
                e.data._jointOrderConfig.open && e.data._jointOrderConfig.guideImageUrl && (o += 64), e.data.swiperList.length && (o += 146), e.setData({
                  rightsBarTop: "calc(".concat(t.bottom, "px + ").concat((100 * o / 375).toFixed(2), "vw)")
                }), e.timer = setTimeout((function() {
                  e.setData({
                    showRightsBarTitle: !1
                  })
                }), 2e3)
              }
            })).exec(), n = setTimeout((function() {
              e.appointCategory({
                categoryNameSale: getApp().categoryNameSale
              }), clearTimeout(n)
            }), 1e3), t.next = 12;
            break;
          case 11:
            e.timeout = setTimeout((function() {
              e.initVtabsHeight(), clearTimeout(e.timeout)
            }), 150);
          case 12:
          case "end":
            return t.stop()
        }
      }), t)
    })))()
  },
  showMoreView: function(e) {
    this.setData({
      curViewShowIndex: e.detail.index
    })
  },
  appointCategory: function(e) {
    var t = this,
      o = e.categoryNameSale,
      r = this.selectComponent("#vtabs");
    o && r._heightRecords && 0 !== r._heightRecords.length && this.setData({
      activeTab: 0
    }, (function() {
      var e = t.categoryIndex[o];
      r.handleTabClick({
        currentTarget: {
          dataset: {
            index: e
          }
        }
      }, !0), getApp().categoryNameSale = null
    }))
  },
  appointTab: function(e) {
    var t = this;
    return n(a().mark((function o() {
      var r;
      return a().wrap((function(o) {
        for (;;) switch (o.prev = o.next) {
          case 0:
            if ((r = e.saleCategoryId) && t.saleCategoryId !== r) {
              o.next = 3;
              break
            }
            return o.abrupt("return");
          case 3:
            return t.saleCategoryId = r, o.next = 6, t.getMarketingMenu();
          case 6:
          case "end":
            return o.stop()
        }
      }), o)
    })))()
  },
  contentScroll: (0, l.debounceDouble)((function() {
    this.setData({
      suspensionFold: this.isExecuted = !this.isExecuted
    })
  }), 500, !0),
  shopTap: function(e) {
    var t = this,
      o = e.detail;
    o.shopId && o.shopId != this.shopId ? this.refreshPage({
      shopId: o.shopId,
      sendAds: 1
    }) : this.setData({
      showMultiShopPopup: !1
    }, (function() {
      t.openGoodsDetail({
        productName: getApp().productName
      })
    }))
  },
  _suspensionBannerStartTimingFun: function() {
    var e = this;
    this.isAlreadyShowSuspensionBanner || (clearTimeout(this.timer_recommend_goods), this.timer_recommend_goods = null, this.timer_recommend_goods = setTimeout((function() {
      e.setData({
        timeFiveSecond: !0
      }, (function() {
        e.isAlreadyShowSuspensionBanner = !0
      }))
    }), 2e4))
  },
  clearRecommendTimer: function(e) {
    e && clearTimeout(e), e = null
  },
  onChange: function(e) {
    var t = e.detail.index;
    this.saleCategoryIdMap[t] ? this.saleCategoryId = this.saleCategoryIdMap[t] : this.saleCategoryId = "";
    var o = {
      activeTab: t
    };
    this.setData(o)
  },
  onSwiperChange: function(e) {
    var t = e.detail.current,
      o = {
        activeTab: t
      },
      r = this.data.marketingMenuList.length + 1;
    t > 0 && t < r && !this.data.marketingMenuList[t - 1].loaded && (o["marketingMenuList[".concat(t - 1, "].loaded")] = 1), this.setData(o), t === r && this.getUserPreference();
    var a = "string" == typeof this.data.menuTabs[t] ? this.data.menuTabs[t] : this.data.menuTabs[t].name;
    getApp().trackEvent("menu_tab_click", {
      marketingMenuTabName: a
    })
  },
  getJointOrderConfig: function() {
    var e = this,
      t = getApp().globalData.jointOrderConfig;
    t.guideImageUrl ? (this.setData({
      _jointOrderConfig: {
        guideImageUrl: t.guideImageUrl,
        open: t.open
      }
    }), this.initVtabsHeight()) : (0, u.getJointOrderConfig)().then((function(t) {
      var o = t.data;
      o && (e.setData({
        _jointOrderConfig: {
          guideImageUrl: o.guideImageUrl,
          open: o.open
        }
      }), getApp().globalData.jointOrderConfig = o, e.initVtabsHeight())
    }))
  },
  getUserPreference: function() {
    var e = this;
    return n(a().mark((function o() {
      var r, n, s, i;
      return a().wrap((function(o) {
        for (;;) switch (o.prev = o.next) {
          case 0:
            return r = {}, e.isRequestOrderList || e.onceRequestPreference(), o.next = 4, (0, h.getUserCollect)();
          case 4:
            n = o.sent, s = n.data, i = void 0 === s ? [] : s, r.collectList = e._menuToCollectProduct(i), e.setData(t(t({}, r), {}, {
              showUserPreference: !0
            }));
          case 9:
          case "end":
            return o.stop()
        }
      }), o)
    })))()
  },
  onceRequestPreference: function() {
    var e = this;
    getApp().showLoading(), (0, h.getOrderList)({
      page: 1,
      type: 2,
      isRefund: 0,
      noOrderSourceList: [1, 4],
      payStatus: 1,
      orderTypeList: [1, 2]
    }).then((function(t) {
      var o = {},
        r = t.data.list,
        a = (void 0 === r ? [] : r).map((function(e) {
          var t = e.orderSource,
            o = e.shopId,
            r = e.orderType,
            a = e.shopName,
            n = e.orderDetailList,
            s = e.productCount,
            i = e.orderCode,
            c = n.map((function(e) {
              var t = {},
                o = e.productLogo,
                r = e.cupName,
                a = e.attrs,
                n = e.specs,
                s = e.combos,
                i = e.productAmount,
                c = e.productName;
              return t.productLogo = o, t.productSepcsAndAttrsName = s ? s.reduce((function(e, t) {
                var o = t.cupName,
                  r = t.attrs,
                  a = t.specs,
                  n = t.productName,
                  s = t.productAmount,
                  i = (0, f.generateSelectName)(o, a, r);
                return e.push("".concat(n).concat(i ? "(".concat(i, ")") : "", " x").concat(s)), e
              }), []).join(" | ") : (0, f.generateSelectName)(r, n, a), t.productAmount = i, t.productName = c, t
            })),
            d = n.length > 1 ? c.reduce((function(e, t) {
              var o = t.productAmount,
                r = o > 1 ? "".concat(t.productName, " x").concat(o) : t.productName;
              return e.push(r), e
            }), []).join("、") : "";
          return {
            orderSource: t,
            shopId: o,
            orderType: r,
            shopName: a,
            orderDetailList: c,
            productCount: s,
            orderCode: i,
            productAllNames: d
          }
        }));
      o.orderList = a, e.setData(o), e.isRequestOrderList = !0
    })), (0, d.getMaybePreferGoods)({
      shopId: this.shopId
    }).then((function(t) {
      var o = t.data.map((function(t) {
          return e.getCurrentGoods(t)
        })).filter((function(e, t) {
          return e.sortIndex = t, e.productId
        })),
        r = o.filter((function(e, t) {
          return t % 2 != 0
        })),
        a = o.filter((function(e, t) {
          return t % 2 == 0
        }));
      e.setData({
        maybePreferList: o.length > 0 ? [a, r] : []
      }), wx.hideLoading()
    })).catch((function() {
      wx.hideLoading()
    }))
  },
  _menuToCollectProduct: function(e) {
    var o = this,
      r = e.map((function(e) {
        return t(t({}, o.getCurrentGoods(e.productId)), e)
      })).filter((function(e) {
        return e.productName
      }));
    r.map((function(e, t) {
      var o, r = [],
        a = [],
        n = [],
        s = (e.specs || []).reduce((function(e, t) {
          return e.push(t.specId), e
        }), []);
      (e.productSpecs || []).forEach((function(e) {
        var t, o = e.specs,
          r = null === (t = (void 0 === o ? [] : o).find((function(e) {
            return s.includes(e.specId)
          }))) || void 0 === t ? void 0 : t.specName;
        r && a.push(r)
      })), (e.productAttrs || []).forEach((function(t) {
        var o, a = t.productAttrs,
          n = null === (o = (void 0 === a ? [] : a).find((function(t) {
            return e.attrs && e.attrs.includes(t.attributeId)
          }))) || void 0 === o ? void 0 : o.attributeName;
        n && r.push(n)
      }));
      var i = null === (o = e.cups.find((function(t) {
        return e.cupId == t.specId
      }))) || void 0 === o ? void 0 : o.specName;
      i && n.push(i);
      var c = [].concat(n, r, a).join("/");
      return e.teastName = c, e.sortIndex = t, e
    }));
    var a = r.filter((function(e, t) {
        return t % 2 != 0
      })),
      n = r.filter((function(e, t) {
        return t % 2 == 0
      }));
    return r.length > 6 && (n.length = 3, a.length = 3), r.length > 0 ? [n, a] : []
  },
  onAddCartFromOnemore: function() {
    var e = this;
    return n(a().mark((function t() {
      var o;
      return a().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return e.initOneMore(), t.next = 3, e.getCartData().catch(e.dealError.bind(e));
          case 3:
            o = t.sent, e.setMenuNum(null == o ? void 0 : o.data), getApp().trackEvent("menu_page_click", {
              current_page_title: "餐单页",
              element_area: "我的常点",
              element_name: "再来一单"
            });
          case 6:
          case "end":
            return t.stop()
        }
      }), t)
    })))()
  },
  onOrderSwiperChange: function(e) {
    var t = e.detail.current;
    this.setData({
      currentOrderTab: t
    })
  },
  menuDiscountGoods: function() {
    var e = this,
      t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    (0, d.getMenuExtraInfoList)({
      shopId: this.shopId,
      orderType: this.data.orderType
    }).then((function(o) {
      var a = o.data,
        n = a.estimatedPriceProducts,
        s = a.exchangeProducts;
      e.estimatedPriceProducts = n || [], e.exchangeProducts = s || [];
      var i = {};
      e.estimatedPriceProducts.forEach((function(t) {
        var o = e.goodsIndexMap[t.productId];
        o && o.forEach((function(e) {
          var o = r(e, 2),
            a = o[0],
            n = o[1];
          i["vtabs[".concat(a, "].products[").concat(n, "].estimatedPrice")] = t.estimatedPrice + "", i["vtabs[".concat(a, "].products[").concat(n, "].estimatedPriceCupVo")] = t.estimatedPriceCupVo, i["vtabs[".concat(a, "].products[").concat(n, "].splitSprice")] = (0, l.splitSprice)(t.estimatedPrice)
        }))
      })), e.exchangeProducts.forEach((function(t) {
        var o = e.goodsIndexMap[t.productId];
        o && o.forEach((function(e) {
          var o = r(e, 2),
            a = o[0],
            n = o[1];
          i["vtabs[".concat(a, "].products[").concat(n, "].exchangeMarketingId")] = t.marketingId
        }))
      })), e.setData(Object.assign(t, i), (function() {
        var t = e.data.marketingMenuList.length + 1;
        e.data.activeTab === t && e.getUserPreference()
      })), e._cartData = {}
    }))
  },
  _clearEstimatePrice: function() {
    var e = this,
      t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
      o = {};
    if (this.estimatedPriceProducts.forEach((function(t) {
        var a = e.goodsIndexMap[t.productId];
        a && a.forEach((function(t) {
          var a = r(t, 2),
            n = a[0],
            s = a[1],
            i = e.data.vtabs[n].products[s];
          o["vtabs[".concat(n, "].products[").concat(s, "].estimatedPrice")] = null, o["vtabs[".concat(n, "].products[").concat(s, "].estimatedPriceCupVo")] = null, o["vtabs[".concat(n, "].products[").concat(s, "].splitSprice")] = (0, l.splitSprice)(i.productPrice)
        }))
      })), this.exchangeProducts.forEach((function(t) {
        var a = e.goodsIndexMap[t.productId];
        a && a.forEach((function(e) {
          var t = r(e, 2),
            a = t[0],
            n = t[1];
          o["vtabs[".concat(a, "].products[").concat(n, "].exchangeMarketingId")] = null
        }))
      })), t) return o;
    this.setData(o)
  },
  actTap: function(e) {
    var t = this;
    return n(a().mark((function o() {
      var r, n, s, i;
      return a().wrap((function(o) {
        for (;;) switch (o.prev = o.next) {
          case 0:
            if (r = e.currentTarget.dataset, n = r.type, s = r.url, i = r.id, 1 != n) {
              o.next = 5;
              break
            }
            getApp().navigate(s), o.next = 10;
            break;
          case 5:
            if (!i) {
              o.next = 10;
              break
            }
            return o.next = 8, getApp().checkPhone();
          case 8:
            t.pointExchangeId = i, t.getPointExchangeInfo();
          case 10:
          case "end":
            return o.stop()
        }
      }), o)
    })))()
  },
  getPointExchangeInfo: function() {
    var e = this;
    getApp().showLoading(), (0, d.getExchangeActDetailByMenu)({
      marketingId: this.pointExchangeId,
      captchaVerifyParam: getApp().captchaVerifyParam
    }).then((function(t) {
      var o = t.data,
        r = o.pointNum,
        a = o.rewardName;
      wx.hideLoading(), e.setData({
        pointExchangeCount: r,
        pointExchangeRewardName: a
      }, (function() {
        e.selectComponent("#comfirmExchange").openDialog()
      }))
    })).catch((function() {
      return wx.hideLoading()
    }))
  },
  onExchange: function() {
    var e = this;
    getApp().checkCaptchaVerify((function() {
      var t = e.data.orderType,
        o = {
          marketingId: e.pointExchangeId,
          shopId: e.shopId,
          orderType: t,
          captchaVerifyParam: getApp().captchaVerifyParam
        };
      getApp().showLoading(), (0, d.exchangeCouponByPoints)(o).then((function() {
        wx.hideLoading(), e.setData({
          showExchange: !0
        }), e._clearEstimatePrice(), e.menuDiscountGoods(), getApp().captchaVerifyParam = null
      })).catch((function(e) {
        getApp().captchaVerifyParam = null, getApp().showToast(e.msg || "兑换失败")
      }))
    }))
  },
  closePointExchangeTap: function() {
    this.setData({
      showExchange: !1
    })
  },
  onClickGoods: function(e) {
    this.openGoodsDetail(e);
    var t = e.currentTarget.dataset.area;
    getApp().trackEvent("menu_page_click", {
      current_page_title: "餐单页",
      element_area: "我的常点",
      element_name: t
    })
  },
  getSearchHotWord: function() {
    var e = this;
    (0, d.getHotSearch)(this.shopId).then((function(t) {
      var o = t.data;
      0 !== o.length && (e.setData({
        hotSearchWord: o[0].keyWord
      }), e.suggestWordsList = o)
    })).catch((function(e) {
      console.log("搜索热词:", e)
    }))
  }
});
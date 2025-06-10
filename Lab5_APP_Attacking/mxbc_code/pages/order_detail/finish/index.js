var e, t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("@/request/order"),
  o = require("@/request/store"),
  a = require("@/utils/index"),
  i = require("@/request/activity"),
  s = require("@/request/jointOrder"),
  d = (e = require("@/enum/index")) && e.__esModule ? e : {
    default: e
  },
  c = require("@/mixins/index"),
  u = require("@/request/menu"),
  h = require("@/env");
Page({
  data: {
    fromApp: !1,
    statusBarHeight: 44,
    menuButtonWidth: getApp().globalData.menuButtonWidth,
    isShowDetail: !1,
    isShowTakeOutInfo: !1,
    shop: {},
    orderDetail: {},
    orderRule: !1,
    orderSource: null,
    partitions: [],
    isLoading: !0,
    orderPoint: 0,
    refundReasonStr: "",
    swiperList: [],
    userLocationPermission: !1,
    showPhoneConfirm: !1,
    contactPhone: [],
    coinName: d.default.coinName,
    inThisDay: !1,
    errMsg: "",
    showNavCopy: !1,
    growth: 0,
    doNeedBagShowSwitch: !1,
    jointOrderConfig: {},
    payGiftData: {},
    coinGainTip: {
      pointTextAfterOrder: "",
      pointExchangeLink: "",
      pointEntranceText: ""
    }
  },
  cartId: null,
  computed: {
    orderStatusText: function(e) {
      var t = e.orderDetail,
        r = t.isRefund,
        n = t.orderStatus,
        o = t.refundStatus;
      if (0 == r) switch (n) {
        case 70:
          return "订单已完成";
        case 80:
          return "订单已取消"
      } else switch (o) {
        case 10:
          return "退单申请中";
        case 20:
          return "已同意退款";
        case 30:
          return "已退单";
        case 31:
          return "退单失败";
        default:
          return ""
      }
    },
    orderFinishText: function(e) {
      switch (e.orderDetail.orderType) {
        case 1:
          return "订单已完成，祝您用餐愉快";
        case 2:
          return "如未收到饮品，请及时联系门店或骑手，感谢您的理解";
        case 3:
          return "可在【我的-优惠券-券包购买记录】中查看";
        default:
          return ""
      }
    }
  },
  hasFetchAd: !1,
  onLoad: function(e) {
    var t = e.orderCode;
    this.orderCode = t, wx.hideShareMenu({
      menus: ["shareAppMessage", "shareTimeline"]
    });
    var r = getApp().configData.tencentFlowerSettingContentVo || {},
      n = {
        pointExchangeLink: getApp().configData.miniPointExchangeLink || "https://76177-activity.dexfu.cn/chw/visual-editor/skins?id=216593",
        pointTextAfterOrder: getApp().configData.pointTextAfterOrder || "本单预计可获得",
        pointEntranceText: getApp().configData.pointEntranceText || "去兑换"
      };
    this.setData({
      doNeedBagShowSwitch: r.doNeedBagShowSwitch,
      coinGainTip: n
    }), this.getJointOrderConfig()
  },
  onShow: function() {
    this.getOrderData()
  },
  getAdInfo: function() {
    var e = this,
      t = this.data.shop,
      r = t.shopId,
      n = t.regionCode,
      o = this.data.orderDetail.orderType;
    (0, i.getAdList)({
      adPlaceCodeList: ["WechartMiniOrderDetailBanner"],
      shopId: r,
      areaId: n,
      orderType: o
    }).then((function(t) {
      if (t.length) {
        var r = t.find((function(e) {
          return "WechartMiniOrderDetailBanner" == e.adPlaceCode
        })) || {};
        e.setData({
          swiperList: r.adInfoList || []
        }), e.hasFetchAd = !0
      }
    }))
  },
  getOrderData: function() {
    var e = this;
    getApp().showLoading("加载中"), (0, n.getOrderDetail)(this.orderCode).then(function() {
      var n = r(t().mark((function r(n) {
        var o, a, s, d, c, u, h, p, g;
        return t().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
            case 0:
              return o = n.data, wx.hideLoading(), a = new Date(o.orderTime.replace(/-/g, "/")).setHours(23, 55, 0, 0), s = a > Date.now(), e.setData({
                orderDetail: o,
                isLoading: !1,
                inThisDay: s,
                orderSource: o.orderSource,
                partitions: o.partitions
              }), e.cartId = o.partitions && o.partitions[0] ? o.partitions[0].cartId : "", o.isRefund && (d = o.refundRemark, c = o.refundReasonTypeName, u = o.refundReasonName, h = c ? "".concat(c, " ").concat(u) : "无", e.setData({
                refundReasonStr: d || h
              })), t.next = 9, e.getShopInfo(o.shopId);
            case 9:
              return t.next = 11, e.getOrderPoint();
            case 11:
              e.hasFetchAd || e.getAdInfo(), p = o.orderStatus, g = o.refundStatus, 80 != p && 20 != g && 30 != g && (0, i.fetchPayGift)(e.orderCode).then((function(t) {
                var r = t.data;
                r && e.setData({
                  payGiftData: Object.assign(r, {
                    page: "finish",
                    orderCode: e.orderCode
                  })
                })
              })), 1 === o.orderSource && e.getJointOrderConfig();
            case 15:
            case "end":
              return t.stop()
          }
        }), r)
      })));
      return function(e) {
        return n.apply(this, arguments)
      }
    }()).catch((function() {
      wx.hideLoading(), getApp().showToast("网络异常，请稍后重试")
    }))
  },
  getShopInfo: function(e) {
    var n = this;
    return r(t().mark((function r() {
      var i, s, d, c, u;
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.next = 2, (0, o.getShopInfo)(e);
          case 2:
            return i = t.sent, s = i.data, t.next = 6, getApp().getUserLocation();
          case 6:
            d = t.sent, c = d.longitude, u = d.latitude, s.distance = (0, a.getDistance)(u, c, s.latitude, s.longitude), n.setData({
              shop: s
            });
          case 11:
          case "end":
            return t.stop()
        }
      }), r)
    })))()
  },
  getOrderPoint: function() {
    var e = this;
    (0, n.getOrderPointAndGrowth)({
      pageType: 2,
      orderId: this.orderCode,
      actualPayAmount: this.data.orderDetail.price
    }).then((function(t) {
      var r = t.data;
      e.setData({
        orderPoint: r.point || 0,
        growth: r.growth || 0
      })
    })).catch((function() {
      getApp().showToast("网络异常，请稍后重试")
    }))
  },
  toggle: function() {
    this.setData({
      isShowDetail: !this.data.isShowDetail
    })
  },
  copy: function() {
    wx.setClipboardData({
      data: this.orderCode,
      success: function() {
        getApp().showToast("已复制")
      }
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
  clickContactShop: function(e) {
    var t = e.currentTarget.dataset,
      r = t.contactPhone,
      n = t.contactPhone2;
    r ? n ? this.setData({
      contactPhone: [r, n],
      showPhoneConfirm: !0
    }) : wx.makePhoneCall({
      phoneNumber: r,
      fail: function() {}
    }) : getApp().showToast("暂无门店联系电话")
  },
  selectPhone: function(e) {
    var t = this,
      r = e.currentTarget.dataset.phoneNumber;
    wx.makePhoneCall({
      phoneNumber: r,
      success: function() {
        t.setData({
          showPhoneConfirm: !1
        })
      },
      fail: function() {}
    })
  },
  closeConfirmPopup: function() {
    this.setData({
      showPhoneConfirm: !1
    })
  },
  goNavigate: function() {
    var e = this.data.shop,
      t = e.latitude,
      r = e.longitude,
      n = e.shopName,
      o = e.shopAddress;
    wx.openLocation({
      latitude: t,
      longitude: r,
      name: n,
      address: o,
      scale: 17
    })
  },
  pageBack: function() {
    getCurrentPages() && getCurrentPages().length > 1 ? wx.navigateBack() : wx.switchTab({
      url: "/pages/index/index"
    })
  },
  toMenuPage: function(e) {
    this.data.fromApp || (getApp().menuOptions = {
      shopId: e.currentTarget.dataset.shopid
    }, wx.switchTab({
      url: "/pages/menu/index"
    }))
  },
  toKeFu: function() {
    var e = getApp().globalData.userInfo,
      t = e.customerId,
      r = e.customerLevel;
    getApp().navigate("".concat(h.baseUrl, "/kefu.html?cid=").concat(t, "&lv=").concat(r, "&oid=").concat(this.data.orderDetail.orderId, "&ch=wx"))
  },
  openRefundOrderDialog: function() {
    var e = this;
    return r(t().mark((function r() {
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.next = 2, (0, c.insertSubscribeMessage)({
              key: "申请退款"
            });
          case 2:
            getApp().trackEvent("order_cancel"), e.selectComponent("#refundOrderDialog").openDialog();
          case 4:
          case "end":
            return t.stop()
        }
      }), r)
    })))()
  },
  refundOrder: function() {
    var e = this;
    if (!this.isRefunding) return this.isRefunding = !0, getApp().showLoading(), (0, n.refundVirtualOrder)({
      orderCode: this.orderCode
    }).then((function(t) {
      var r = t.data;
      e.isRefunding = !1, r && (wx.hideLoading(), getApp().showToast("退款成功", (function() {
        e.getOrderData()
      })))
    })).catch((function(t) {
      e.isRefunding = !1, wx.hideLoading(), 7011 === t.code ? e.setData({
        errMsg: "券包订单已过可退款时间，请联系门店线下处理"
      }, (function() {
        e.selectComponent("#confirmDialog").openDialog()
      })) : 7017 === t.code ? e.setData({
        errMsg: "申请退单失败，请检查券包内优惠券是否被使用或占用"
      }, (function() {
        e.selectComponent("#confirmDialog").openDialog()
      })) : (getApp().showToast(t.msg || "退款失败"), e.getOrderData())
    }))
  },
  onShareAppMessage: function() {
    var e, t, r, n;
    return {
      title: (null === (e = this.data.jointOrderConfig) || void 0 === e || null === (t = e.billShareCards) || void 0 === t ? void 0 : t.title) || "点击查看拼单账单详情",
      imageUrl: null === (r = this.data.jointOrderConfig) || void 0 === r || null === (n = r.billShareCards) || void 0 === n ? void 0 : n.imageUrl,
      path: "/pages/activity/joint-order/index?cartId=".concat(this.cartId)
    }
  },
  openOrderRule: function() {
    this.setData({
      orderRule: !0
    })
  },
  closeOrderRule: function() {
    this.setData({
      orderRule: !1
    })
  },
  onScroll: function(e) {
    var t = this,
      r = e.detail.scrollTop;
    this.scrollTimer && clearTimeout(this.scrollTimer), this.scrollTimer = setTimeout((function() {
      var e = t.data.showNavCopy;
      r > 20 && !e ? t.setData({
        showNavCopy: !0
      }) : r <= 20 && e && t.setData({
        showNavCopy: !1
      })
    }), 50)
  },
  OneMoreTap: function() {
    getApp().trackEvent("order_another");
    var e = this.orderCode;
    (0, u.queryOrderGoodsToCart)({
      orderCode: e
    }).then((function(e) {
      var t = e.data;
      getApp().setStorageSync("invalidProductList", JSON.stringify(t.invalidProductList)), getApp().menuOptions = {
        shopId: t.shopId,
        orderType: t.orderType,
        source: "onemore",
        consigneeAddressId: t.consigneeAddressId
      }, wx.switchTab({
        url: "/pages/menu/index"
      })
    })).catch((function(e) {
      getApp().showToast(e.msg)
    }))
  },
  showCouponDetail: function() {
    this.data.orderDetail.orderId && this.selectComponent("#couponPopup").init()
  },
  getJointOrderConfig: function() {
    this.data.jointOrderConfig.guideImageUrl || (0, s.getJointOrderConfig)().then((function(e) {
      var t = e.data;
      getApp().globalData.jointOrderConfig = t
    }))
  },
  advertiseTap: function(e) {
    var t = e.currentTarget.dataset,
      r = t.url,
      n = t.event,
      o = t.area;
    getApp().trackEvent(n, {
      current_page_title: "订单完成页",
      element_area: o,
      element_content: r
    }), getApp().navigate(r)
  }
});
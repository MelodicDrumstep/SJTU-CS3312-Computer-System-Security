var e, t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  a = require("../../../@babel/runtime/helpers/slicedToArray"),
  n = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("@/request/order"),
  i = require("@/request/jointOrder"),
  s = require("@/request/store"),
  d = require("@/utils/index"),
  c = require("@/request/activity"),
  u = require("@/env"),
  h = (e = require("@/enum/index")) && e.__esModule ? e : {
    default: e
  },
  p = require("@/mixins/index"),
  l = require("@/request/menu");
Page({
  data: {
    statusBarHeight: 44,
    menuButtonWidth: getApp().globalData.menuButtonWidth,
    fromApp: !1,
    isShowDetail: !1,
    isShowTakeOutInfo: !1,
    isShowRefund: !0,
    orderDetail: {},
    orderRule: !1,
    orderPoint: 0,
    shop: {},
    popupAdList: [],
    swiperList: [],
    isShowWarningDialog: !1,
    defaultCancelFee: 0,
    showReward: !1,
    showPhoneConfirm: !1,
    contactPhone: [],
    coinName: h.default.coinName,
    showPhoneTip: !1,
    growth: 0,
    doNeedBagShowSwitch: !1,
    jointOrderConfig: {},
    showMedal: !1,
    navOpacity: 0,
    payGiftData: {},
    coinGainTip: {
      pointTextAfterPay: "",
      pointExchangeLink: "",
      pointEntranceText: ""
    }
  },
  cartId: null,
  orderCode: "",
  hasFetchData: !1,
  onLoad: function(e) {
    var t = e.orderCode,
      a = e.isPayReturn,
      n = e.showReward,
      r = void 0 !== n && n,
      i = e.showPhoneTip,
      s = e.orderType;
    this.orderCode = t, this.showPhoneTip = i, this.isPayReturn = a;
    var d = getApp().configData.tencentFlowerSettingContentVo || {},
      u = {
        pointExchangeLink: getApp().configData.miniPointExchangeLink || "https://76177-activity.dexfu.cn/chw/visual-editor/skins?id=216593",
        pointTextAfterPay: getApp().configData.pointTextAfterPay || "本单预计可获得",
        pointEntranceText: getApp().configData.pointEntranceText || "去兑换"
      };
    this.setData({
      showReward: r,
      doNeedBagShowSwitch: d.doNeedBagShowSwitch,
      coinGainTip: u
    }), wx.hideShareMenu({
      menus: ["shareAppMessage", "shareTimeline"]
    }), getApp().thirdPartyParams && "netease" === getApp().thirdPartyParams.channel && a && 2 == s && (0, c.thirdPartyActivitySyncStatus)(o({
      orderType: s,
      orderCode: t
    }, getApp().thirdPartyParams))
  },
  onShow: function() {
    this.getPageData()
  },
  onPullDownRefresh: function() {
    this.getOrderData().then((function() {
      wx.stopPullDownRefresh()
    }))
  },
  onPageScroll: (0, d.throttle)((function(e) {
    var t = e.scrollTop;
    t < 50 && this.data.navOpacity ? this.setData({
      navOpacity: 0
    }) : t >= 50 && !this.data.navOpacity && this.setData({
      navOpacity: 1
    })
  }), 50),
  getPageData: function() {
    var e = this;
    this.getOrderData().then(function() {
      var o = n(t().mark((function n(o) {
        var r, i, s;
        return t().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
            case 0:
              if (r = o.shopId, i = o.price, s = o.orderCode, +i && e.getOrderPoint(), !r) {
                t.next = 8;
                break
              }
              return t.next = 5, e.getShopInfo(r);
            case 5:
              if (!e.hasFetchData) {
                t.next = 7;
                break
              }
              return t.abrupt("return");
            case 7:
              Promise.all([(0, c.fetchAllActInfo)({
                orderCode: s,
                shopId: r
              }), e.getAdInfo(), (0, c.fetchPayGift)(s)]).then((function(t) {
                var n = a(t, 3),
                  o = n[0],
                  r = n[1],
                  i = n[2].data;
                e.hasFetchData = !0;
                var d = (null == r ? void 0 : r.find((function(e) {
                  return "WechartMiniTakeMealBanner" == e.adPlaceCode
                }))) || {};
                if (e.setData({
                    swiperList: d.adInfoList || [],
                    payGiftData: Object.assign(i || {}, {
                      page: "finish",
                      orderCode: s
                    })
                  }), e.isPayReturn) {
                  var c = getApp().configData.payPopupOrder || ["func_medal", "func_draw", "func_ad", "func_phone"],
                    u = {
                      func_draw: function() {
                        var t = o.data.actlist.find((function(e) {
                          return 1010 === e.type
                        }));
                        null != t && t.drawPopupImg && (e.setData({
                          popupAdList: [{
                            adImg: t.drawPopupImg,
                            adUrl: t.forwardUrl,
                            adTitle: t.name,
                            adPlaceName: "取餐页集点抽奖活动弹窗",
                            dateType: 3,
                            showNum: 999
                          }]
                        }), e.hasOpen = 1)
                      },
                      func_phone: function() {
                        e.showPhoneTip && (e.setData({
                          showPhoneTip: e.showPhoneTip
                        }), e.hasOpen = 1)
                      },
                      func_ad: function() {
                        var t, a = (null == r ? void 0 : r.find((function(e) {
                          return "WechartMiniPayReturnPopup" == e.adPlaceCode
                        }))) || {};
                        e.setData({
                          popupAdList: a.adInfoList || []
                        }), null !== (t = a.adInfoList) && void 0 !== t && t.length && (e.hasOpen = 1)
                      },
                      func_medal: function() {
                        var t = o.data.actlist.find((function(e) {
                          return 8010 === e.type
                        }));
                        null != t && t.drawPopupImg && (e.setData({
                          showMedal: !0,
                          medalData: t
                        }), e.hasOpen = 1)
                      }
                    };
                  c.forEach((function(t) {
                    !e.hasOpen && u[t] && u[t]()
                  }))
                }
              })).catch((function(e) {
                return console.log(e)
              }));
            case 8:
            case "end":
              return t.stop()
          }
        }), n)
      })));
      return function(e) {
        return o.apply(this, arguments)
      }
    }())
  },
  getAdInfo: function() {
    var e = this.data.shop,
      t = e.shopId,
      a = e.regionCode,
      n = this.data.orderDetail.orderType;
    return (0, c.getAdList)({
      adPlaceCodeList: ["WechartMiniTakeMealBanner", "WechartMiniPayReturnPopup"],
      shopId: t,
      areaId: a,
      orderType: n
    })
  },
  getOrderPoint: function() {
    var e = this;
    (0, r.getOrderPointAndGrowth)({
      orderId: this.orderCode,
      actualPayAmount: this.data.orderDetail.price
    }).then((function(t) {
      var a = t.data;
      e.setData({
        orderPoint: a && a.point || 0,
        growth: a.growth || 0
      })
    })).catch((function() {
      getApp().showToast("网络异常，请稍后重试")
    }))
  },
  orderRefresh: function() {
    var e = this;
    getApp().showLoading(), (0, r.orderRefresh)(this.orderCode).then((function(t) {
      var a = t.data;
      wx.hideLoading(), a && 1 == a.payStatus && (e.hasFetchData = !1, e.getPageData())
    })).catch((function() {
      wx.hideLoading()
    }))
  },
  getOrderData: function() {
    var e = this;
    return getApp().showLoading(), (0, r.getOrderDetail)(this.orderCode).then((function(t) {
      var a = t.data;
      if (wx.hideLoading(), a) {
        var n = a.isRefund,
          o = a.orderStatus,
          r = a.sendTime,
          i = a.takeType,
          s = a.takeTime,
          d = a.orderTime,
          c = a.payTime,
          u = a.timestamp,
          h = a.partitions,
          p = a.orderSource;
        if (1 == n || 0 == n && 70 == o || 0 == n && 80 == o) return wx.redirectTo({
          url: "/pages/order_detail/finish/index?orderCode=".concat(e.orderCode)
        }), {};
        e.setData({
          orderDetail: Object.assign(a, {
            sendTime: (r || "").slice(11, 16),
            takeTime: (s || "").slice(11, 16)
          })
        });
        var l = new Date((d || "").replace(/-/g, "/")).setHours(23, 55, 0, 0),
          g = new Date((c || "").replace(/-/g, "/")).getTime() + 6e4;
        return (10 == o || 1 == i && u >= g || u >= l) && e.setData({
          isShowRefund: !1
        }), 1 === p && (e.getJointOrderConfig(), e.cartId = h && h[0] ? h[0].cartId : ""), a
      }
    })).catch((function(e) {
      return console.log(e), getApp().showToast(e && e.msg || "网络异常，请稍后重试"), {}
    }))
  },
  getShopInfo: function(e) {
    var a = this;
    return n(t().mark((function n() {
      var o, r, i, c, u;
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.next = 2, (0, s.getShopInfo)(e);
          case 2:
            return o = t.sent, r = o.data, t.next = 6, getApp().getUserLocation();
          case 6:
            return i = t.sent, c = i.longitude, u = i.latitude, r.distance = (0, d.getDistance)(u, c, r.latitude, r.longitude), a.setData({
              shop: r
            }), t.abrupt("return", r);
          case 12:
          case "end":
            return t.stop()
        }
      }), n)
    })))()
  },
  toggle: function() {
    this.setData({
      isShowDetail: !this.data.isShowDetail
    })
  },
  copy: function() {
    wx.setClipboardData({
      data: this.data.orderDetail.orderCode,
      success: function() {
        getApp().showToast("已复制")
      }
    })
  },
  clickContactShop: function() {
    var e = this.data.shop.contactPhone,
      t = this.data.shop.contactPhone2;
    e ? t ? this.setData({
      contactPhone: [e, t],
      showPhoneConfirm: !0
    }) : wx.makePhoneCall({
      phoneNumber: e,
      fail: function() {}
    }) : getApp().showToast("暂无门店联系电话")
  },
  selectPhone: function(e) {
    var t = this,
      a = e.currentTarget.dataset.phoneNumber;
    wx.makePhoneCall({
      phoneNumber: a,
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
  clickContactRider: function(e) {
    var t = e.target.dataset.phoneNumber;
    t ? wx.makePhoneCall({
      phoneNumber: t
    }) : getApp().showToast("暂无骑手联系电话")
  },
  goNavigate: function() {
    var e = this.data.shop,
      t = e.latitude,
      a = e.longitude,
      n = e.shopName,
      o = e.shopAddress;
    wx.openLocation({
      latitude: t,
      longitude: a,
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
  goRefund: function() {
    wx.redirectTo({
      url: "/pages/order_detail/refund/index?orderCode=".concat(this.data.orderDetail.orderCode)
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
  confirmRefund: function() {
    this.selectComponent("#confirmRefundDialog").openDialog()
  },
  openWarningDialog: function() {
    var e = this;
    return n(t().mark((function a() {
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.next = 2, (0, p.insertSubscribeMessage)({
              key: "申请退款"
            });
          case 2:
            getApp().trackEvent("order_cancel"), 2 == e.data.orderDetail.orderType && 2 == e.data.orderDetail.deliveryType ? e.setData({
              isShowWarningDialog: !0
            }) : e.goRefund();
          case 4:
          case "end":
            return t.stop()
        }
      }), a)
    })))()
  },
  closeWarningDialog: function() {
    this.setData({
      isShowWarningDialog: !1
    })
  },
  closePhoneTip: function() {
    this.setData({
      showPhoneTip: !1
    }), this.showPhoneTip = !1
  },
  toMenuPage: function(e) {
    this.data.fromApp || (getApp().menuOptions = {
      shopId: e.currentTarget.dataset.shopid
    }, wx.switchTab({
      url: "/pages/menu/index"
    }))
  },
  toRiderPage: function() {
    var e = this.data.orderDetail,
      t = e.latitude,
      a = e.longitude,
      n = e.orderId,
      o = e.customerId,
      r = encodeURIComponent("".concat(u.baseUrl, "/#/delivery?orderId=").concat(n, "&lat1=").concat(this.data.shop.latitude, "&lng1=").concat(this.data.shop.longitude, "&lat2=").concat(t, "&lng2=").concat(a, "&customerId=").concat(o));
    wx.navigateTo({
      url: "/pages/webView/index?url=".concat(r)
    })
  },
  toKeFu: function() {
    var e = getApp().globalData.userInfo,
      t = e.customerId,
      a = e.customerLevel;
    getApp().navigate("".concat(u.baseUrl, "/kefu.html?cid=").concat(t, "&lv=").concat(a, "&oid=").concat(this.data.orderDetail.orderId, "&ch=wx"))
  },
  onShareAppMessage: function() {
    var e, t, a, n;
    return {
      title: (null === (e = this.data.jointOrderConfig) || void 0 === e || null === (t = e.billShareCards) || void 0 === t ? void 0 : t.title) || "点击查看拼单账单详情",
      imageUrl: null === (a = this.data.jointOrderConfig) || void 0 === a || null === (n = a.billShareCards) || void 0 === n ? void 0 : n.imageUrl,
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
  OneMoreTap: function() {
    var e = this.orderCode;
    (0, l.queryOrderGoodsToCart)({
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
  closeMedal: function() {
    this.setData({
      showMedal: !1
    })
  },
  getJointOrderConfig: function() {
    this.data.jointOrderConfig.guideImageUrl || (0, i.getJointOrderConfig)().then((function(e) {
      var t = e.data;
      getApp().globalData.jointOrderConfig = t
    }))
  },
  goMedal: function() {
    this.closeMedal(), getApp().navigate("".concat(u.baseUrl_Web, "/#/myMedal?disShare=1&needToken=2&id=").concat(this.data.medalData.id))
  },
  sendBlessToSnowKing: function() {
    var e = this;
    (0, c.sendBirthdayWish)({
      shopCode: this.data.shop.shopCode,
      orderCode: this.orderCode
    }).finally((function() {
      e.closeMedal(), getApp().showToast("祝福已发送")
    }))
  },
  advertiseTap: function(e) {
    var t = e.currentTarget.dataset,
      a = t.url,
      n = t.event,
      o = t.area;
    getApp().trackEvent(n, {
      current_page_title: "待取餐页",
      element_area: o,
      element_content: a
    }), getApp().navigate(a)
  }
});
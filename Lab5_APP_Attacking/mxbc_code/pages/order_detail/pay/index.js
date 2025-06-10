var e, t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  a = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("@/request/order"),
  n = require("@/request/store"),
  r = require("@/request/order.js"),
  i = require("@/request/jointOrder"),
  s = require("@/utils/index"),
  c = (e = require("@/enum/index")) && e.__esModule ? e : {
    default: e
  },
  d = require("@/env");
Page({
  data: {
    fromApp: !1,
    isShowWarning: !1,
    isShowDetail: !1,
    isShowConfirmDialog: !1,
    isShowTakeOutInfo: !1,
    orderData: {},
    orderRule: !1,
    orderSource: null,
    partitions: [],
    shop: {
      shopName: "",
      shopAddress: ""
    },
    userLocationPermission: !1,
    countdownStr: "00:00",
    isLoading: !0,
    statusBarHeight: 44,
    menuButtonWidth: getApp().globalData.menuButtonWidth,
    showPhoneConfirm: !1,
    contactPhone: [],
    coinName: c.default.coinName,
    jointOrderConfig: {}
  },
  cancelErr: {
    7003: "订单不存在",
    7009: "订单已取消",
    7018: "订单已支付"
  },
  interval: null,
  orderCode: "",
  onLoad: function(e) {
    var t = e.orderCode,
      a = e.accessToken,
      o = e.showReward,
      n = e.showPhoneTip;
    this.orderCode = t, this.showReward = o, this.showPhoneTip = n, a && (getApp().globalData.fromApp = !0, getApp().accessToken = a, this.goPay(), this.getJointOrderConfig())
  },
  onShow: function() {
    this.interval && clearInterval(this.interval), this.getOrderData()
  },
  onHide: function() {
    this.interval && clearInterval(this.interval)
  },
  onUnload: function() {
    this.interval && clearInterval(this.interval)
  },
  getOrderData: function() {
    var e = this;
    (0, o.getOrderDetail)(this.orderCode).then((function(t) {
      var a = t.data;
      if (a) {
        var o = a.takeType,
          n = a.takeTime,
          r = a.orderStatus,
          i = a.shopId,
          s = a.cancelTimeout;
        80 != r ? 10 == r ? (2 == o && (a.takeTime = e.timeFormat(n) || ""), a.sendTime = a.sendTime ? a.sendTime.slice(11, 16) : null, e.setData({
          isLoading: !1,
          orderData: a,
          orderSource: a.orderSource,
          partitions: a.partitions
        }), e.getShopData(i), e.startCountdown(s), 1 === a.orderSource && e.getJointOrderConfig()) : e.toTakePage() : e.toFinishPage()
      }
    })).catch((function() {
      getApp().showToast("网络异常，请稍后重试")
    }))
  },
  getShopData: function(e) {
    var o = this;
    return a(t().mark((function a() {
      var r, i, c, d, h;
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.next = 2, (0, n.getShopInfo)(e);
          case 2:
            return r = t.sent, i = r.data, t.next = 6, getApp().getUserLocation();
          case 6:
            c = t.sent, d = c.longitude, h = c.latitude, i.distance = (0, s.getDistance)(h, d, i.latitude, i.longitude), o.setData({
              shop: i
            });
          case 11:
          case "end":
            return t.stop()
        }
      }), a)
    })))()
  },
  startCountdown: function(e) {
    var t = this;
    e <= 0 || (this.interval && clearInterval(this.interval), this.interval = setInterval((function() {
      if ((e -= 1) <= 0) return clearInterval(t.interval), void t.toFinishPage();
      var a = t.numberFormat(Math.floor(e / 60)),
        o = t.numberFormat(Math.floor(e % 60));
      t.setData({
        countdownStr: "".concat(a, ":").concat(o)
      })
    }), 1e3))
  },
  numberFormat: function(e) {
    return e < 10 ? "0" + e : e
  },
  timeFormat: function(e) {
    return e = new Date(e.replace(/-/g, "/")), this.numberFormat(e.getHours()) + ":" + this.numberFormat(e.getMinutes()) || ""
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
  cancelOrder: function() {
    getApp().trackEvent("cancel"), this.setData({
      isShowConfirmDialog: !0
    })
  },
  hideConfirm: function() {
    this.setData({
      isShowConfirmDialog: !1
    })
  },
  confirmCancel: function() {
    var e = this;
    this.hideConfirm(), getApp().showLoading("取消中"), (0, r.cancelOrderById)(this.orderCode).then((function() {
      wx.hideLoading(), e.pageBack()
    })).catch((function(t) {
      wx.hideLoading(), getApp().showToast(e.cancelErr[t.code] || "网络异常，请稍后重试");
      var a = e,
        o = setTimeout((function() {
          a.pageBack(), clearTimeout(o)
        }), 1e3)
    }))
  },
  goPay: function() {
    var e = this;
    if (2 == this.data.orderData.takeType && new Date(this.formatToServer(this.data.orderData.takeTime)).getTime() <= Date.now()) return this.showWarning();
    getApp().trackEvent("pay_confirm");
    var t = this.orderCode;
    getApp().showLoading("支付中"), (0, o.prePay)(t).then((function(t) {
      var a = t.data;
      wx.hideLoading();
      var o = e,
        n = a.nonceStr,
        r = a.packageStr,
        i = a.paySign,
        s = a.signType,
        c = a.timestamp;
      a.isZeroPay ? (getApp().trackEvent("Pay_succeed", {
        type: "zero"
      }), o.toTakePage()) : wx.requestPayment({
        timeStamp: c,
        nonceStr: n,
        package: r,
        signType: s,
        paySign: i,
        success: function() {
          getApp().trackEvent("Pay_succeed", {
            type: "not_zero"
          }), 3 === o.data.orderData.orderType ? o.toFinishPage() : o.toTakePage()
        },
        fail: function() {
          getApp().trackEvent("Pay_failed", {
            process: "wechat_pay"
          })
        }
      })
    })).catch((function(t) {
      getApp().trackEvent("Pay_failed", {
        process: "pre_pay"
      }), wx.hideLoading(), t && 7002 == t.code ? getApp().showToast("暂无法支付，请稍后重试") : t && 7025 == t.code ? e.showWarning() : getApp().showToast(t && t.msg || "网络异常，请稍后重试")
    }))
  },
  formatToServer: function(e) {
    var t = e.split(":"),
      a = new Date(Date.now() - (getApp().configData.timeOffset || 0));
    return a.setHours(t[0]), a.setMinutes(t[1]), a.setSeconds("00"), (0, s.formatDate)(a)
  },
  toFinishPage: function() {
    wx.redirectTo({
      url: "/pages/order_detail/finish/index?orderCode=".concat(this.orderCode)
    })
  },
  toTakePage: function() {
    var e = "/pages/order_detail/take/index?orderCode=".concat(this.orderCode, "&isPayReturn=1&orderType=").concat(this.data.orderData.orderType);
    this.showReward && (e += "&showReward=".concat(this.showReward)), this.showPhoneTip && (e += "&showPhoneTip=1"), wx.redirectTo({
      url: e
    })
  },
  clickContactShop: function(e) {
    var t = e.currentTarget.dataset,
      a = t.contactPhone,
      o = t.contactPhone2;
    a ? o ? this.setData({
      contactPhone: [a, o],
      showPhoneConfirm: !0
    }) : wx.makePhoneCall({
      phoneNumber: a,
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
  goNavigate: function() {
    var e = this.data.shop,
      t = e.latitude,
      a = e.longitude,
      o = e.shopName,
      n = e.shopAddress;
    wx.openLocation({
      latitude: t,
      longitude: a,
      name: o,
      address: n,
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
      a = e.customerLevel;
    getApp().navigate("".concat(d.baseUrl, "/kefu.html?cid=").concat(t, "&lv=").concat(a, "&oid=").concat(this.data.orderData.orderId, "&ch=wx"))
  },
  showWarning: function() {
    this.setData({
      isShowWarning: !0
    })
  },
  hideWarning: function() {
    this.setData({
      isShowWarning: !1
    }), this.confirmCancel()
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
  showCouponDetail: function() {
    this.data.orderData.orderId && this.selectComponent("#couponPopup").init()
  },
  getJointOrderConfig: function() {
    this.data.jointOrderConfig.guideImageUrl || (0, i.getJointOrderConfig)().then((function(e) {
      var t = e.data;
      getApp().globalData.jointOrderConfig = t
    }))
  }
});
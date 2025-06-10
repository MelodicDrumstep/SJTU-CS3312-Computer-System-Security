var e, t = require("@/request/order"),
  n = (e = require("@/enum/index")) && e.__esModule ? e : {
    default: e
  },
  a = require("@/utils/index");
Page({
  data: {
    refundReason: "",
    refundRemark: "",
    refundReasonType: 0,
    foldVal: !0,
    typeMap: n.default.refundMap,
    themeColor: "#e60012"
  },
  orderCode: "",
  onLoad: function(e) {
    this.orderCode = e.orderCode, this.getReasonTypes()
  },
  onUnload: function() {
    this.timer && clearTimeout(this.timer), this.timer = null
  },
  getReasonTypes: function() {
    var e = this;
    (0, t.getReasonTypes)().then((function(t) {
      e.setData({
        typeMap: t.data || []
      })
    })).catch((function(e) {
      getApp().showToast(e && e.msg.replace(new RegExp("<br>", "g"), "\n") || "网络异常，请稍后重试")
    }))
  },
  isFold: function() {
    this.setData({
      foldVal: !this.data.foldVal
    })
  },
  onClickRadio: function(e) {
    var t = e.detail.value.split(",")[0],
      n = e.detail.value.split(",")[1],
      a = {
        refundReason: n || "",
        refundReasonType: t || "",
        refundRemark: ""
      };
    e.detail.value.split(",")[2] ? (a.refundReason = "", a.refundReasonType = n) : a.foldVal = !0, this.setData(a)
  },
  refund: (0, a.debounce)((function() {
    var e = this;
    if (this.data.refundReason || this.data.refundRemark)
      if (this.isRefunding) getApp().showToast("退款申请提交中，请勿重复点击");
      else {
        if (!this.orderCode) return getApp().showToast("缺少必要参数");
        this.isRefunding = !0, getApp().showLoading("加载中"), (0, t.refund)({
          orderCode: this.orderCode,
          refundReason: this.data.refundReason,
          refundReasonType: this.data.refundReasonType,
          refundRemark: this.data.refundRemark
        }).then((function(t) {
          wx.hideLoading(), t && 0 === t.code && (getApp().trackEvent("refund"), wx.redirectTo({
            url: "/pages/order_detail/finish/index?orderCode=" + e.orderCode
          }))
        })).catch((function(e) {
          wx.hideLoading(), getApp().showToast(e.msg.replace(new RegExp("<br>", "g"), "\n") || "网络异常，请稍后重试。")
        })).finally((function() {
          e.isRefunding = !1
        }))
      }
    else getApp().showToast("请选择或填写退款原因")
  }), 500, !0)
});
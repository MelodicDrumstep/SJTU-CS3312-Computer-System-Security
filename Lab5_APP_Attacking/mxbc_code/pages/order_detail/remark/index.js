Page({
  data: {
    remark: "",
    orderType: 1,
    remarkArr: []
  },
  onLoad: function(r) {
    var e = r.remark,
      a = void 0 === e ? "" : e,
      t = r.orderType,
      i = void 0 === t ? 1 : t,
      s = getApp().getStorageSync("remarkArr") || [];
    this.setData({
      remark: a,
      orderType: i,
      remarkArr: s
    })
  },
  selectRemark: function(r) {
    var e = "".concat(this.data.remark ? this.data.remark + "，" : "").concat(this.data.remarkArr[r.target.dataset.index]);
    if (e.length > 20) return getApp().showToast("最多20个字哦");
    this.setData({
      remark: e
    })
  },
  setRemarkArr: function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    if (r) {
      var e = this.data.remarkArr,
        a = e.indexOf(r);
      a > -1 && e.splice(a, 1), e.unshift(r), e.length > 6 && e.pop(), getApp().setStorageSync("remarkArr", e)
    }
  },
  submitRemark: function() {
    var r = this.data.remark.replace(/\n/g, "").slice(0, 20);
    this.setRemarkArr(r), wx.navigateBack({
      success: function() {
        var e = setTimeout((function() {
          getCurrentPages().pop().setData({
            remarkStr: r
          }), clearTimeout(e)
        }), 500)
      }
    })
  }
});
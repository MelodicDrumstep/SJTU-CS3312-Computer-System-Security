var e = require("../../@babel/runtime/helpers/toConsumableArray"),
  t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../@babel/runtime/helpers/defineProperty"),
  a = require("@/utils/index"),
  n = require("@/mixins/index");
Page({
  data: {
    comboData: {},
    currentGoods: {},
    isShowDetail: !1,
    isJointOrder: !1,
    currentAddNum: 1
  },
  currentGoodsIndex: 0,
  computed: {
    comboComputed: function(e) {
      var t = e.comboData,
        r = t.combos,
        o = void 0 === r ? [] : r,
        c = t.productPrice,
        i = void 0 === c ? 0 : c,
        s = t.originPrice,
        u = t.discountPercent,
        d = void 0 === u ? 100 : u,
        p = [];
      return o.forEach((function(e) {
        var t = e.productSpecs,
          r = void 0 === t ? [] : t,
          o = e.productAttrs,
          a = void 0 === o ? [] : o,
          c = e.productNum,
          u = [],
          m = a.map((function(e) {
            return e.productAttrs[e.selectAttr]
          }));
        r.forEach((function(e) {
          var t = e.maxSelect,
            r = e.specs,
            o = void 0 === r ? [] : r,
            a = e.selectSpec;
          if (1 == t && "" !== a) {
            var n = o[a].toppings ? d : 100;
            i += o[a].specPrice * c * (n / 100), s += o[a].specPrice * c, u.push(o[a])
          } else t > 1 && o.forEach((function(e) {
            var t = e.toppings ? d : 100;
            e.addNum && (i += e.specPrice * e.addNum * c * (t / 100), s += e.specPrice * e.addNum * c, u.push(e))
          }))
        })), p.push((0, n.generateSelectName)("", u, m))
      })), {
        selectNames: p,
        totalPrice: (0, a.splitSprice)(i),
        originPrice: s
      }
    }
  },
  onLoad: function() {
    var e = this;
    this.getOpenerEventChannel().on("menuToCombo", (function(t) {
      var r = t.goods,
        o = t.isJointOrder;
      r = JSON.parse(JSON.stringify(r)), e.initTaste(r.combos), e.transCombo(r.combos), r.productImages = (0, n.transferGoodsImg)(r.productImages, "".concat(e.data.__static__, "/main/placeholder_detail.png")), e.setData({
        comboData: r,
        isJointOrder: o
      })
    })), getApp().menuOptions.skipRefresh = 1
  },
  showDetail: function(e) {
    var t = e.currentTarget.dataset.index;
    this.currentGoodsIndex = t, this.setData({
      isShowDetail: !0,
      currentGoods: this.data.comboData.combos[t]
    })
  },
  closeDetail: function() {
    this.setData({
      isShowDetail: !1
    })
  },
  confirmSelect: function(e) {
    var t = e.detail.goods;
    this.setData(o({}, "comboData.combos[".concat(this.currentGoodsIndex, "]"), t))
  },
  updateCart: function(e) {
    var o = this;
    return r(t().mark((function r() {
      var a, c, i, s, u, d, p, m, l, h, f, g;
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return a = e.currentTarget.dataset.action, c = o.data.comboData, i = c.combos, s = void 0 === i ? [] : i, u = c.groupLink, t.next = 4, (0, n.checkGroupAndWelfare)(o.data.comboData);
          case 4:
            if (t.sent) {
              t.next = 8;
              break
            }
            return o.selectComponent("#joinGroupGuide").openWelfareDialog(u), t.abrupt("return");
          case 8:
            d = 0;
          case 9:
            if (!(d < s.length)) {
              t.next = 26;
              break
            }
            p = s[d] && s[d].productSpecs || [], m = 0;
          case 12:
            if (!(m < p.length)) {
              t.next = 23;
              break
            }
            if (l = p[m], h = l.minSelect, f = l.specs, !(f.reduce((function(e, t) {
                return e + t.addNum
              }), 0) < h)) {
              t.next = 20;
              break
            }
            return getApp().showToast("请选择商品规格"), o.currentGoodsIndex = d, o.setData({
              isShowDetail: !0,
              currentGoods: s[d]
            }), t.abrupt("return");
          case 20:
            m++, t.next = 12;
            break;
          case 23:
            d++, t.next = 9;
            break;
          case 26:
            g = getApp().isGuide, o.getOpenerEventChannel().emit("comboToMenu", {
              action: a,
              goods: o.data.comboData,
              productAmount: o.data.currentAddNum
            }), (getApp().globalData.userInfo.mobilePhone || g) && o.goBack();
          case 29:
          case "end":
            return t.stop()
        }
      }), r)
    })))()
  },
  updCurrentAddNum: function(e) {
    var t = e.currentTarget.dataset.num;
    if (1 !== this.data.currentAddNum || -1 != +t) return 100 === this.data.currentAddNum && 1 == +t ? getApp().showToast("超过最大加购数量") : void this.setData({
      currentAddNum: this.data.currentAddNum + +t
    })
  },
  initTaste: function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    e.forEach((function(e) {
      var t = e.detailType,
        r = e.productSpecs,
        o = void 0 === r ? [] : r,
        a = e.productAttrs,
        n = void 0 === a ? [] : a,
        c = e.cups;
      c.length && (e.selectCup = 0), +t && (o.forEach((function(e) {
        var t = e.minSelect,
          r = e.maxSelect,
          o = e.specs;
        1 == r && 1 == t ? e.selectSpec = 0 : 1 == r && 0 == t ? e.selectSpec = "" : o && o.length && o.forEach((function(e) {
          e.addNum = 0
        }))
      })), n.forEach((function(e) {
        e.selectAttr = 0
      }))), e.productNameShow = e.productName + "".concat(c && c[0] ? "（".concat(c[0].specName, "）") : "")
    }))
  },
  transCombo: function() {
    for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], r = t.length - 1; r >= 0; r--) {
      var o = t[r];
      o.productNum > 1 && o.detailType && t.splice.apply(t, [r, 1].concat(e((0, a.multiplyArray)(+o.productNum, Object.assign(o, {
        productNum: 1
      })))))
    }
  },
  onShareAppMessage: function() {
    var e = this.data.comboData,
      t = e.productId,
      r = e.productNameShow,
      o = e.productLogo;
    return {
      title: r,
      imageUrl: -1 !== o.indexOf(".gif") ? void 0 : o.split("?")[0],
      path: "/pages/menu/index?productId=".concat(t)
    }
  },
  closeTap: function() {
    this.setData({
      isShowDetail: !1
    })
  },
  goBack: function() {
    wx.navigateBack()
  }
});
var t = require("../../@babel/runtime/helpers/objectSpread2"),
  e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  a = require("../../@babel/runtime/helpers/asyncToGenerator"),
  s = require("../../@babel/runtime/helpers/defineProperty"),
  r = require("@/utils/index"),
  o = require("@/mixins/index"),
  c = require("@/request/menu"),
  i = ["暂不支持兑换", "立即使用", "无可用优惠券", "已达兑换上限"];
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  properties: {
    show: {
      type: Boolean,
      value: !1
    },
    type: {
      type: String,
      value: "default"
    },
    goods: {
      type: Object,
      value: {}
    },
    cart: {
      type: Object,
      value: {}
    },
    useBuyNow: {
      type: Boolean,
      value: !1
    }
  },
  data: {
    disabledIdsObj: {},
    goodsCopy: {},
    selectNames: "",
    detailPrice: [0],
    currentIds: "",
    idsMap: [],
    currentAddNum: 1,
    scrollTop: 0,
    loading: 1,
    favoriteTaste: !0,
    favoritedTip: "",
    isShowEstimatedPrice: !1,
    productExchangeDetail: {},
    showExchangeRulePop: !1
  },
  lifetimes: {
    attached: function() {
      var t = getApp().globalData,
        e = t.statusBarHeight,
        a = void 0 === e ? 44 : e,
        s = t.navBarHeight,
        r = void 0 === s ? 40 : s,
        o = t.menuButtonWidth,
        c = void 0 === o ? 87 : o;
      this.setData({
        statusBarHeight: a,
        navBarHeight: r,
        menuButtonWidth: c
      })
    },
    detached: function() {
      this.timer && clearTimeout(this.timer), this.timer1 && clearTimeout(this.timer1), this.timer2 && clearTimeout(this.timer2), this.timer = this.timer1 = this.timer2 = null
    }
  },
  isCollectLoading: !1,
  observers: {
    "show, goods.**": function(t, e) {
      var a = this;
      if (t && e.productId) {
        var s, r, c, i = "";
        e.customTaste ? (c = (0, o.initTasteSelectAttr)(e)) ? i = "已按照您的收藏口味自动选择" : (c = (0, o.getDisabledIds)(e)._disabled, i = "") : c = (0, o.getDisabledIds)(e)._disabled, null === (s = e.productAttrs) || void 0 === s || s.forEach((function(t) {
          return t.attributeName = t.attributeName.slice(0, 2)
        })), null === (r = e.productSpecs) || void 0 === r || r.forEach((function(t) {
          return t.specName = t.specName.slice(0, 2)
        })), e.productImages = (0, o.transferGoodsImg)(e.productImages, "".concat(this.data.__static__, "/main/placeholder_detail.png")), e.estimatedPriceCupVo && e.cups && e.cups.length && e.cups.forEach((function(t) {
          e.estimatedPriceCupVo[t.specId] && (t.estimatedCupPrice = e.estimatedPriceCupVo[t.specId].estimatedCupPrice || 0)
        })), this.setData({
          goodsCopy: e || {},
          disabledIdsObj: c,
          currentAddNum: 1,
          scrollTop: Math.random(),
          favoriteTaste: !!e.customTaste,
          favoritedTip: i
        }, (function() {
          a.timer1 = setTimeout((function() {
            a.setData({
              favoritedTip: ""
            }), clearTimeout(a.timer1), a.timer1 = null
          }), 3e3)
        })), this.timer || (this.timer = setTimeout((function() {
          a.setData({
            loading: !1
          }), clearTimeout(a.timer), a.timer = null
        }), 360))
      }
      e.exchangeMarketingId && wx.hideShareMenu()
    },
    "goodsCopy.**": function(t) {
      var e = t.groupId,
        a = t.productId,
        s = t.detailType,
        c = t.cups,
        i = t.selectCup,
        n = t.productSpecs,
        u = t.productPrice,
        d = t.productAttrs,
        p = t.estimatedPrice,
        l = t.estimatedPriceCupVo,
        m = t.discountPercent,
        h = void 0 === m ? 100 : m;
      if (a) {
        var g, f = !1,
          v = "",
          C = [],
          T = (d || []).map((function(t) {
            return t.productAttrs[t.selectAttr] || {}
          }));
        s ? (c && c[i] ? (v = c[i].specId, (0, r.isEmptyObject)(l) ? (g = p ? +p : c[i].specPrice, f = !!p) : (g = c[i].estimatedCupPrice || 0 === c[i].estimatedCupPrice ? c[i].estimatedCupPrice : c[i].specPrice, f = !!c[i].estimatedCupPrice || 0 === c[i].estimatedCupPrice), h = c[i].discountPercent || h) : (g = p ? +p : u, f = !!p), (n || []).forEach((function(t) {
          var e = t.maxSelect,
            a = t.specs,
            s = t.selectSpec;
          if (1 == e && "" !== s) {
            var r = a[s].toppings ? h : 100;
            g += (a || [])[s].specPrice * (r / 100), C.push(a[s])
          } else e > 1 && (a || []).forEach((function(t) {
            var e = t.toppings ? h : 100;
            g += t.specPrice * (t.addNum || 0) * (e / 100), t.addNum && C.push(t)
          }))
        }))) : p || 0 === p ? (g = p, f = !0) : g = u;
        var I = c[i] ? c[i].specName : "",
          y = {
            productId: a,
            cupId: v,
            attrs: T.map((function(t) {
              return t.attributeId
            })),
            specs: C.map((function(t) {
              var e = t.addNum;
              return {
                specId: t.specId,
                selectAmount: e || 1
              }
            }))
          };
        this.setData({
          selectNames: (0, o.generateSelectName)(I, C, T),
          detailPrice: (0, r.splitSprice)(g),
          currentIds: this.generateIds(e, v, C, T, a),
          favoriteTaste: this.compareSelectAndFavoriteTaste(y),
          isShowEstimatedPrice: f
        })
      }
    },
    "cart.products": function(t) {
      var e = this,
        a = (t || []).map((function(t) {
          var a = t.groupId,
            s = t.cupId,
            r = t.specs,
            o = t.attrs,
            c = t.productAmount,
            i = t.productId;
          return [e.generateIds(a, s, r, o, i), c]
        }));
      this.setData({
        idsMap: Object.fromEntries(a)
      })
    }
  },
  methods: {
    selectCup: function(t) {
      var e = t.currentTarget.dataset,
        a = e.index,
        s = e.mutexAttrs,
        r = {};
      (s || []).forEach((function(t) {
        return r[t] = 1
      }));
      var c = (0, o.resetProductAttrs)(this.data.goodsCopy, r);
      this.setData({
        "goodsCopy.selectCup": a,
        "goodsCopy.productAttrs": c,
        disabledIdsObj: r
      })
    },
    selectSpec: function(t) {
      var e = t.currentTarget.dataset.indexs,
        a = this.data.goodsCopy.productSpecs[e[0]],
        r = a.selectSpec,
        o = a.minSelect;
      1 == o && r !== e[1] && this.setData(s({}, "goodsCopy.productSpecs[".concat(e[0], "].selectSpec"), e[1])), 0 == o && this.setData(s({}, "goodsCopy.productSpecs[".concat(e[0], "].selectSpec"), r === e[1] ? "" : e[1]))
    },
    selectAttr: function(t) {
      var e = t.currentTarget.dataset,
        a = e.indexs,
        s = e.mutexAttrs,
        r = {};
      (s || []).forEach((function(t) {
        return r[t] = 1
      }));
      var c = this.data,
        i = c.goodsCopy,
        n = i.cups,
        u = void 0 === n ? [] : n,
        d = i.selectCup;
      if ("combo" !== c.type || !u[d] || !r[u[d].specId]) {
        var p = (0, o.resetProductCups)(this.data.goodsCopy, r),
          l = (0, o.resetProductAttrs)(this.data.goodsCopy, r, a);
        this.setData({
          "goodsCopy.productAttrs": l,
          "goodsCopy.selectCup": p,
          disabledIdsObj: r
        }, (function() {}))
      }
    },
    addSpec: function(t) {
      var e = t.currentTarget.dataset.indexs,
        a = this.data.goodsCopy.productSpecs[e[0]],
        r = a.specName,
        o = a.maxSelect,
        c = a.multiSelect,
        i = a.specs,
        n = i[e[1]].addNum;
      return !c && n ? getApp().showToast("不可重复选择") : i.reduce((function(t, e) {
        return t + e.addNum
      }), 0) >= o ? getApp().showToast("".concat(r, "最多选择").concat(o, "份")) : void this.setData(s({}, "goodsCopy.productSpecs[".concat(e[0], "].specs[").concat(e[1], "].addNum"), n + 1))
    },
    removeSpec: function(t) {
      var e = t.currentTarget.dataset.indexs,
        a = this.data.goodsCopy.productSpecs[e[0]].specs[e[1]].addNum;
      a && this.setData(s({}, "goodsCopy.productSpecs[".concat(e[0], "].specs[").concat(e[1], "].addNum"), a - 1))
    },
    dialogAddGoods: function(t) {
      var e = t.currentTarget.dataset.action;
      this._checkRequiredValueTaste() && (getApp().trackEvent("buyNow" == e ? "product_buy" : "product_add"), this.triggerEvent("updateGoods", {
        action: e,
        goods: this.data.goodsCopy,
        productAmount: this.data.currentAddNum,
        productExchangeDetail: this.data.productExchangeDetail
      }))
    },
    dialogRemoveGoods: function() {
      this.triggerEvent("updateGoods", {
        goods: this.data.goodsCopy,
        productAmount: -1
      })
    },
    close: function() {
      this.triggerEvent("close")
    },
    generateIds: function(t, e, a, s, r) {
      var o = [e || "", (a || []).map((function(t) {
        return "".concat(t.specId, "_").concat(t.addNum || t.selectAmount || 1)
      })).join("/") || "", (s || []).map((function(t) {
        return t.attributeId
      })).join("/") || ""].join(",");
      return "".concat(t ? t + "_" : "").concat(r, "_").concat(o)
    },
    confirmSelect: function() {
      this._checkRequiredValueTaste() && (this.triggerEvent("updateGoods", {
        goods: this.data.goodsCopy
      }), this.close())
    },
    updCurrentAddNum: function(t) {
      var e = t.currentTarget.dataset.num;
      if (1 !== this.data.currentAddNum || -1 != +e) return 100 === this.data.currentAddNum && 1 == +e ? getApp().showToast("超过最大加购数量") : void this.setData({
        currentAddNum: this.data.currentAddNum + +e
      })
    },
    onCollectTaste: function() {
      var t = this;
      return a(e().mark((function a() {
        var s, r, i, n, u, d, p, l, m, h, g, f, v;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, getApp().checkPhone();
            case 2:
              if (!t.isCollectLoading) {
                e.next = 5;
                break
              }
              return getApp().showToast("请勿频繁点击～"), e.abrupt("return");
            case 5:
              if (s = t.data, r = s.goodsCopy, i = r.productAttrs, n = r.productSpecs, u = r.cups, d = r.selectCup, p = r.productId, l = s.favoriteTaste, m = (0, o.createCartData)(n, i, u[d]), h = m.attrs, g = m.specs, f = m.cupId, h.length || g.length || f) {
                e.next = 9;
                break
              }
              return e.abrupt("return", getApp().showToast("请选好口味后收藏"));
            case 9:
              t.isCollectLoading = !0, l ? (0, c.cancelFavoriteTaste)({
                productId: p
              }).then((function() {
                t.setData({
                  "goodsCopy.customTaste": null,
                  favoriteTaste: !1
                }, (function() {
                  t.isCollectLoading = !1
                })), t.triggerEvent("updateFavoriteTaste", {
                  productId: p
                })
              })).catch((function() {
                t.isCollectLoading = !1
              })) : (v = {
                productId: p,
                cupId: f,
                attrs: h.map((function(t) {
                  return t && t.attributeId
                })),
                specs: g.map((function(t) {
                  return {
                    selectAmount: t.selectAmount,
                    specId: t.specId
                  }
                }))
              }, (0, c.collectFavoriteTaste)(v).then((function() {
                t.setData({
                  "goodsCopy.customTaste": v,
                  favoriteTaste: !0,
                  favoritedTip: "口味已收藏，方便您下次快速点单"
                }, (function() {
                  t.timer2 = setTimeout((function() {
                    t.setData({
                      favoritedTip: ""
                    }), t.isCollectLoading = !1, clearTimeout(t.timer2), t.timer2 = null
                  }), 3e3)
                })), t.triggerEvent("updateFavoriteTaste", v), getApp().trackEvent("collect_taste")
              })).catch((function() {
                t.isCollectLoading = !1
              })));
            case 11:
            case "end":
              return e.stop()
          }
        }), a)
      })))()
    },
    compareSelectAndFavoriteTaste: function(t) {
      if (!this.data.goodsCopy.customTaste) return !1;
      var e = this.data.goodsCopy.customTaste || {};
      if (e.cupId && t.cupId && e.cupId != t.cupId) return !1;
      if (e.attrs && t.attrs) {
        if (e.attrs.length !== t.attrs.length) return !1;
        if (!t.attrs.every((function(t) {
            return e.attrs.includes(t)
          }))) return !1
      }
      if (e.specs && t.specs) {
        if (e.specs.length !== t.specs.length) return !1;
        for (var a = e.specs.map((function(t) {
            return t.specId
          })), s = 0; s < t.specs.length; s++) {
          var r = t.specs[s],
            o = a.indexOf(r.specId);
          if (-1 == o) return !1;
          if (r.selectAmount != e.specs[o].selectAmount) return !1
        }
      }
      return !0
    },
    _checkRequiredValueTaste: function() {
      var t = this.data.goodsCopy,
        e = t.productSpecs,
        a = t.selectCup,
        s = t.productAttrs;
      if (-1 == a) return getApp().showToast("请选择杯型");
      if (s && s.length)
        for (var r = 0; r < s.length; r++) {
          var o = s[r],
            c = o.selectAttr,
            i = o.attributeName;
          if (-1 == c) return getApp().showToast("请选择".concat(i))
        }
      if (e && e.length)
        for (var n = 0; n < e.length; n++) {
          var u = e[n],
            d = u.specName,
            p = u.minSelect;
          if (u.specs.reduce((function(t, e) {
              return t + e.addNum
            }), 0) < p) return getApp().showToast("".concat(d, "最少选择").concat(p, "份，请继续选购"))
        }
      return !0
    },
    onExchange: function(e) {
      var a = e.detail,
        s = a.productExchangeDetail,
        o = a.estimatedPrice,
        c = {};
      (0 == o || o || o < this.data.goodsCopy.estimatedPrice) && (c["goodsCopy.estimatedPrice"] = o, c["goodsCopy.detailPrice"] = (0, r.splitSprice)(o)), s && (c.productExchangeDetail = t(t({}, s), {}, {
        buttonStatusText: i[+s.buttonStatus + 1]
      })), this.setData(c)
    },
    onToggleRule: function() {
      this.setData({
        showExchangeRulePop: !this.data.showExchangeRulePop
      })
    }
  }
});
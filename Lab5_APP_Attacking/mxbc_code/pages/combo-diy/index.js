var t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  e = require("../../@babel/runtime/helpers/slicedToArray"),
  o = require("../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("@/utils/index"),
  r = require("@/mixins/index"),
  c = {
    price: 0,
    originPrice: 0,
    splitSprice: [0, 0],
    productAmount: 0,
    products: [],
    orderType: "1"
  };
Page({
  data: {
    orderType: 1,
    comboData: {},
    currentGoods: {},
    currentGoodsIndex: 0,
    isShowGoodsDetail: !1,
    isShowCartDetail: !1,
    isShowConfirmDialog: !1,
    cartData: JSON.parse(JSON.stringify(c))
  },
  goodsKeyInCart: [],
  onLoad: function() {
    var t = this;
    this.getOpenerEventChannel().on("menuToCombo", (function(e) {
      var o = e.goods,
        a = e.orderType;
      t.setData({
        orderType: a
      }, (function() {
        (o = JSON.parse(JSON.stringify(o))).productImages = (0, r.transferGoodsImg)(o.productImages, "".concat(t.data.__static__, "/main/placeholder_detail.png"));
        var e = {
          cartData: t.formatCart(Object.assign(JSON.parse(JSON.stringify(c)), {
            orderType: a,
            price: o.productPrice,
            originPrice: o.productPrice
          })),
          comboData: t.initMenu(o)
        };
        t.setData(e)
      }))
    })), getApp().menuOptions.skipRefresh = 1
  },
  initMenu: function() {
    var t = this,
      e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return this.goodsKeyInCart = [], this.goodsIndexMap = {}, e.limitNum = 0, e.comboGroups.forEach((function(o, c) {
      o.addNum = 0, e.limitNum += o.selectQuantity, o.combos.forEach((function(e, s) {
        var i = e.detailType,
          n = e.productSpecs,
          d = e.productAttrs,
          u = e.productPrice,
          p = e.productId,
          m = e.cups; + i && (n.forEach((function(t) {
          var e = t.minSelect,
            o = t.maxSelect,
            a = t.specs;
          1 == o && 1 == e ? t.selectSpec = 0 : 1 == o && 0 == e ? t.selectSpec = "" : a && a.length && a.forEach((function(t) {
            t.addNum = 0
          }))
        })), d.forEach((function(t) {
          t.selectAttr = 0
        }))), Object.assign(e, {
          groupId: o.groupId,
          addNum: 0,
          selectCup: 0,
          splitSprice: (0, a.splitSprice)(u),
          disableClassName: (0, r.getDisableClassName)(e, t.data.orderType)
        });
        var l = "".concat(o.groupId, "_").concat(p, "_").concat(m[0] ? m[0].specId : "");
        Object.prototype.hasOwnProperty.call(t.goodsIndexMap, l) ? t.goodsIndexMap[l].push([c, s]) : t.goodsIndexMap[l] = [
          [c, s]
        ], t.transImage(e)
      }))
    })), e
  },
  updateGoods: function() {
    var a = arguments,
      c = this;
    return o(t().mark((function o() {
      var s, i, n, d, u, p, m, l, g, h, f, b, D, I, N, S, v, C, A, G, y, x, O, P, w, T, M, J, E, k, B, L, j, _, K, q, R;
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            if (s = a.length > 0 && void 0 !== a[0] ? a[0] : {}, i = a.length > 1 && void 0 !== a[1] ? a[1] : 1, n = c.data, d = n.cartData, u = n.comboData.comboGroups, p = n.currentGoodsIndex, m = d.products, l = s.isCartData, g = s.groupId, h = s.productId, f = s.detailRaisePrice, b = s.cups, D = s.cupId, I = s.selectCup, N = s.productAttrs, S = void 0 === N ? [] : N, v = s.productSpecs, C = void 0 === v ? [] : v, A = e(c.goodsIndexMap["".concat(g, "_").concat(h, "_").concat(D || b && b[I] && b[I].specId || "")], 1), G = e(A[0], 2), y = G[0], x = G[1], O = u[y].selectQuantity, P = u[y].addNum, w = u[y].combos[x].addNum, T = {}, !(P + i > O)) {
              t.next = 12;
              break
            }
            return t.abrupt("return", getApp().showToast("超过最大可选数量"));
          case 12:
            M = {
              groupId: g,
              productId: h,
              cupId: "",
              specIds: [],
              attributeIds: []
            }, getApp().showLoading(), T["comboData.comboGroups[".concat(y, "].addNum")] = Math.max(P + i, 0), T["comboData.comboGroups[".concat(y, "].combos[").concat(x, "].addNum")] = Math.max(w + i, 0), T["currentGoods.addNum"] = Math.max(w + i, 0), l ? Object.assign(M, {
              cupId: s.cupId,
              specIds: s.specs,
              attributeIds: s.attrs
            }) : Object.assign(M, c.getSpecsAndAttrsByMenu(C, S), {
              cupId: b[I] ? b[I].specId : "",
              cupName: b[I] ? b[I].specName : "",
              cupPrice: b[I] ? b[I].specPrice : 0
            }), J = (0, r.getUniKeyByParam)(M.groupId, M.productId, M.cupId, M.specIds, M.attributeIds), (E = c.goodsKeyInCart.indexOf(J)) > -1 ? (k = m[E].productAmount + i, Object.assign(m[E], {
              productAmount: k
            }), k <= 0 && (m.splice(E, 1), c.goodsKeyInCart.splice(E, 1))) : (c.goodsKeyInCart.push(J), B = c.data.comboData.discountPercent / 100 || 1, L = c.data.comboData.discountPercentCombo / 100 || 1, j = Math.round(f * L), _ = M.specIds.reduce((function(t, e) {
              return t + e.specPrice * e.selectAmount * i
            }), 0), K = Math.round(_ * B), q = j + K, i > 0 && m.push(Object.assign({
              isCartData: !0,
              cupId: M.cupId,
              cupName: M.cupName,
              totalAddPrice: q,
              productAmount: i,
              groupId: s.groupId,
              productId: s.productId,
              productLogo: s.productLogo,
              productName: s.productName,
              productType: s.productType,
              modifiedTime: s.modifiedTime
            }, c.getSpecsAndAttrsByCart(s.productSpecs, s.productAttrs)))), d.products = m, d.productAmount += i, d.price = c.data.comboData.productPrice + d.products.reduce((function(t, e) {
              return t + e.totalAddPrice * e.productAmount
            }), 0), T.cartData = c.formatCart(JSON.parse(JSON.stringify(d))), c.setData(T), c.closeGoodsDetail(), c.data.cartData.productAmount <= 0 && c.closeCartDetail(), R = setTimeout((function() {
              if (wx.hideLoading(), P + i === O) {
                if (p === u.length - 1) return;
                wx.createSelectorQuery().select("#cards".concat(p + 1)).boundingClientRect((function(t) {
                  wx.pageScrollTo({
                    scrollTop: t.top - 100,
                    duration: 300
                  })
                })).exec()
              }
              clearTimeout(R), R = null
            }), 200);
          case 29:
          case "end":
            return t.stop()
        }
      }), o)
    })))()
  },
  addGoods: function(t) {
    var e = t.currentTarget.dataset.indexs,
      o = this.data.comboData.comboGroups[e[0]].combos[e[1]],
      a = this.data.comboData.comboGroups;
    a[e[0]].addNum >= a[e[0]].selectQuantity && !a[e[0]].combos[e[1]].addNum || o.disableClassName || (o.discountPercent = this.data.comboData.discountPercent, this.setData({
      currentGoods: o
    }), this.setData({
      currentGoodsIndex: e[0]
    }), +o.detailType ? this.showGoodsDetail() : this.updateGoods(o))
  },
  removeGoods: function(t) {
    var e = this,
      o = t.currentTarget.dataset.indexs,
      a = this.data.comboData.comboGroups[o[0]].combos[o[1]];
    this.setData({
      currentGoods: a
    }, (function() {
      +a.detailType ? e.toogleCartDetail() : e.updateGoods(a, -1)
    }))
  },
  cartAddGoods: function(t) {
    var e = t.currentTarget.dataset.index;
    this.updateGoods(this.data.cartData.products[e])
  },
  cartRemoveGoods: function(t) {
    var e = t.currentTarget.dataset.index;
    this.updateGoods(this.data.cartData.products[e], -1)
  },
  dialogUpdateGoods: function(t) {
    var e = t.detail,
      o = e.goods,
      a = e.productAmount;
    this.updateGoods(o, a)
  },
  confirmClear: function() {
    this.closeConfirmDialog(), getApp().showLoading();
    var t = {
      cartData: this.formatCart(Object.assign(JSON.parse(JSON.stringify(c)), {
        price: this.data.comboData.productPrice,
        originPrice: this.data.comboData.productPrice
      })),
      comboData: this.initMenu(this.data.comboData)
    };
    this.setData(t), this.closeCartDetail(), wx.hideLoading()
  },
  confirmSelect: function() {
    var e = this;
    return o(t().mark((function o() {
      var a, c;
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return a = JSON.parse(JSON.stringify(e.data.comboData)), t.next = 3, (0, r.checkGroupAndWelfare)(a);
          case 3:
            if (t.sent) {
              t.next = 7;
              break
            }
            return e.selectComponent("#joinGroupGuide").openWelfareDialog(a.groupLink), t.abrupt("return");
          case 7:
            a.selectedComboGoodsByFrontCart = JSON.parse(JSON.stringify(e.data.cartData.products)), a.selectedComboGoodsByFrontCart.forEach((function(t) {
              delete t.isCartData, delete t.selectNames
            })), delete a.comboGroups, c = getApp().isGuide, e.getOpenerEventChannel().emit("comboToMenu", {
              goods: a,
              productAmount: 1
            }), (getApp().globalData.userInfo.mobilePhone || c) && e.goBack();
          case 13:
          case "end":
            return t.stop()
        }
      }), o)
    })))()
  },
  openGoodsDetail: function(t) {
    var e = t.currentTarget.dataset.indexs,
      o = this.data.comboData.comboGroups[e[0]].combos[e[1]];
    o.disableClassName || (this.setData({
      currentGoods: o
    }), this.showGoodsDetail())
  },
  showGoodsDetail: function() {
    this.setData({
      isShowGoodsDetail: !0
    })
  },
  closeGoodsDetail: function() {
    this.setData({
      isShowGoodsDetail: !1
    })
  },
  toogleCartDetail: function() {
    this.data.cartData.productAmount && this.setData({
      isShowCartDetail: !this.data.isShowCartDetail
    })
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
      isShowConfirmDialog: !1
    })
  },
  getSpecsAndAttrsByMenu: function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
      e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
      o = [],
      a = [];
    return t.forEach((function(t) {
      var e = t.maxSelect,
        a = t.selectSpec,
        r = t.specs,
        c = void 0 === r ? [] : r;
      1 == e && "" !== a ? o.push({
        specId: c[a].specId,
        specName: c[a].specName,
        selectAmount: 1,
        specPrice: c[a].specPrice
      }) : e > 1 && c.forEach((function(t) {
        t.addNum && o.push({
          specId: t.specId,
          specName: t.specName,
          selectAmount: t.addNum,
          specPrice: t.specPrice
        })
      }))
    })), e.map((function(t) {
      a.push({
        attributeId: t.productAttrs[t.selectAttr].attributeId,
        attributeName: t.productAttrs[t.selectAttr].attributeName
      })
    })), {
      specIds: o,
      attributeIds: a
    }
  },
  getSpecsAndAttrsByCart: function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
      e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
      o = [],
      a = [];
    return t.forEach((function(t) {
      var e = t.maxSelect,
        a = t.selectSpec,
        r = t.specs,
        c = void 0 === r ? [] : r;
      1 == e && "" !== a ? o.push({
        specId: c[a].specId,
        specName: c[a].specName,
        selectAmount: 1
      }) : e > 1 && c.forEach((function(t) {
        t.addNum && o.push({
          specId: t.specId,
          specName: t.specName,
          selectAmount: t.addNum
        })
      }))
    })), e.forEach((function(t) {
      var e = t.productAttrs[t.selectAttr];
      a.push({
        attributeId: e.attributeId,
        attributeName: e.attributeName
      })
    })), {
      specs: o,
      attrs: a
    }
  },
  formatCart: function(t) {
    var e = t.price,
      o = t.originPrice,
      c = t.products;
    if (t.splitOriginSprice = (0, a.splitSprice)(o), t.splitSprice = (0, a.splitSprice)(e), !c || !c.length) return t;
    for (var s = 0; s < c.length; s++) {
      var i = c[s],
        n = i.cupName,
        d = i.specs,
        u = i.attrs;
      c[s].selectNames = (0, r.generateSelectName)(n, d, u)
    }
    return t
  },
  transImage: function(t) {
    t.productLogoOriginal = t.productLogo.split("?")[0]
  },
  onShareAppMessage: function() {
    var t = this.data.comboData,
      e = t.productId,
      o = t.productName,
      a = t.productLogo;
    return {
      title: o,
      imageUrl: -1 !== a.indexOf(".gif") ? void 0 : a.split("?")[0],
      path: "/pages/menu/index?productId=".concat(e)
    }
  },
  goBack: function() {
    console.log("goBack"), wx.navigateBack()
  }
});
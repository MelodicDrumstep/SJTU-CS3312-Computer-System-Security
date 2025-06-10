Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.checkGroupAndWelfare = function(e) {
  var t = e.groupSell,
    r = e.groupCheck,
    c = e.welfareCheck;
  return new Promise((function(e, o) {
    if (!getApp().accessToken && !getApp().isGuide) return e(!0);
    1 === t && (c && !getApp().isIccWelfareMember || r && !getApp().isIccGroupMember) ? (getApp().showLoading(), (0, n.checkWelfareGroup)({
      welfareCheck: c,
      groupCheck: r
    }).then((function(t) {
      var u = t.data,
        n = t.code;
      wx.hideLoading(), u && 0 === n || (getApp().showToast("服务异常，请重试"), o()), getApp().isIccGroupMember = 1 === u.groupMemberFlag, getApp().isIccWelfareMember = 1 === u.welfareMemberFlag, (1 === c && 1 !== u.welfareMemberFlag || 1 === r && 1 !== u.groupMemberFlag) && e(), e(!0)
    })).catch((function() {
      o(), wx.hideLoading()
    }))) : e(!0)
  }))
}, exports.createCartData = function(e, t, r) {
  var c = [];
  return (e || []).forEach((function(e) {
    var t = e.maxSelect,
      r = e.selectSpec,
      o = e.specs,
      u = void 0 === o ? [] : o;
    if (1 == t && "" !== r) {
      var n = u[r],
        s = n.specId,
        i = n.specName,
        a = n.specPrice;
      c.push({
        specId: s,
        specName: i,
        specPrice: a,
        selectAmount: 1
      })
    } else t > 1 && u.forEach((function(e) {
      var t = e.specId,
        r = e.specName,
        o = e.specPrice,
        u = e.addNum;
      u && c.push({
        specId: t,
        specName: r,
        specPrice: o,
        selectAmount: u
      })
    }))
  })), {
    specs: c,
    cupId: (r || {}).specId || "",
    cupName: (r || {}).specName || "",
    cupPrice: (r || {}).specPrice || 0,
    attrs: (t || []).map((function(e) {
      return e.productAttrs[e.selectAttr]
    })) || []
  }
}, exports.generateSelectName = function(e, t, r) {
  var c = (t || []).map((function(e) {
      var t = e.addNum,
        r = e.selectAmount,
        c = e.specName;
      return "".concat((t || r) > 1 ? "".concat(c, "*").concat(t || r) : c)
    })),
    o = (r || []).map((function(e) {
      return e.attributeName
    }));
  return [e || "", c.join("/"), o.join("/")].filter((function(e) {
    return e
  })).join("/").replace(/^\/|\/$/g, "")
}, exports.getDisableClassName = function(e, t) {
  var r = e.productStatus,
    c = e.orderType,
    o = "";
  3 == r && (o += " sale-out");
  2 != t || c.includes(2) || (o += " no-out");
  1 != t || c.includes(1) || (o += " no-in");
  return o
}, exports.getDisabledIds = function(e) {
  var t = {};
  return e.selectCup = a(e, t), e.productAttrs = p(e, t), {
    goods: e,
    _disabled: t
  }
}, exports.getIsNeedMemCheck = function(e) {
  var t, r = e.couponName,
    c = e.products,
    o = e.partitions;
  if (null !== (t = getApp().globalData.regGuidanceSettingVo.checkCouponName) && void 0 !== t && t.includes(r)) return !0;
  c = o && o.length ? o.flatMap((function(e) {
    return e.products
  })) : c;
  for (var u = 0; u < c.length; u++) {
    var n, s = c[u];
    if (null !== (n = getApp().globalData.regGuidanceSettingVo.checkCouponName) && void 0 !== n && n.includes(c.couponName)) return !0;
    if (s.productVoucherList)
      for (var i = 0; i < s.productVoucherList.length; i++) {
        var a, p = s.productVoucherList[i];
        if (null !== (a = getApp().globalData.regGuidanceSettingVo.checkCouponName) && void 0 !== a && a.includes(p.couponName)) return !0
      }
  }
  return !1
}, exports.getParamsByCartGoods = function(e) {
  var t = [];
  (0, o.isObject)(e) && (e = [e]);
  return e.forEach((function(e) {
    var r = [];
    e.comboProductDetail && e.comboProductDetail.length && e.comboProductDetail.forEach((function(e) {
      r.push({
        productId: e.productId,
        cupId: e.cupId,
        specIds: Array.from(e.specs || [], (function(e) {
          return {
            specId: e.specId,
            selectAmount: e.selectAmount
          }
        })),
        attributeIds: Array.from(e.attrs || [], (function(e) {
          return e.attributeId
        }))
      })
    })), t.push({
      productId: e.productId,
      cupId: e.cupId,
      modifiedTime: e.productModifiedTime || e.modifiedTime,
      productAmount: e.productAmount,
      specIds: Array.from(e.specs || [], (function(e) {
        return {
          specId: e.specId,
          selectAmount: e.selectAmount
        }
      })),
      attributeIds: Array.from(e.attrs || [], (function(e) {
        return e.attributeId
      })),
      comboProductDetail: r
    })
  })), t
}, exports.getPlusDiscountProductList = function(e) {
  var t = [];
  if (e.length > 0)
    for (var r = e.length - 1; r >= 0; r--) {
      var c = e[r];
      c.addNum && t.push({
        attributeIds: (c.productAttrs || []).map((function(e) {
          return e.productAttrs[e.selectAttr].attributeId
        })),
        cupId: c.cupId || void 0,
        productAmount: c.addNum,
        productId: c.productId,
        modifiedTime: c.modifiedTime
      })
    }
  return t
}, exports.getSelectedProductVoucherList = function(e) {
  var t = [],
    r = !0;
  return e.forEach((function(e) {
    var c = [],
      o = [];
    e.productVoucherList && e.productVoucherList.forEach((function(e) {
      var t = e.channelSource,
        u = e.couponCode,
        n = e.couponName;
      if (u)
        if (6 === t) {
          var s = {
            couponCode: u,
            channelSource: t,
            couponName: n || ""
          };
          o.push(s)
        } else c.push(u), r = !1
    })), t.push({
      cartProductViewId: e.cartProductViewId || "0",
      couponCodeList: c,
      couponList: o
    })
  })), {
    selectedProductVoucherList: t,
    isUnUsedVoucherCoupon: r
  }
}, exports.getUniKeyByParam = function() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
    c = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [],
    o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : [],
    u = "",
    n = "";
  return c.sort().forEach((function(e) {
    u += "".concat(e.specId, ",").concat(e.selectAmount, "|")
  })), o.sort().forEach((function(e) {
    n += "".concat(e.attributeId, "|")
  })), "".concat(e, "|").concat(t, "|").concat(r, "|").concat(u).concat(n)
}, exports.initTasteSelectAttr = function(e) {
  var t = e.productAttrs,
    r = e.cups,
    c = void 0 === r ? [] : r,
    o = e.productSpecs,
    u = void 0 === o ? [] : o,
    n = e.customTaste,
    s = n.attrs,
    i = void 0 === s ? [] : s,
    a = n.cupId,
    p = n.specs,
    d = void 0 === p ? [] : p;
  i = i || [], d = d || [];
  var l = {};
  try {
    if (a && 0 == c.length || !a && c.length > 0) throw Error();
    if (c.length > 0) {
      var f = c.findIndex((function(e) {
        return e.specId == a
      }));
      if (-1 === f) throw Error();
      e.selectCup = f, (c[f].mutexAttrs || []).forEach((function(e) {
        l[e] = 1
      }))
    }
    if (t.length < i.length) throw Error();
    t.forEach((function(e) {
      if (e.selectAttr = function(e, t, r) {
          var c = e.findIndex((function(e) {
            return t.includes(e.attributeId)
          }));
          if (r[e[c].attributeId]) return;
          return c
        }(e.productAttrs, i, l), void 0 === e.selectAttr) throw Error();
      (e.productAttrs[e.selectAttr].mutexAttrs || []).forEach((function(e) {
        l[e] = 1
      }))
    }));
    var m = JSON.parse(JSON.stringify(d));
    if (u.forEach((function(e) {
        var t = m.map((function(e) {
            return e.specId
          })),
          r = e.minSelect,
          c = e.maxSelect,
          o = e.specs;
        if (1 == c) {
          var u = o.findIndex((function(e) {
            var r = t.findIndex((function(t) {
              return t == e.specId
            }));
            if (r > -1) {
              if (m[r].selectAmount > 1) throw Error();
              m.splice(r, 1)
            }
            return r > -1
          }));
          if (1 == r && -1 == u) throw Error();
          u > -1 && (e.selectSpec = u)
        } else o && o.length && o.forEach((function(e) {
          var r = (t = m.map((function(e) {
            return e.specId
          }))).indexOf(e.specId);
          r > -1 ? (e.addNum = m[r].selectAmount, m.splice(r, 1)) : e.addNum = 0
        }))
      })), m.length > 0) throw Error
  } catch (t) {
    var h = e.detailType,
      g = e.productSpecs,
      v = e.productAttrs;
    e.cups, e.productPrice, e.productId, e.productName, e.productType, e.giftPack, e.combos; + h && (g.forEach((function(e) {
      var t = e.minSelect,
        r = e.maxSelect,
        c = e.specs;
      1 == r && 1 == t ? e.selectSpec = 0 : 1 == r && 0 == t ? e.selectSpec = "" : c && c.length && c.forEach((function(e) {
        e.addNum = 0
      }))
    })), v.forEach((function(e) {
      e.selectAttr = 0
    }))), e.selectCup = 0, l = null
  }
  return l
}, exports.insertSubscribeMessage = function(e) {
  var t = e.key,
    o = void 0 === t ? "" : t,
    n = e.isOnceADay,
    s = void 0 !== n && n,
    i = e.templateIds;
  return new Promise((function(e) {
    if (getApp().globalData.selectedStore.cleanVersionFlag) return e();
    var t = r.default.tmplIds_weixin[o] || i || [];
    if (0 == t.length) return e();
    var n = "__".concat(r.default.brandKey, "__/msg/").concat((0, u.default)(t.join("|"))),
      a = wx.getStorageSync(n) || "";
    if ("" != a && a > Date.now()) return e();
    getApp().showLoading(), wx.getSetting({
      withSubscriptions: !0,
      complete: function(r) {
        var o = r.subscriptionsSetting,
          u = o.mainSwitch,
          i = o.itemSettings;
        wx.hideLoading(), u ? (getApp().globalData.showSubscribeGuide = t.some((function(e) {
          return !(i && i[e])
        })), wx.requestSubscribeMessage({
          tmplIds: t,
          complete: function(t) {
            getApp().globalData.showSubscribeGuide = !1;
            var r = [];
            if (Object.keys(t).map((function(e) {
                "accept" == t[e] && r.push(e)
              })), c.default.track(r), s) {
              var o = (new Date).setHours(24, 0, 0, 0);
              getApp().setStorage(n, o)
            }
            e()
          }
        })) : e()
      }
    })
  }))
}, exports.menuToCartGoods = function(e) {
  var t = e.productId,
    r = e.addNum,
    c = e.productType,
    o = e.cups,
    u = e.selectCup,
    n = e.productSpecs,
    s = e.productAttrs,
    a = e.combos,
    p = e.modifiedTime,
    d = {
      productId: t,
      productAmount: r,
      modifiedTime: p
    };
  2 == c ? Object.assign(d, {
    comboProductDetail: a.map((function(e) {
      var t = e.productId,
        r = e.productNum,
        c = e.cups,
        o = e.productSpecs,
        u = void 0 === o ? [] : o,
        n = e.productAttrs,
        s = void 0 === n ? [] : n;
      return Object.assign({
        productId: t,
        productNum: r,
        cupId: c[0] && c[0].specId || "",
        cupName: c[0] && c[0].specName || "",
        cupPrice: c[0] && c[0].specPrice || 0
      }, i(u, s))
    }))
  }) : Object.assign(d, i(n, s), {
    cupId: o[u] ? o[u].specId : "",
    cupName: o[u] ? o[u].specName : "",
    cupPrice: o[u] ? o[u].specPrice : 0
  });
  return d
}, exports.resetProductAttrs = p, exports.resetProductCups = a, exports.sellOutGoodsToEnd = function(e) {
  return e.sort((function(e, t) {
    return 3 == e.productStatus && 3 != t.productStatus ? 1 : 3 != e.productStatus && 3 == t.productStatus ? -1 : 0
  })), e
}, exports.transferGoodsImg = function(e, t) {
  return e && 0 !== e.length ? e.map((function(e) {
    return {
      adImg: e
    }
  })) : [{
    adImg: t
  }]
};
var e = require("../@babel/runtime/helpers/slicedToArray");
require("../@babel/runtime/helpers/Arrayincludes");
var t = require("../@babel/runtime/helpers/objectSpread2"),
  r = s(require("@/enum/index")),
  c = s(require("@/utils/track")),
  o = require("@/utils/index"),
  u = s(require("@/utils/js-md5")),
  n = require("@/request/user");

function s(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}

function i() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
    r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
    c = [];
  return e.forEach((function(e) {
    var t = e.maxSelect,
      r = e.selectSpec,
      o = e.specs,
      u = void 0 === o ? [] : o;
    1 == t && "" !== r ? c.push({
      specId: u[r].specId,
      selectAmount: 1,
      specName: u[r].specName,
      specPrice: u[r].specPrice
    }) : t > 1 && u.forEach((function(e) {
      e.addNum && c.push({
        specId: e.specId,
        selectAmount: e.addNum,
        specName: e.specName,
        specPrice: e.specPrice
      })
    }))
  })), {
    specs: c,
    attrs: r.map((function(e) {
      return t({}, e.productAttrs[e.selectAttr])
    }))
  }
}

function a(e, t) {
  var r = e.cups,
    c = void 0 === r ? [] : r,
    o = e.selectCup,
    u = void 0 === o ? 0 : o;
  return 0 == c.length ? 0 : (c[u] || (u = 0), t[c[u].specId] && (u = c.findIndex((function(e) {
    return !t[e.specId]
  }))), (c[u] && c[u].mutexAttrs || []).forEach((function(e) {
    t[e] = 1
  })), u)
}

function p(t, r) {
  var c = t.productAttrs,
    o = void 0 === c ? [] : c,
    u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
    n = e(u, 2),
    s = n[0],
    i = n[1];
  return o.forEach((function(e, t) {
    t == s ? e.selectAttr = i : (e.selectAttr = -1 == e.selectAttr ? 0 : e.selectAttr, r[e.productAttrs[e.selectAttr].attributeId] && (e.selectAttr = e.productAttrs.findIndex((function(e) {
      return !r[e.attributeId]
    }))), (e.productAttrs[e.selectAttr] && e.productAttrs[e.selectAttr].mutexAttrs || []).forEach((function(e) {
      r[e] = 1
    })))
  })), o
}
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.checkReward = function(e) {
  return r.default.get("/v1/h5/marketing/invitingReward/isReward", {
    marketingId: e
  })
}, exports.checkWelfareAndGroup = function(e) {
  return r.default.post("".concat(a.baseUrl_Activity, "/ordact/api/v1/customer/welfareAndGroup/check"), e)
}, exports.couponDetailByRuleId = function(e) {
  return r.default.post("/v1/customercoupons/exchange/info", e)
}, exports.exchangeCouponByPoints = function(e) {
  return r.default.post("/v2/shop/point/exchange", e)
}, exports.exchangeMzhdReward = function(e) {
  return r.default.post("/v1/accumulatePoint/exchange", e)
}, exports.fetchAllActInfo = function(e) {
  return r.default.post("/v2/shop/marketing/order/all-act/info", e)
}, exports.fetchCoupon = function(e) {
  return r.default.post("/v2/shop/receiveCouponsByYjlq", {
    marketingId: e,
    customerId: 1
  })
}, exports.fetchPayGift = function(e) {
  return r.default.post("/v2/shop/marketing/order/paygift/info", {
    orderCode: e
  })
}, exports.fetchReceiveShareCoupon = function(e, t) {
  return r.default.post("/v2/shop/marketing/share-act-gift/receive-coupons", {
    marketingId: e,
    inviterId: t
  })
}, exports.getActivityInfo = function(e) {
  return r.default.get("/v1/preheat/info/".concat(e))
}, exports.getAdList = function(e) {
  return i.apply(this, arguments)
}, exports.getCouponActivity = function(e) {
  return r.default.post("/v2/shop/getMarketingInfoByYjlq", {
    marketingId: e
  })
}, exports.getExchangeActDetail = function(e) {
  return r.default.post("/v2/shop/product/ext/detail", e)
}, exports.getExchangeActDetailByMenu = function(e) {
  return r.default.get("/v1/marketing/point/info", e)
}, exports.getHotGoods = function(e) {
  return r.default.post("/v1/hotProduct/list", {
    channelType: "2",
    shopId: e
  })
}, exports.getHotSearch = function(e) {
  return r.default.post("/v1/searchWord/list", {
    channelType: 1,
    shopId: e
  })
}, exports.getInvitingRewardInfo = function(e) {
  return r.default.get("/v1/h5/marketing/invitingReward/info", {
    marketingId: e
  })
}, exports.getInvitingRewardList = function(e) {
  return r.default.post("/v1/h5/marketing/invitingReward/rewardList", e)
}, exports.getInvitingRewardRecord = function(e) {
  return r.default.post("/v1/h5/marketing/invitingReward/invitingList", e)
}, exports.getMarketing = function(e) {
  return r.default.post(e.cartId ? "/v1/groupcart/settlement/marketing/list" : "/v3/shoppingCart/settlement/marketing/list", e)
}, exports.getMaybePreferGoods = function(e) {
  return r.default.get("/v2/shop/product/recommendProducts", e)
}, exports.getMenuExtraInfoList = function(e) {
  return r.default.get("/v2/shop/menu/extInfo", e)
}, exports.getMultiShopMzhdInfo = function(e) {
  return r.default.post("/v1/accumulatePoint/queryActivityByShopId", {
    shopId: e
  })
}, exports.getMzhdInfo = function(e) {
  return r.default.post("/v1/accumulatePoint/querySchedule", {
    shopIds: e
  })
}, exports.getMzhdRewardList = function(e) {
  return r.default.get("/v1/accumulatePoint/exchange/info", e)
}, exports.getNewInvitingRewardNum = function(e) {
  return r.default.get("/v1/h5/marketing/invitingReward/newRewardNum", {
    marketingId: e
  })
}, exports.getPartnerMarketing = function(e) {
  return r.default.post("/v2/shop/marketing/partner-marketing/query", {
    shopId: e
  })
}, exports.getRedeemRedPacketDetail = function(e) {
  return r.default.get("/v1/marketing/redeem-act/community/info", {
    marketingId: e
  })
}, exports.getReward = function(e) {
  return r.default.get("/v1/h5/marketing/invitingReward/getReward", {
    marketingId: e
  })
}, exports.getShareCouponDetail = function(e) {
  return r.default.post("/v2/shop/marketing/share-act-gift/info", {
    marketingId: e
  })
}, exports.getShopMzhdAndMedal = function(e) {
  return r.default.post("/v1/accumulatePoint/taskArea/info", {
    shopId: e
  })
}, exports.getTemplateJson = function(e) {
  return new Promise((function(t, n) {
    wx.request({
      url: e,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      complete: function(e) {
        e && 200 === e.statusCode && e.data ? t(e.data) : n()
      }
    })
  }))
}, exports.queryGroupGuideInfo = function(e) {
  return r.default.get("/v2/shopinfo/groupGuide/get/".concat(e.shopId))
}, exports.receiveMzhd = function(e) {
  return r.default.post("/v1/accumulatePoint/receiveActivity", e)
}, exports.redeemCode = function(e) {
  return r.default.post("/v2/shop/redeem", e)
}, exports.redeemRedPacketCode = function(e) {
  return r.default.post("/v1/marketing/redeem-act/community/verify", e)
}, exports.sendBirthdayWish = function(e) {
  return r.default.post("/v1/snowBirthday/bless/sendYunMu", e)
}, exports.thirdPartyActivitySyncStatus = function(e) {
  return r.default.post("".concat(a.baseUrl_Activity, "/ordact/api/v1/ordertask/third/report"), e)
};
var e, t = require("../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../@babel/runtime/helpers/asyncToGenerator"),
  r = (e = require("./index")) && e.__esModule ? e : {
    default: e
  },
  o = require("@/utils/index"),
  a = require("@/env");

function i() {
  return (i = n(t().mark((function e(a) {
    return t().wrap((function(e) {
      for (;;) switch (e.prev = e.next) {
        case 0:
          return e.abrupt("return", r.default.post("/v1/adinfo/adplace/query", a).then(function() {
            var e = n(t().mark((function e(n) {
              var r, a, i, s, c, d, p, f, l, g, h;
              return t().wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (!(r = n.data) || !r.length) {
                      e.next = 29;
                      break
                    }
                    a = 0;
                  case 3:
                    if (!(a < r.length)) {
                      e.next = 29;
                      break
                    }
                    if (!(i = r[a].adInfoList) || !i.length) {
                      e.next = 26;
                      break
                    }
                    s = 0;
                  case 7:
                    if (!(s < i.length)) {
                      e.next = 26;
                      break
                    }
                    if (d = i[s], null === (c = d.adUrl) || void 0 === c || !c.startsWith("wxLive://")) {
                      e.next = 23;
                      break
                    }
                    return p = (0, o.getUrlParam)(d.adUrl), f = p.finderUserName, e.prev = 11, e.next = 14, u(f);
                  case 14:
                    l = e.sent, g = l.feedId, h = l.nonceId, d.adUrl += "&feedId=".concat(g, "&nonceId=").concat(h), e.next = 23;
                    break;
                  case 20:
                    e.prev = 20, e.t0 = e.catch(11), console.log("获取直播信息错误");
                  case 23:
                    s++, e.next = 7;
                    break;
                  case 26:
                    a++, e.next = 3;
                    break;
                  case 29:
                    return e.abrupt("return", r);
                  case 30:
                  case "end":
                    return e.stop()
                }
              }), e, null, [
                [11, 20]
              ])
            })));
            return function(t) {
              return e.apply(this, arguments)
            }
          }()));
        case 1:
        case "end":
          return e.stop()
      }
    }), e)
  })))).apply(this, arguments)
}

function u(e) {
  return s.apply(this, arguments)
}

function s() {
  return (s = n(t().mark((function e(n) {
    return t().wrap((function(e) {
      for (;;) switch (e.prev = e.next) {
        case 0:
          return e.abrupt("return", new Promise((function(e, t) {
            wx.getChannelsLiveInfo({
              finderUserName: n,
              success: e,
              fail: t
            })
          })));
        case 1:
        case "end":
          return e.stop()
      }
    }), e)
  })))).apply(this, arguments)
}
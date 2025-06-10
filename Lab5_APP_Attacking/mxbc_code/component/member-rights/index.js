var e = require("../../@babel/runtime/helpers/defineProperty"),
  t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  a = require("../../@babel/runtime/helpers/asyncToGenerator"),
  i = require("@/request/user.js"),
  s = require("@/mixins/index"),
  r = require("@/utils/index");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  properties: {
    customer: {
      type: Object,
      value: {}
    },
    customStyle: {
      type: String,
      value: ""
    },
    showTitle: {
      type: Boolean,
      value: !0
    },
    page: {
      type: String,
      value: "index"
    }
  },
  data: {
    visible: !1,
    display: !1,
    rightsList: [],
    title: ""
  },
  observers: {
    "customer.homePageRightsTip, customer.orderPageRightsTip, customer.mainPageRightsNum": function(e, t, a) {
      var i = "index" === this.data.page ? e && e.slice(0, 20) : t && t.slice(0, 10);
      this.setData({
        title: i || "您有".concat(a, "项权益可使用")
      })
    }
  },
  methods: {
    clickTap: function() {
      var e = this;
      return a(t().mark((function a() {
        var s, r;
        return t().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
            case 0:
              if (wx.hideTabBar(), "index" === e.data.page ? getApp().trackEvent("membe_rights-index") : getApp().trackEvent("membe_rights-order"), !(e.data.rightsList.length > 0)) {
                t.next = 6;
                break
              }
              e.setData({
                visible: !0,
                display: !0
              }), t.next = 11;
              break;
            case 6:
              return t.next = 8, (0, i.homePageRights)();
            case 8:
              s = t.sent, (r = s.data) && r.length && e.setData({
                rightsList: r,
                visible: !0,
                display: !0
              });
            case 11:
            case "end":
              return t.stop()
          }
        }), a)
      })))()
    },
    toMenu: function() {
      this.closeAndShowTabbar(), getApp().navigate("/pages/menu/index")
    },
    onReceive: (0, r.debounce)((function(t) {
      var a = this,
        s = t.currentTarget.dataset,
        r = s.id,
        n = s.i,
        o = s.j;
      (0, i.getRightsCoupons)({
        levelType: this.data.customer.customerLevel,
        rightId: r
      }).then((function() {
        a.setData(e({}, "rightsList[".concat(n, "].rights[").concat(o, "].receivedStatus"), 1)), getApp().showToast("领取成功")
      })).catch((function(e) {
        getApp().showToast(e.msg || "领取失败")
      }))
    }), 500, !0),
    toLink: function(e) {
      var t = e.currentTarget.dataset.url;
      this.closeAndShowTabbar(), t && getApp().navigate(t)
    },
    remindRightUse: function() {
      (0, s.insertSubscribeMessage)({
        key: "会员使用提醒"
      })
    },
    setBirthday: function() {
      var e, r = this;
      if (!this.data.customer.birthday) return this.closeAndShowTabbar(), void wx.navigateTo({
        url: "/pages/customer-center/profiles/index",
        events: {
          acceptDataFromOpenedPage: (e = a(t().mark((function e(a) {
            var s, n;
            return t().wrap((function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  if (console.log(a), !a) {
                    e.next = 7;
                    break
                  }
                  return e.next = 4, (0, i.homePageRights)();
                case 4:
                  s = e.sent, n = s.data, r.setData({
                    rightsList: n
                  });
                case 7:
                case "end":
                  return e.stop()
              }
            }), e)
          }))), function(t) {
            return e.apply(this, arguments)
          })
        }
      });
      (0, s.insertSubscribeMessage)({
        key: "优惠券到账通知"
      })
    },
    onClose: function() {
      var e = this;
      this.setData({
        visible: !this.data.visible
      }), setTimeout((function() {
        e.setData({
          display: !e.data.display
        }), wx.showTabBar()
      }), 200)
    },
    toRightCenter: function() {
      this.closeAndShowTabbar(), getApp().navigate("/pages/customer-center/rights/index")
    },
    closeAndShowTabbar: function() {
      wx.showTabBar(), this.setData({
        visible: !1,
        display: !1
      })
    }
  }
});
var t = require("@/env");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  data: {
    isExpandNotice: !1,
    shopNoticeList: []
  },
  properties: {
    activites: {
      type: Array,
      value: []
    },
    orderType: String,
    selectedStore: {
      type: Object,
      value: {},
      observer: function(t) {
        t.shopId && this.initNoticeList(t)
      }
    }
  },
  methods: {
    initNoticeList: function(t) {
      var e = t.noticeContentList,
        o = e.companyNoticeList,
        a = void 0 === o ? [] : o,
        i = e.shopNoticeList,
        n = a.concat(i.map((function(t) {
          return {
            content: t
          }
        })));
      this.setData({
        shopNoticeList: n
      })
    },
    onTap: function() {
      getApp().trackEvent("menu_notice_tap", {
        orderType: 1 == this.data.orderType ? "自提" : "外送"
      }), this.setData({
        isExpandNotice: !0
      })
    },
    onClose: function() {
      this.setData({
        isExpandNotice: !1
      })
    },
    toFoodSafety: function() {
      getApp().navigate("".concat(t.baseUrl, "/#/preview/foodSafety?shopId=").concat(this.data.selectedStore.shopId))
    },
    toJumpNotice: function(t) {
      var e = getCurrentPages().pop() || {},
        o = t.currentTarget.dataset.notice,
        a = o.jumpType,
        i = o.jumpContent;
      switch (a) {
        case 1:
          e.openGoodsDetail({
            productName: i
          });
          break;
        case 2:
          e.appointCategory({
            categoryNameSale: i
          });
          break;
        case 3:
          getApp().navigate(i)
      }
      this.onClose()
    }
  }
});
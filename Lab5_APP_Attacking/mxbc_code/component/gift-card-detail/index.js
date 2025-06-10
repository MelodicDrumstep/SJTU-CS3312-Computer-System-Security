Component({
  options: {
    styleIsolation: "apply-shared"
  },
  properties: {
    giftCardData: {
      type: Object,
      value: {
        giftCardDeductTotalPrice: 0,
        giftCardTradeItemVos: []
      }
    },
    customClass: {
      type: String,
      value: ""
    }
  },
  data: {
    isShowPopup: !1
  },
  methods: {
    showDetail: function() {
      this.setData({
        isShowPopup: !0
      })
    },
    closeDetail: function() {
      this.setData({
        isShowPopup: !1
      })
    }
  }
});
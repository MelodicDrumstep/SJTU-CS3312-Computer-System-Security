var t = require("@/utils/base64");
Component({
  externalClasses: ["product-container-class"],
  options: {
    styleIsolation: "apply-shared",
    multipleSlots: !0,
    addGlobalClass: !0
  },
  properties: {
    userProduct: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: {
    nickname: "",
    isBirthday: !1
  },
  observers: {
    userProduct: function(e) {
      var s = e.customerInfo,
        a = null == s ? void 0 : s.nickname,
        r = null == s ? void 0 : s.birthdayStr;
      a && this.setData({
        nickname: t.Base64.decode(a)
      }), r && this.setData({
        isBirthday: getApp().isBirthday(r)
      })
    }
  }
});
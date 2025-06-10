Component({
  options: {
    styleIsolation: "apply-shared"
  },
  properties: {
    cancelJump: {
      type: Boolean,
      value: !0
    },
    title: {
      type: String,
      value: ""
    },
    content: {
      type: String,
      value: ""
    },
    cancelText: {
      type: String,
      value: ""
    },
    confirmText: {
      type: String,
      value: ""
    }
  },
  groupLink: "",
  methods: {
    openWelfareDialog: function(e) {
      this.groupLink = e, this.selectComponent("#comfirmWelfare").openDialog()
    },
    toWelfare: function() {
      var e = this.data.cancelJump ? "redirectTo" : "navigateTo";
      wx[e]({
        url: "/pages/webView/index?url=".concat(encodeURIComponent(this.groupLink))
      })
    },
    toHome: function() {
      this.data.cancelJump && getApp().navigate("/pages/index/index")
    }
  }
});
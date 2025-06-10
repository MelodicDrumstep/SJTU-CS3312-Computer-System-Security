var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../@babel/runtime/helpers/defineProperty"),
  o = require("@/request/user");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  data: {
    showDebugModel: !1,
    env: "qa",
    apiVersion: "",
    userInfo: {}
  },
  methods: {
    updModel: function() {
      this.setData({
        showDebugModel: !this.data.showDebugModel,
        env: wx.getStorageSync("env") || "pro",
        apiVersion: wx.getStorageSync("apiVersion") || "",
        userInfo: getApp().globalData.userInfo
      })
    },
    changeEnv: function(e) {
      wx.setStorageSync("env", e.currentTarget.dataset.env), this.setData({
        env: e.currentTarget.dataset.env
      }), getApp().logOut(), getApp().showToast("重启应用生效配置")
    },
    onInput: function(e) {
      var t = e.detail.value;
      this.setData({
        apiVersion: t
      })
    },
    saveApiVersion: function() {
      wx.setStorageSync("apiVersion", this.data.apiVersion), getApp().showToast("重启应用生效配置")
    },
    clearApiVersion: function() {
      this.setData({
        apiVersion: ""
      }), wx.setStorageSync("apiVersion", ""), getApp().showToast("重启应用生效配置")
    },
    unBindPhone: function() {
      var e = this;
      (0, o.unbindPhone)().then((function() {
        getApp().logOut(), e.setData(n({}, "userInfo.mobilePhone", "")), getApp().showToast("三方账号，解绑成功")
      }))
    },
    clearStorage: function() {
      wx.clearStorageSync()
    },
    getAuthCode: function() {
      return t(e().mark((function t() {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.t0 = console, e.next = 3, getApp().getAuthCode(!0);
            case 3:
              e.t1 = e.sent, e.t0.log.call(e.t0, e.t1);
            case 5:
            case "end":
              return e.stop()
          }
        }), t)
      })))()
    }
  }
});
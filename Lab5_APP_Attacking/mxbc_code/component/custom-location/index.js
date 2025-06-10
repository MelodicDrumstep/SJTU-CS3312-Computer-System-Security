getApp();
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    inline: {
      type: Boolean,
      value: !1
    },
    showSearch: {
      type: Boolean,
      value: !1
    },
    showSearchText: {
      type: Boolean,
      value: !1
    },
    customStyle: {
      type: String,
      value: ""
    },
    showHKMini: {
      type: Boolean,
      value: !0
    }
  },
  data: {},
  methods: {
    openSetting: function() {
      var e = this;
      wx.openSetting({
        success: function(t) {
          e.triggerEvent("setUserLocation", {
            userLoacation: t.authSetting["scope.userLocation"]
          })
        }
      })
    },
    chooseLocation: function() {
      var e = this;
      wx.chooseLocation({
        success: function(t) {
          var o = t.name,
            n = t.latitude,
            a = t.longitude;
          o && e.triggerEvent("chooseLocation", {
            name: o,
            latitude: n,
            longitude: a
          })
        }
      })
    },
    jumpToHKApp: function() {
      wx.navigateToMiniProgram({
        appId: "wx0304780e5844c076",
        path: "pages/store/index",
        extraData: {},
        envVersion: "trial",
        success: function(e) {
          console.log("打开成功", e)
        }
      })
    }
  }
});
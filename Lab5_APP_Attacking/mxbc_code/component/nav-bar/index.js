Component({
  options: {
    styleIsolation: "apply-shared",
    multipleSlots: !0
  },
  externalClasses: ["custom-class"],
  properties: {
    inline: {
      type: Boolean,
      value: !1
    },
    useDialog: {
      type: Boolean,
      value: !1
    },
    useHome: {
      type: Boolean,
      value: !1
    },
    useBack: {
      type: Boolean,
      value: !1
    },
    title: {
      type: String,
      value: ""
    },
    titlePostion: {
      type: String,
      value: "left"
    },
    customStyle: {
      type: String,
      value: ""
    }
  },
  data: {
    statusBarHeight: 0,
    navBarHeight: 0,
    menuButtonWidth: 0
  },
  ready: function() {
    var t = getApp().globalData,
      e = t.statusBarHeight,
      a = void 0 === e ? 44 : e,
      i = t.navBarHeight,
      s = void 0 === i ? 40 : i,
      n = t.menuButtonWidth,
      l = void 0 === n ? 87 : n;
    this.setData({
      statusBarHeight: a,
      navBarHeight: s,
      menuButtonWidth: l
    })
  },
  methods: {
    pageBack: function() {
      if (this.data.useDialog) this.triggerEvent("back");
      else if (this.data.useHome) wx.switchTab({
        url: "/pages/index/index"
      });
      else {
        var t;
        (null === (t = getCurrentPages()) || void 0 === t ? void 0 : t.length) > 1 ? wx.navigateBack() : wx.switchTab({
          url: "/pages/index/index"
        })
      }
    }
  }
});
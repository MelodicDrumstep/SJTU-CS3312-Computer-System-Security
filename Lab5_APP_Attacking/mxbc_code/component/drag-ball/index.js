Component({
  properties: {
    bgImage: {
      type: String,
      value: ""
    },
    style: {
      type: String,
      value: "width:128rpx;height:128rpx"
    },
    moveArea: {
      type: String,
      value: "width:100%;height:100%"
    }
  },
  data: {
    isFold: !0,
    x: 315,
    y: 559
  },
  ready: function() {
    var t = this;
    wx.getSystemInfo({
      success: function(e) {
        t.setData({
          x: e.windowWidth - 60,
          y: e.windowHeight - 60
        })
      }
    })
  },
  methods: {
    onClick: function() {
      this.triggerEvent("onClickEvent")
    }
  }
});
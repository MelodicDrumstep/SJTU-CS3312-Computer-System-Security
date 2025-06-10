Component({
  options: {
    styleIsolation: "apply-shared"
  },
  data: {
    guidanceContentVo: {}
  },
  attached: function() {
    this.setData({
      guidanceContentVo: getApp().configData.guidanceContentVo || {}
    })
  },
  methods: {
    onClick: function() {
      getApp().trackEvent("My_App"), getApp().navigate(this.data.guidanceContentVo.linkAddress)
    }
  }
});
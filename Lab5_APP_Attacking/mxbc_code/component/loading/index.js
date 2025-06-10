Component({
  options: {},
  behaviors: [],
  properties: {
    show: {
      type: Boolean,
      value: !1,
      observer: function(e) {
        this.setData({
          visible: e
        })
      }
    }
  },
  data: {
    visible: !1
  }
});
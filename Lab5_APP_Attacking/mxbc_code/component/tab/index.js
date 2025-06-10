Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    currentTab: {
      type: Number,
      value: 0
    },
    sticky: {
      type: Boolean,
      value: !1
    },
    lineWidth: {
      type: Number,
      value: 30
    },
    width: {
      type: String,
      value: ""
    },
    height: {
      type: String,
      value: ""
    }
  },
  observers: {
    currentTab: function(e) {
      this.setData({
        activeIndex: e
      })
    }
  },
  data: {
    activeIndex: 0
  },
  methods: {
    toggleTab: function(e) {
      var t = e.currentTarget.dataset.index;
      this.setData({
        activeIndex: t
      }), this.triggerEvent("change", {
        index: t
      })
    }
  }
});
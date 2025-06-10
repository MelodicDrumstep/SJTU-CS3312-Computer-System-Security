Component({
  options: {
    styleIsolation: "apply-shared",
    multipleSlots: !0
  },
  externalClasses: ["custom-class"],
  properties: {
    show: {
      type: Boolean,
      value: !1
    },
    data: {
      type: Array,
      value: []
    },
    checked: {
      type: Number,
      value: 0
    }
  },
  data: {
    value: []
  },
  methods: {
    onChange: function(e) {
      var t = e.detail.value;
      this.setData({
        value: +t
      })
    },
    onClose: function() {
      this.triggerEvent("close")
    },
    onSave: function() {
      this.onClose(), this.triggerEvent("change", {
        value: this.data.value
      })
    }
  }
});
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    maxLength: {
      type: Number,
      value: 20
    },
    placeholder: {
      type: String,
      value: ""
    },
    value: {
      type: String,
      value: ""
    },
    type: {
      type: String,
      value: "textarea"
    },
    clearable: {
      type: Boolean,
      value: !1
    }
  },
  data: {
    length: 0
  },
  methods: {
    onInput: function(e) {
      this.setData({
        value: e.detail.value
      })
    },
    clearValue: function() {
      this.setData({
        value: ""
      })
    }
  }
});
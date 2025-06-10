Component({
  options: {
    multipleSlots: !0
  },
  properties: {
    title: {
      type: String,
      value: ""
    },
    content: {
      type: String,
      value: ""
    },
    placeholder: {
      type: String,
      value: ""
    },
    value: {
      type: String,
      value: ""
    },
    border: {
      type: Boolean,
      value: !0
    },
    errorMessage: {
      type: String,
      value: ""
    },
    isLink: {
      type: Boolean,
      value: !1
    }
  },
  data: {},
  methods: {
    onClick: function() {
      this.triggerEvent("click")
    }
  }
});
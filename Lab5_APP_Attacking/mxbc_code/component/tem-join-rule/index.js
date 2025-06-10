Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    data: {
      type: String,
      value: ""
    }
  },
  methods: {
    close: function() {
      this.triggerEvent("close")
    }
  }
});
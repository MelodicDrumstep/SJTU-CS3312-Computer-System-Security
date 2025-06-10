Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },
  methods: {
    close: function() {
      this.triggerEvent("close")
    }
  }
});
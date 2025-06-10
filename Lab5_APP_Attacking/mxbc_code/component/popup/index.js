var e = require("../../@babel/runtime/helpers/defineProperty");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    show: {
      type: Boolean,
      value: !1
    },
    animation: {
      type: Boolean,
      value: !0
    },
    mask: {
      type: Boolean,
      value: !0
    },
    zIndex: {
      type: String,
      value: "100"
    },
    customStyle: {
      type: String,
      value: ""
    },
    position: {
      type: String,
      value: "center"
    }
  },
  data: {
    createDom: !1,
    openPopup: !1
  },
  observers: {
    show: function(t) {
      var o, a, i = this;
      clearTimeout(this.timer), this.timer = null, t ? (o = ["createDom", "openPopup"], a = 50) : (o = ["openPopup", "createDom"], a = 300), this.setData(e({}, o[0], t)), this.timer = setTimeout((function() {
        i.setData(e({}, o[1], t)), clearTimeout(i.timer), i.timer = null
      }), a)
    }
  },
  methods: {
    closePopup: function() {
      this.triggerEvent("close")
    },
    preventDefault: function() {}
  }
});
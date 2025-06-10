var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("@/env");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    medalInfo: {
      type: Object,
      value: {}
    },
    type: {
      type: String,
      value: "index"
    }
  },
  methods: {
    onTap: function() {
      var a = this;
      return r(e().mark((function r() {
        var n;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              n = "".concat(t.baseUrl_Web, "/#/myMedal?disShare=1&needToken=2&id=").concat(a.data.medalInfo.id), getApp().navigate(n);
            case 2:
            case "end":
              return e.stop()
          }
        }), r)
      })))()
    }
  }
});
var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../../@babel/runtime/helpers/asyncToGenerator");
Page({
  data: {
    options: {}
  },
  onLoad: function(t) {
    var n = this;
    return r(e().mark((function r() {
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            console.log(t), n.setData({
              options: t
            });
          case 2:
          case "end":
            return e.stop()
        }
      }), r)
    })))()
  }
});
var e = require("@/mixins/index");
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  externalClasses: ["custom-class"],
  properties: {
    product: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: {
    selectNames: "",
    statusObj: {
      2: "sale-down",
      3: "sale-out",
      4: "sale-lose"
    }
  },
  observers: {
    product: function(t) {
      var s = t.cupName,
        a = t.specs,
        c = t.attrs,
        o = t.comboProductDetail,
        r = t.combos || o,
        n = "";
      n = r && r[0] ? r.reduce((function(t, s) {
        var a = s.productName,
          c = s.productAmount,
          o = s.cupName,
          r = s.specs,
          n = s.attrs,
          u = (0, e.generateSelectName)(o, r, n);
        return t + "".concat(a).concat(u ? "（".concat(u, "）") : "", " x ").concat(c, "\n")
      }), "") : (0, e.generateSelectName)(s, a, c), t.selectNames = n, this.setData({
        selectNames: n
      })
    }
  }
});
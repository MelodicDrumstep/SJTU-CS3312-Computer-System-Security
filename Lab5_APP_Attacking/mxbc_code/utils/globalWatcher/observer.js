Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e = require("../../@babel/runtime/helpers/classCallCheck"),
  s = require("../../@babel/runtime/helpers/createClass"),
  t = function() {
    function t() {
      e(this, t), this.subscribers = {}
    }
    return s(t, [{
      key: "add",
      value: function(e, s) {
        this.subscribers[e] || (this.subscribers[e] = []), this.subscribers[e].push(s)
      }
    }, {
      key: "delete",
      value: function() {}
    }, {
      key: "notify",
      value: function(e, s) {
        this.subscribers[e] && this.subscribers[e].forEach((function(t) {
          t.update && "function" == typeof t.update && t.update(e, s)
        }))
      }
    }]), t
  }();
exports.default = t, t.globalDataObserver = new t;
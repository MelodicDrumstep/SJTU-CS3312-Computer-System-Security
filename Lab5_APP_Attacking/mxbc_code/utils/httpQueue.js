Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e = require("../@babel/runtime/helpers/classCallCheck"),
  t = require("../@babel/runtime/helpers/createClass"),
  u = new(function() {
    function u() {
      e(this, u), this.httpQueue = {}
    }
    return t(u, [{
      key: "add",
      value: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {};
        this.has(e) ? this.httpQueue[e].push(t) : (this.httpQueue[e] = [t], u())
      }
    }, {
      key: "delete",
      value: function(e) {
        delete this.httpQueue[e]
      }
    }, {
      key: "has",
      value: function(e) {
        return this.httpQueue.hasOwnProperty(e)
      }
    }, {
      key: "get",
      value: function(e) {
        return this.httpQueue[e]
      }
    }]), u
  }());
exports.default = u;
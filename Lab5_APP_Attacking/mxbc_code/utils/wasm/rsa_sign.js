Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = function(e, r) {
  return m.apply(this, arguments)
};
var e, r = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../@babel/runtime/helpers/asyncToGenerator"),
  t = (e = require("../httpQueue")) && e.__esModule ? e : {
    default: e
  };
require("./textencoder");
var a = global.TextDecoder,
  u = global.TextEncoder,
  i = new a("utf-8", {
    ignoreBOM: !0,
    fatal: !0
  });
i.decode();
var o, s = 0,
  c = new Uint8Array,
  f = new Int32Array,
  l = "wasm_init_queue",
  d = {
    wbg: {
      __wbindgen_throw: function(e, r) {
        throw new Error(p(e, r))
      }
    }
  };

function _() {
  return b.apply(this, arguments)
}

function b() {
  return (b = n(r().mark((function e() {
    return r().wrap((function(e) {
      for (;;) switch (e.prev = e.next) {
        case 0:
          return e.abrupt("return", new Promise((function(e) {
            t.default.add(l, {
              res: e
            }, (function() {
              var e = t.default.get(l);
              WXWebAssembly.instantiate("/utils/wasm/rsa_sign_bg.wasm.br", d).then((function(r) {
                var n = r.instance;
                for (o = n.exports, f = new Int32Array, c = new Uint8Array; e.length;) e.shift().res();
                t.default.delete(l)
              }))
            }))
          })));
        case 1:
        case "end":
          return e.stop()
      }
    }), e)
  })))).apply(this, arguments)
}
var w = new u("utf-8");

function p(e, r) {
  return i.decode(v().subarray(e, e + r))
}
var g = "function" == typeof w.encodeInto ? function(e, r) {
  return w.encodeInto(e, r)
} : function(e, r) {
  var n = w.encode(e);
  return r.set(n), {
    read: e.length,
    written: n.length
  }
};

function h(e, r, n) {
  if (void 0 === n) {
    var t = w.encode(e),
      a = r(t.length);
    return v().subarray(a, a + t.length).set(t), s = t.length, a
  }
  for (var u = e.length, i = r(u), o = v(), c = 0; c < u; c++) {
    var f = e.charCodeAt(c);
    if (f > 127) break;
    o[i + c] = f
  }
  if (c !== u) {
    0 !== c && (e = e.slice(c)), i = n(i, u, u = c + 3 * e.length);
    var l = v().subarray(i + c, i + u);
    c += g(e, l).written
  }
  return s = c, i
}

function y() {
  return 0 === f.byteLength && (f = new Int32Array(o.memory.buffer)), f
}

function v() {
  return 0 === c.byteLength && (c = new Uint8Array(o.memory.buffer)), c
}

function m() {
  return (m = n(r().mark((function e(n, t) {
    var a, u, i, c, f, l, d;
    return r().wrap((function(e) {
      for (;;) switch (e.prev = e.next) {
        case 0:
          if (o) {
            e.next = 3;
            break
          }
          return e.next = 3, _();
        case 3:
          return e.prev = 3, a = o.__wbindgen_add_to_stack_pointer(-16), u = h(n, o.__wbindgen_malloc, o.__wbindgen_realloc), i = s, c = h(t, o.__wbindgen_malloc, o.__wbindgen_realloc), f = s, o.rsa_sign(a, u, i, c, f), l = y()[a / 4 + 0], d = y()[a / 4 + 1], e.abrupt("return", p(l, d));
        case 13:
          return e.prev = 13, o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_free(l, d), e.finish(13);
        case 17:
        case "end":
          return e.stop()
      }
    }), e, null, [
      [3, , 13, 17]
    ])
  })))).apply(this, arguments)
}
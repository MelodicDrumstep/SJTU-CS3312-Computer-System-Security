var t = require("../@babel/runtime/helpers/typeof");
! function(n, r) {
  var e, o;
  "object" == ("undefined" == typeof exports ? "undefined" : t(exports)) && "undefined" != typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define(r) : (e = n.Base64, (o = r()).noConflict = function() {
    return n.Base64 = e, o
  }, n.Meteor && (Base64 = o), n.Base64 = o)
}("undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : void 0, (function() {
  var t, n = "function" == typeof atob,
    r = "function" == typeof btoa,
    e = "function" == typeof Buffer,
    o = "function" == typeof TextDecoder ? new TextDecoder : void 0,
    u = "function" == typeof TextEncoder ? new TextEncoder : void 0,
    i = Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="),
    f = (t = {}, i.forEach((function(n, r) {
      return t[n] = r
    })), t),
    c = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,
    a = String.fromCharCode.bind(String),
    d = "function" == typeof Uint8Array.from ? Uint8Array.from.bind(Uint8Array) : function(t) {
      return new Uint8Array(Array.prototype.slice.call(t, 0))
    },
    s = function(t) {
      return t.replace(/=/g, "").replace(/[+\/]/g, (function(t) {
        return "+" == t ? "-" : "_"
      }))
    },
    l = function(t) {
      return t.replace(/[^A-Za-z0-9\+\/]/g, "")
    },
    h = function(t) {
      for (var n, r, e, o, u = "", f = t.length % 3, c = 0; c < t.length;) {
        if ((r = t.charCodeAt(c++)) > 255 || (e = t.charCodeAt(c++)) > 255 || (o = t.charCodeAt(c++)) > 255) throw new TypeError("invalid character found");
        u += i[(n = r << 16 | e << 8 | o) >> 18 & 63] + i[n >> 12 & 63] + i[n >> 6 & 63] + i[63 & n]
      }
      return f ? u.slice(0, f - 3) + "===".substring(f) : u
    },
    p = r ? function(t) {
      return btoa(t)
    } : e ? function(t) {
      return Buffer.from(t, "binary").toString("base64")
    } : h,
    y = e ? function(t) {
      return Buffer.from(t).toString("base64")
    } : function(t) {
      for (var n = [], r = 0, e = t.length; r < e; r += 4096) n.push(a.apply(null, t.subarray(r, r + 4096)));
      return p(n.join(""))
    },
    A = function(t, n) {
      return void 0 === n && (n = !1), n ? s(y(t)) : y(t)
    },
    b = function(t) {
      if (t.length < 2) return (n = t.charCodeAt(0)) < 128 ? t : n < 2048 ? a(192 | n >>> 6) + a(128 | 63 & n) : a(224 | n >>> 12 & 15) + a(128 | n >>> 6 & 63) + a(128 | 63 & n);
      var n = 65536 + 1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320);
      return a(240 | n >>> 18 & 7) + a(128 | n >>> 12 & 63) + a(128 | n >>> 6 & 63) + a(128 | 63 & n)
    },
    g = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
    B = function(t) {
      return t.replace(g, b)
    },
    x = e ? function(t) {
      return Buffer.from(t, "utf8").toString("base64")
    } : u ? function(t) {
      return y(u.encode(t))
    } : function(t) {
      return p(B(t))
    },
    C = function(t, n) {
      return void 0 === n && (n = !1), n ? s(x(t)) : x(t)
    },
    m = function(t) {
      return C(t, !0)
    },
    v = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,
    U = function(t) {
      switch (t.length) {
        case 4:
          var n = ((7 & t.charCodeAt(0)) << 18 | (63 & t.charCodeAt(1)) << 12 | (63 & t.charCodeAt(2)) << 6 | 63 & t.charCodeAt(3)) - 65536;
          return a(55296 + (n >>> 10)) + a(56320 + (1023 & n));
        case 3:
          return a((15 & t.charCodeAt(0)) << 12 | (63 & t.charCodeAt(1)) << 6 | 63 & t.charCodeAt(2));
        default:
          return a((31 & t.charCodeAt(0)) << 6 | 63 & t.charCodeAt(1))
      }
    },
    F = function(t) {
      return t.replace(v, U)
    },
    w = function(t) {
      if (t = t.replace(/\s+/g, ""), !c.test(t)) throw new TypeError("malformed base64.");
      t += "==".slice(2 - (3 & t.length));
      for (var n, r, e, o = "", u = 0; u < t.length;) n = f[t.charAt(u++)] << 18 | f[t.charAt(u++)] << 12 | (r = f[t.charAt(u++)]) << 6 | (e = f[t.charAt(u++)]), o += 64 === r ? a(n >> 16 & 255) : 64 === e ? a(n >> 16 & 255, n >> 8 & 255) : a(n >> 16 & 255, n >> 8 & 255, 255 & n);
      return o
    },
    S = n ? function(t) {
      return atob(l(t))
    } : e ? function(t) {
      return Buffer.from(t, "base64").toString("binary")
    } : w,
    E = e ? function(t) {
      return d(Buffer.from(t, "base64"))
    } : function(t) {
      return d(S(t).split("").map((function(t) {
        return t.charCodeAt(0)
      })))
    },
    D = function(t) {
      return E(z(t))
    },
    R = e ? function(t) {
      return Buffer.from(t, "base64").toString("utf8")
    } : o ? function(t) {
      return o.decode(E(t))
    } : function(t) {
      return F(S(t))
    },
    z = function(t) {
      return l(t.replace(/[-_]/g, (function(t) {
        return "-" == t ? "+" : "/"
      })))
    },
    T = function(t) {
      return R(z(t))
    },
    Z = function(t) {
      return {
        value: t,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    },
    j = function() {
      var t = function(t, n) {
        return Object.defineProperty(String.prototype, t, Z(n))
      };
      t("fromBase64", (function() {
        return T(this)
      })), t("toBase64", (function(t) {
        return C(this, t)
      })), t("toBase64URI", (function() {
        return C(this, !0)
      })), t("toBase64URL", (function() {
        return C(this, !0)
      })), t("toUint8Array", (function() {
        return D(this)
      }))
    },
    I = function() {
      var t = function(t, n) {
        return Object.defineProperty(Uint8Array.prototype, t, Z(n))
      };
      t("toBase64", (function(t) {
        return A(this, t)
      })), t("toBase64URI", (function() {
        return A(this, !0)
      })), t("toBase64URL", (function() {
        return A(this, !0)
      }))
    },
    O = {
      version: "3.7.5",
      VERSION: "3.7.5",
      atob: S,
      atobPolyfill: w,
      btoa: p,
      btoaPolyfill: h,
      fromBase64: T,
      toBase64: C,
      encode: C,
      encodeURI: m,
      encodeURL: m,
      utob: B,
      btou: F,
      decode: T,
      isValid: function(t) {
        if ("string" != typeof t) return !1;
        var n = t.replace(/\s+/g, "").replace(/={0,2}$/, "");
        return !/[^\s0-9a-zA-Z\+/]/.test(n) || !/[^\s0-9a-zA-Z\-_]/.test(n)
      },
      fromUint8Array: A,
      toUint8Array: D,
      extendString: j,
      extendUint8Array: I,
      extendBuiltins: function() {
        j(), I()
      },
      Base64: {}
    };
  return Object.keys(O).forEach((function(t) {
    return O.Base64[t] = O[t]
  })), O
}));
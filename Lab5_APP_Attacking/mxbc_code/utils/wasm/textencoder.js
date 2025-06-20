var e = require("../../@babel/runtime/helpers/typeof");
! function(e) {
  function r() {}

  function n() {}
  var o = String.fromCharCode,
    t = {}.toString,
    i = t.call(e.SharedArrayBuffer),
    a = t(),
    f = e.Uint8Array,
    c = f || Array,
    l = f ? ArrayBuffer : c,
    d = l.isView || function(e) {
      return e && "length" in e
    },
    u = t.call(l.prototype);
  l = n.prototype;
  var s = e.TextEncoder,
    y = new(f ? Uint16Array : c)(32);
  r.prototype.decode = function(e) {
    if (!d(e)) {
      var r = t.call(e);
      if (r !== u && r !== i && r !== a) throw TypeError("Failed to execute 'decode' on 'TextDecoder': The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
      e = f ? new c(e) : e || []
    }
    for (var n, l, s, v = r = "", h = 0, p = 0 | e.length, g = p - 32 | 0, A = 0, b = 0, w = 0, T = -1; h < p;) {
      for (n = h <= g ? 32 : p - h | 0; w < n; h = h + 1 | 0, w = w + 1 | 0) {
        switch ((l = 255 & e[h]) >> 4) {
          case 15:
            if (2 != (s = 255 & e[h = h + 1 | 0]) >> 6 || 247 < l) {
              h = h - 1 | 0;
              break
            }
            A = (7 & l) << 6 | 63 & s, b = 5, l = 256;
          case 14:
            A <<= 6, A |= (15 & l) << 6 | 63 & (s = 255 & e[h = h + 1 | 0]), b = 2 == s >> 6 ? b + 4 | 0 : 24, l = l + 256 & 768;
          case 13:
          case 12:
            A <<= 6, A |= (31 & l) << 6 | 63 & (s = 255 & e[h = h + 1 | 0]), b = b + 7 | 0, h < p && 2 == s >> 6 && A >> b && 1114112 > A ? (l = A, 0 <= (A = A - 65536 | 0) && (T = 55296 + (A >> 10) | 0, l = 56320 + (1023 & A) | 0, 31 > w ? (y[w] = T, w = w + 1 | 0, T = -1) : (s = T, T = l, l = s))) : (h = h - (l >>= 8) - 1 | 0, l = 65533), A = b = 0, n = h <= g ? 32 : p - h | 0;
          default:
            y[w] = l;
            continue;
          case 11:
          case 10:
          case 9:
          case 8:
        }
        y[w] = 65533
      }
      if (v += o(y[0], y[1], y[2], y[3], y[4], y[5], y[6], y[7], y[8], y[9], y[10], y[11], y[12], y[13], y[14], y[15], y[16], y[17], y[18], y[19], y[20], y[21], y[22], y[23], y[24], y[25], y[26], y[27], y[28], y[29], y[30], y[31]), 32 > w && (v = v.slice(0, w - 32 | 0)), h < p) {
        if (y[0] = T, w = ~T >>> 31, T = -1, v.length < r.length) continue
      } else - 1 !== T && (v += o(T));
      r += v, v = ""
    }
    return r
  }, l.encode = function(e) {
    var r, n = 0 | (e = void 0 === e ? "" : "" + e).length,
      o = new c(8 + (n << 1) | 0),
      t = 0,
      i = !f;
    for (r = 0; r < n; r = r + 1 | 0, t = t + 1 | 0) {
      var a = 0 | e.charCodeAt(r);
      if (127 >= a) o[t] = a;
      else {
        if (2047 >= a) o[t] = 192 | a >> 6;
        else {
          e: {
            if (55296 <= a)
              if (56319 >= a) {
                var l = 0 | e.charCodeAt(r = r + 1 | 0);
                if (56320 <= l && 57343 >= l) {
                  if (65535 < (a = (a << 10) + l - 56613888 | 0)) {
                    o[t] = 240 | a >> 18, o[t = t + 1 | 0] = 128 | a >> 12 & 63, o[t = t + 1 | 0] = 128 | a >> 6 & 63, o[t = t + 1 | 0] = 128 | 63 & a;
                    continue
                  }
                  break e
                }
                a = 65533
              } else 57343 >= a && (a = 65533);!i && r << 1 < t && r << 1 < (t - 7 | 0) && (i = !0, (l = new c(3 * n)).set(o), o = l)
          }
          o[t] = 224 | a >> 12,
          o[t = t + 1 | 0] = 128 | a >> 6 & 63
        }
        o[t = t + 1 | 0] = 128 | 63 & a
      }
    }
    return f ? o.subarray(0, t) : o.slice(0, t)
  }, s || (e.TextDecoder = r, e.TextEncoder = n)
}("" + void 0 == ("undefined" == typeof global ? "undefined" : e(global)) ? "" + void 0 == ("undefined" == typeof self ? "undefined" : e(self)) ? void 0 : self : global);
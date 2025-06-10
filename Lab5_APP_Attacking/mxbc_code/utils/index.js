Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.formatDate = o;
var r = require("../@babel/runtime/helpers/toConsumableArray"),
  e = require("../@babel/runtime/helpers/createForOfIteratorHelper"),
  t = require("../@babel/runtime/helpers/typeof"),
  n = require("../@babel/runtime/helpers/defineProperty"),
  i = require("../@babel/runtime/helpers/slicedToArray");

function o(r) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd hh:mm:ss";
  if ("string" == typeof r) return r;
  if (!r || null == r) return null;
  var t = {
    "M+": r.getMonth() + 1,
    "d+": r.getDate(),
    "h+": r.getHours(),
    "m+": r.getMinutes(),
    "s+": r.getSeconds(),
    "q+": Math.floor((r.getMonth() + 3) / 3),
    S: r.getMilliseconds()
  };
  for (var n in /(y+)/.test(e) && (e = e.replace(RegExp.$1, (r.getFullYear() + "").substr(4 - RegExp.$1.length))), t) new RegExp("(" + n + ")").test(e) && (e = e.replace(RegExp.$1, 1 === RegExp.$1.length ? t[n] : ("00" + t[n]).substr(("" + t[n]).length)));
  return e
}

function a(r) {
  return r * Math.PI / 180
}
var u = {
  getStorage: function(r) {
    var e = wx.getStorageSync(r);
    if (!e || !e.length) return [];
    var t = parseInt(Date.now() / 1e3),
      n = e.filter((function(r) {
        return r.expired > t
      }));
    return wx.setStorageSync(r, n), n.map((function(r) {
      return r.value
    }))
  },
  setStorage: function(r, e, t) {
    var n = wx.getStorageSync(r),
      i = {
        value: e,
        expired: parseInt(Date.now() / 1e3) + t
      };
    if (n && n.length) {
      if (n.some((function(r) {
          return r.value === e
        }))) return n.map((function(r) {
        return r.value
      }));
      (n = n.slice(0, 19)).unshift(i)
    } else n = [i];
    return wx.setStorageSync(r, n), n.map((function(r) {
      return r.value
    }))
  },
  clearStorage: function(r) {
    wx.removeStorage({
      key: r
    })
  }
};
module.exports = {
  formatDate: o,
  getDistance: function(r, e, t, n) {
    if (!r || !t) return null;
    var i = a(r),
      o = a(t),
      u = i - o,
      l = a(e) - a(n),
      c = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(u / 2), 2) + Math.cos(i) * Math.cos(o) * Math.pow(Math.sin(l / 2), 2)));
    return c = (c *= 6378.137) < 1 ? (c = Math.round(1e3 * c)).toFixed(0) + "m" : (c = Math.round(1e4 * c) / 1e4).toFixed(1) + "km"
  },
  debounce: function(r, e, t, n) {
    var i;
    return function() {
      var o = n || this,
        a = arguments,
        u = function() {
          i = null, !t && r.apply(o, a)
        };
      clearTimeout(i);
      var l = t && !i;
      i = setTimeout(u, e), t && l && r.apply(o, a)
    }
  },
  throttle: function(r, e, t) {
    var n, i;
    return e || (e = 250),
      function() {
        var o = t || this,
          a = +new Date,
          u = arguments;
        a - n < e ? (clearTimeout(i), i = setTimeout((function() {
          n = a, r.apply(o, u)
        }), e)) : (n = a, r.apply(o, u))
      }
  },
  periodicArrStorage: u,
  uniqueArr: function(r, e) {
    var t = new Map;
    return r.filter((function(r) {
      return !t.has(r[e]) && t.set(r[e], 1)
    }))
  },
  getUrlParam: function(r) {
    var e = r.match(/([?&])(.+?=[^&]+)/gim);
    return e ? e.reduce((function(r, e) {
      var t = e.slice(1).split("="),
        o = i(t, 2),
        a = o[0],
        u = o[1];
      return Object.assign(r, n({}, a, u))
    }), {}) : {}
  },
  updUrlParam: function(r, e, t) {
    var n = e + "=" + t,
      i = new RegExp("(".concat(e, "=)([^&]*)"));
    return r.match(i) ? r.replace(i, n) : r.match("[?]") ? r + "&" + n : r + "?" + n
  },
  delUrlParam: function(r, e) {
    if (-1 == r.indexOf(e)) return r;
    for (var t = r.split("?"), n = t[0], i = t[1].split("&"), o = -1, a = 0; a < i.length; a++) {
      if (i[a].split("=")[0] == e) {
        o = a;
        break
      }
    }
    return -1 == o ? r : (i.splice(o, 1), n + "?" + i.join("&"))
  },
  isLatestVerison: function(r, e) {
    if (!r || !e || "string" != typeof r || "string" != typeof e) return !0;
    r = r.split(".").map((function(r) {
      return +r
    })), e = e.split(".").map((function(r) {
      return +r
    }));
    for (var t = 0; t < r.length; t++)
      if ((r[t] || 0) < (e[t] || 0)) return !1;
    return !0
  },
  splitSprice: function(r) {
    return r ? (r / 100).toString().split(".") : [0]
  },
  dealTime: function(r) {
    return (r && "string" == typeof r ? r.split(" ")[0] : "").replace(/-/g, ".")
  },
  createStrBeforeSign: function(r) {
    for (var e = "", t = Object.keys(r).sort(), n = 0; n < t.length; n++) {
      var i = t[n];
      (r[i] || 0 === r[i]) && (e += "".concat(n ? "&" : "").concat(i, "=").concat(r[i]))
    }
    return e
  },
  multiplyArray: function(r, e) {
    return new Array(r).fill(e).flat()
  },
  isObject: function(r) {
    return "[object Object]" === Object.prototype.toString.call(r)
  },
  filterNull: function r(e) {
    if (Array.isArray(e)) return e.map(r);
    if ("object" !== t(e) || null === e) return e;
    var n = {};
    for (var i in e) e.hasOwnProperty(i) && null !== e[i] && "" !== e[i] && (n[i] = r(e[i]));
    return n
  },
  debounceDouble: function(r, e) {
    var t;
    return function() {
      var n = this,
        i = arguments;
      clearTimeout(t), t || r.apply(n, i), t = setTimeout((function() {
        clearTimeout(t), t = null, r.apply(n, i)
      }), e)
    }
  },
  polyfillObj: function() {
    Object.fromEntries || (Object.fromEntries = function(r) {
      if (null == r) throw new TypeError("Object.fromEntries requires an iterable object");
      var n, i = {},
        o = e(r);
      try {
        for (o.s(); !(n = o.n()).done;) {
          var a = n.value;
          if ("object" !== t(a) || null === a) throw new TypeError("iterable for fromEntries should yield objects");
          var u = a[0],
            l = a[1];
          i[u] = l
        }
      } catch (r) {
        o.e(r)
      } finally {
        o.f()
      }
      return i
    })
  },
  isEmptyObject: function(r) {
    if (null == r) return !0;
    if (Array.isArray(r)) return 0 === r.length;
    if ("object" === t(r) && null !== r) {
      for (var e in r)
        if (r.hasOwnProperty(e)) return !1;
      return !0
    }
    return !1
  },
  formatDuration: function(r) {
    return {
      day: Math.floor(r / 86400),
      hour: Math.floor(r % 86400 / 3600),
      minute: Math.floor(r % 3600 / 60)
    }
  },
  padArray: function(e, t) {
    var n = e.slice(0, t),
      i = Math.max(t - e.length, 0),
      o = Array.from({
        length: i
      }, (function() {
        return {}
      }));
    return [].concat(r(n), o)
  }
};
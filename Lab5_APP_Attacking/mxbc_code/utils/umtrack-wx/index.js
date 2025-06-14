var e = require("../../@babel/runtime/helpers/typeof"),
  t = "[UMENG] -- ",
  n = function() {
    var e = null,
      n = !1;

    function i() {
      this.setDebug = function(e) {
        n = e
      }, this.d = function() {
        if (n) try {
          "string" == typeof arguments[0] && (arguments[0] = t + arguments[0]), console.debug.apply(console, arguments)
        } catch (e) {}
      }, this.i = function() {
        try {
          if (n) try {
            "string" == typeof arguments[0] && (arguments[0] = t + arguments[0]), console.info.apply(console, arguments)
          } catch (e) {}
        } catch (e) {}
      }, this.e = function() {
        if (n) try {
          "string" == typeof arguments[0] && (arguments[0] = t + arguments[0]), console.error.apply(console, arguments)
        } catch (e) {}
      }, this.w = function() {
        if (n) try {
          "string" == typeof arguments[0] && (arguments[0] = t + arguments[0]), console.warn.apply(console, arguments)
        } catch (e) {}
      }, this.v = function() {
        if (n) try {
          "string" == typeof arguments[0] && (arguments[0] = t + arguments[0]), console.log.apply(console, arguments)
        } catch (e) {}
      }, this.t = function() {
        if (n) try {
          console.table.apply(console, arguments)
        } catch (e) {}
      }, this.tip = function() {
        try {
          "string" == typeof arguments[0] && (arguments[0] = t + arguments[0]), console.log.apply(console, arguments)
        } catch (e) {}
      }, this.tip_w = function(e) {}, this.err = function() {
        try {
          "string" == typeof arguments[0] && (arguments[0] = t + arguments[0]), console.error.apply(console, arguments)
        } catch (e) {}
      }, this.repeat = function(e) {
        for (var t = e; t.length < 86;) t += e;
        return t
      }
    }
    return function() {
      return null === e && (e = new i), e
    }
  }(),
  i = function() {
    var e = null;

    function t() {
      var e = {};
      this.useOpenid = function() {
        return !!e.useOpenid
      }, this.useSwanid = function() {
        return !!e.useSwanid
      }, this.autoGetOpenid = function() {
        return !!e.autoGetOpenid
      }, this.appKey = function() {
        return e.appKey
      }, this.uploadUserInfo = function() {
        return e.uploadUserInfo
      }, this.enableVerify = function() {
        return e.enableVerify
      }, this.set = function(t) {
        e = t
      }, this.get = function() {
        return e
      }, this.setItem = function(t, n) {
        e[t] = n
      }, this.getItem = function(t) {
        return e[t]
      }
    }
    return function() {
      return e || (e = new t), e
    }
  }();

function r() {}
r.prototype = {
  on: function(e, t, n) {
    var i = this.e || (this.e = {});
    return (i[e] || (i[e] = [])).push({
      fn: t,
      ctx: n
    }), this
  },
  once: function(e, t, n) {
    var i = this;

    function r() {
      i.off(e, r), t.apply(n, arguments)
    }
    return r._ = t, this.on(e, r, n)
  },
  emit: function(e) {
    for (var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), i = 0, r = n.length; i < r; i++) n[i].fn.apply(n[i].ctx, t);
    return this
  },
  off: function(e, t) {
    var n = this.e || (this.e = {}),
      i = n[e],
      r = [];
    if (i && t)
      for (var o = 0, s = i.length; o < s; o++) i[o].fn !== t && i[o].fn._ !== t && r.push(i[o]);
    return r.length ? n[e] = r : delete n[e], this
  }
};
var o = new r;
o.messageType = {
  CONFIG_LOADED: 0,
  UMA_LIB_INITED: 1
};
var s = new(function() {
    function e() {}
    return e.prototype.setStorage = function(e, t, n) {
      wx.setStorage({
        key: e,
        data: t,
        success: function() {
          "function" == typeof n && n(!0)
        },
        fail: function() {
          "function" == typeof n && n(!1)
        }
      })
    }, e.prototype.getStorage = function(e, t) {
      wx.getStorage({
        key: e,
        success: function(e) {
          "function" == typeof t && t(e.data)
        },
        fail: function(i) {
          n().w(e + ": " + i.errMsg), "function" == typeof t && t()
        }
      })
    }, e.prototype.removeStorage = function(e, t) {
      wx.removeStorage({
        key: e,
        success: function() {
          "function" == typeof t && t(!0)
        },
        fail: function() {
          "function" == typeof t && t(!1)
        }
      })
    }, e.prototype.getSystemInfo = function(e) {
      wx.getSystemInfo({
        success: function(t) {
          t.safeArea = t.safeArea || {};
          var n = "";
          t.host && "string" == typeof t.host.env && (n = t.host.env);
          var i = {
              model: t.model,
              brand: t.brand,
              pixelRatio: t.pixelRatio,
              screenWidth: t.screenWidth,
              screenHeight: t.screenHeight,
              fontSizeSetting: t.fontSizeSetting,
              platform: t.platform,
              platformVersion: t.version,
              platformSDKVersion: t.SDKVersion,
              language: t.language,
              deviceName: t.model,
              OSVersion: t.system,
              resolution: "",
              theme: t.theme,
              benchmarkLevel: t.benchmarkLevel,
              safeArea: {
                width: t.safeArea.width,
                height: t.safeArea.height,
                top: t.safeArea.top,
                left: t.safeArea.left,
                bottom: t.safeArea.bottom,
                right: t.safeArea.right
              },
              statusBarHeight: t.statusBarHeight,
              host: n
            },
            r = t.system.split(" ");
          Array.isArray(r) && (i.OS = r[0]);
          var o = Math.round(t.screenWidth * t.pixelRatio),
            s = Math.round(t.screenHeight * t.pixelRatio);
          i.resolution = o > s ? o + "*" + s : s + "*" + o, "function" == typeof e && e(i)
        },
        fail: function() {
          "function" == typeof e && e()
        }
      })
    }, e.prototype.getDeviceInfo = function(e) {
      "function" == typeof e && e("")
    }, e.prototype.checkNetworkAvailable = function(e) {
      wx.getNetworkType({
        success: function(t) {
          "function" == typeof e && e(t && "none" !== t.networkType)
        },
        fail: function() {
          "function" == typeof e && e(!1)
        }
      })
    }, e.prototype.getNetworkInfo = function(e) {
      wx.getNetworkType({
        success: function(t) {
          "function" == typeof e && e({
            networkAvailable: "none" !== t.networkType,
            networkType: t.networkType
          })
        },
        fail: function() {
          "function" == typeof e && e()
        }
      })
    }, e.prototype.getDeviceId = function(e) {
      e("")
    }, e.prototype.getAdvertisingId = function(e) {
      "function" == typeof e && e("")
    }, e.prototype.onNetworkStatusChange = function(e) {
      wx.onNetworkStatusChange((function(t) {
        "function" == typeof e && e(t.isConnected)
      }))
    }, e.prototype.request = function(e) {
      var t = e.success,
        n = e.fail,
        i = !1,
        r = null;
      e.success = function(e) {
        i || (r && clearTimeout(r), "function" == typeof t && t(e))
      }, e.fail = function() {
        i || (r && clearTimeout(r), "function" == typeof n && n(!1))
      }, wx.request(e), r = setTimeout((function() {
        r && clearTimeout(r), i = !0, "function" == typeof n && n(i)
      }), e.timeout || 5e3)
    }, e.prototype.getSdkType = function() {
      return "wxmp"
    }, e.prototype.getPlatform = function() {
      return "wx"
    }, e.prototype.getUserInfo = function(e) {
      e()
    }, e.prototype.getAppInfoSync = function() {
      if (wx.getAccountInfoSync) {
        var e = wx.getAccountInfoSync(),
          t = e && e.miniProgram ? e.miniProgram : {};
        return {
          appId: t.appId,
          appEnv: t.envVersion,
          appVersion: t.version
        }
      }
      return {}
    }, e.prototype.onShareAppMessage = function(e) {
      wx.onShareAppMessage(e)
    }, e.prototype.shareAppMessage = function(e) {
      wx.shareAppMessage(e)
    }, e.prototype.getLaunchOptionsSync = function() {
      var e = null;
      if (e) return e;
      if (!wx.getLaunchOptionsSync) return {};
      try {
        e = wx.getLaunchOptionsSync()
      } catch (t) {
        e = null
      }
      return e || {}
    }, e
  }()),
  a = function(e, t) {
    return (a = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function(e, t) {
        e.__proto__ = t
      } || function(e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
      })(e, t)
  };

function u(e, t) {
  function n() {
    this.constructor = e
  }
  a(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
}
var c, f = {
    SESSION_INTERVAL: 3e4,
    LOG_URL: "/wxm_logs",
    GET_OPENID_URL: "/uminiprogram_logs/wx/getuut",
    USERINFO_URL: "/uminiprogram_logs/comm/uif",
    ENDPOINT: "https://umini.shujupie.com",
    ENDPOINTB: "https://ulogs.umeng.com",
    DEVICE_INFO_KEY: "device_info",
    ADVERTISING_ID: "mobile_ad_id",
    ANDROID_ID: "android_id",
    CURRENT_SESSION: "current_session",
    SESSION_PAUSE_TIME: "session_pause_time",
    EVENT_SEND_DEFAULT_INTERVAL: 15e3,
    EVENT_LAST_SEND_TIME: "last_send_time",
    MAX_EVENTID_LENGTH: 128,
    MAX_PROPERTY_KEY_LENGTH: 256,
    MAX_PROPERTY_KEYS_COUNT: 100,
    REPORT_POLICY: "report_policy",
    REPORT_INTERVAL_TIME: "report_interval_time",
    REPORT_POLICY_START_SEND: "1",
    REPORT_POLICY_INTERVAL: "6",
    IMPRINT: "imprint",
    SEED_VERSION: "1.0.0",
    IMPL_VERSION: "2.8.0",
    ALIPAY_AVAILABLE_VERSION: "10.1.52",
    SHARE_PATH: "um_share_path",
    SHARES: "shares",
    REQUESTS: "requests",
    UUID: "um_uuid",
    UUID_SUFFIX: "ud",
    OPENID: "um_od",
    UNIONID: "um_unid",
    ALIPAYID: "um_alipayid",
    USERID: "um_userid",
    PROVIDER: "um_provider",
    SWANID: "um_swanid",
    ANONYMOUSID: "um_anonymousid",
    LAUNCH_OPTIONS: "LAUNCH_OPTIONS",
    UM_SSRC: "_um_ssrc",
    USER_INFO: "user_info",
    IS_ALIYUN: !1
  },
  p = function(e) {
    for (var t = "", n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], i = 0; i < Number(e); i++) t += n[Math.round(Math.random() * (n.length - 1))];
    return t
  },
  h = function(e) {
    return JSON.parse(JSON.stringify(e))
  },
  d = function(e, t) {
    return !(!e || !t || 0 === t.length || t.length > e.length) && e.substr(0, t.length) === t
  },
  l = function(e) {
    if (null == e) throw new TypeError("Cannot convert undefined or null to object");
    for (var t = Object(e), n = 1; n < arguments.length; n++) {
      var i = arguments[n];
      if (i)
        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
    }
    return t
  },
  g = function t(n, i) {
    if (n === i) return !0;
    if (n && "object" == e(n) && i && "object" == e(i)) {
      if (Object.keys(n).length !== Object.keys(i).length) return !1;
      for (var r in n) {
        if (Object.prototype.hasOwnProperty.call(i, r)) return !1;
        if (!t(n[r], i[r])) return !1
      }
      return !0
    }
    return !1
  },
  v = function(e, t) {
    if (!e) return "";
    if ("string" == typeof t && t.length) {
      var n = new RegExp("^" + t + "*");
      e = e.replace(n, "")
    } else e = e.replace(/^s*/, "");
    return e
  },
  _ = function(e) {
    return "function" == typeof e
  },
  y = function(e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this
    }
    return u(t, e), t.prototype.getOpenIdAsync = function(e, t) {
      var i = this;
      wx.login({
        success: function(r) {
          r.code ? s.request({
            url: f.ENDPOINT + f.GET_OPENID_URL,
            method: "GET",
            data: {
              key: e,
              code: r.code
            },
            success: function(e) {
              if (e && 200 === e.statusCode && e.data && e.data.data) {
                var n = e.data.data;
                return i.setOpenid(n.oid), i.setUnionid(n.uid), t && t(!0)
              }
              t && t()
            },
            fail: function(e) {
              n().v("wx request failed...", e), t && t()
            }
          }) : t && t()
        },
        fail: function() {
          t && t()
        }
      })
    }, t
  }(function(e) {
    function t() {
      var t = null !== e && e.apply(this, arguments) || this;
      return t._openid = "", t._unionid = "", t._useOpenid = !1, t
    }
    return u(t, e), t.prototype.initID = function(e) {
      var t = this;
      t._idType = t._useOpenid ? "openid" : "uuid", n().v("id type: ", t._idType), s.getStorage(f.UNIONID, (function(e) {
        t._unionid = e
      })), this._useOpenid ? s.getStorage(f.OPENID, (function(n) {
        t._openid = n, e && e()
      })) : e && e()
    }, t.prototype.setUseOpenid = function(e) {
      this._useOpenid = e
    }, t.prototype.setOpenid = function(e) {
      !this._openid && e && (this._openid = e, s.setStorage(f.OPENID, e))
    }, t.prototype.setUnionid = function(e) {
      !this._unionid && e && (this._unionid = e, s.setStorage(f.UNIONID, e))
    }, t.prototype.getIdTracking = function() {
      var t = e.prototype.getIdTracking.call(this);
      return this._openid && (t.openid = this._openid), this._unionid && (t.unionid = this._unionid), this._userid && (t.userid = this._userid), t
    }, t.prototype.getId = function() {
      return this._useOpenid ? this._openid : this._uuid
    }, t
  }(function() {
    function e() {
      this._uuid = "", this._userid = "", this._provider = "", this._idType = ""
    }
    return e.prototype.createUUID = function() {
      return p(10) + Date.now() + p(7) + f.UUID_SUFFIX
    }, e.prototype.initUUID = function(e) {
      var t = this;
      s.getStorage(f.UUID, (function(n) {
        n ? t._uuid = n : (t._uuid = t.createUUID(), s.setStorage(f.UUID, t._uuid)), e && e(n)
      }))
    }, e.prototype.initUserid = function() {
      var e = this;
      s.getStorage(f.USERID, (function(t) {
        !e._userid && t && (e._userid = t, n().v("userId is ", t))
      })), s.getStorage(f.PROVIDER, (function(t) {
        !e._provider && t && (e._provider = t, n().v("provider is ", t))
      }))
    }, e.prototype.init = function(e) {
      var t = this;
      t.initUUID((function() {
        t.initUserid(), t.initID(e)
      }))
    }, e.prototype.setUserid = function(e, t) {
      !this._userid && e && (this._userid = e, this._provider = t, s.setStorage(f.USERID, e), s.setStorage(f.PROVIDER, t))
    }, e.prototype.removeUserid = function() {
      this._userid = void 0, this._provider = void 0, s.removeStorageSync(f.USERID), s.removeStorageSync(f.PROVIDER)
    }, e.prototype.getUserId = function() {
      return this._userid
    }, e.prototype.getProvider = function() {
      return this._provider
    }, e.prototype.getIdType = function() {
      return this._idType
    }, e.prototype.getIdTracking = function() {
      var e = {};
      return this._uuid && (e.uuid = this._uuid), this._userid && (e.userid = this._userid), e
    }, e
  }())),
  m = (c = null, function() {
    return c || (c = new y), c
  }),
  S = function() {
    var e = null;

    function t() {
      var e = !1,
        t = null,
        n = [];
      this.addPageStart = function(n) {
        n && !e && (t = {
          ts: Date.now(),
          path: n,
          page_name: n
        }, e = !0)
      }, this.addPageEnd = function(i) {
        if (e && i && t && i === t.page_name) {
          var r = Date.now() - t.ts;
          t.duration = Math.abs(r), n.push(t), t = null, e = !1
        }
      }, this.get = function() {
        return n
      }, this.getCurrentPage = function() {
        return t
      }, this.clear = function() {
        n.length = 0
      }
    }
    return function() {
      return e || (e = new t), e
    }
  }(),
  I = {},
  O = function() {
    var e = null,
      t = [],
      i = "";

    function r() {
      return {
        add: function(e, r) {
          n().v("share origin: %o", e);
          var o = {
            title: e && e.title,
            path: e && e.path && e.path.split("?")[0],
            _um_sts: Date.now()
          };
          o.path && o.path.length > 1 && d(o.path, "/") && (o.path = v(o.path, "/"));
          var s = e.path || "",
            a = m().getId();
          if (a) {
            var u = i.split(","),
              c = (u = u.filter((function(e) {
                return e.length > 0
              }))).indexOf(a);
            c >= 0 && (u = u.slice(0, c)), u.length < 3 && u.push(a);
            var f = u.join(","); - 1 !== s.indexOf("?") ? s += "&_um_ssrc=" + f : s += "?_um_ssrc=" + f;
            var p = Date.now();
            if (s += "&_um_sts=" + p, r) {
              var h = function(e) {
                  var t = [];
                  for (var n in e) "_um_ssrc" !== n && "_um_sts" !== n && t.push(n + "=" + e[n]);
                  return t.join("&")
                }(I),
                l = h ? h + "&_um_ssrc=" + f + "&_um_sts=" + p : "_um_ssrc=" + f + "&_um_sts=" + p;
              e.query = e.query ? e.query + "&_um_ssrc=" + f + "&_um_sts=" + p : l
            } else e.path = s;
            o._um_ssrc = f, o._um_sts = p
          }
          return t.push(o), n().v("share: %o", e), e
        },
        setShareSource: function(e) {
          i = e
        },
        clear: function() {
          t.length = 0
        },
        get: function() {
          return t
        }
      }
    }
    return function() {
      return e || (e = new r), e
    }
  }(),
  A = function(e) {
    if (e) try {
      return JSON.stringify(e)
    } catch (e) {}
    return ""
  },
  E = function(e) {
    if (e) try {
      return JSON.parse(e)
    } catch (e) {}
    return null
  },
  T = function() {
    var e = null,
      t = "",
      n = null,
      r = !1;

    function o() {
      this.load = function(e) {
        n ? (s.removeStorage(t), e()) : (t = "um_cache_" + i().appKey(), s.getStorage(t, (function(i) {
          n = E(i) || {}, r = !0, s.removeStorage(t), e()
        })))
      }, this.save = function() {
        n && s.setStorage(t, A(n))
      }, this.set = function(e, t) {
        n && (n[e] = t)
      }, this.get = function(e) {
        return (n || {})[e]
      }, this.remove = function(e) {
        n && n[e] && delete n[e]
      }, this.getAll = function() {
        return n
      }, this.clear = function() {
        n = null
      }, this.has = function(e) {
        return !!this.get(e)
      }, this.isLoaded = function() {
        return r
      }
    }
    return function() {
      return e || (e = new o), e
    }
  }(),
  N = function() {
    var e, t, i = [],
      r = [];

    function o(e, n) {
      var i = (e = e || {})[t];
      return Array.isArray(i) && i.length ? e[t] = i.concat(n) : e[t] = [].concat(n), e
    }
    return function() {
      return e || (e = {
        addEvent: function(e) {
          t ? (i.unshift(e), i.length > 1 && (! function() {
            if (i.length) {
              var e = T().get("ekvs");
              (function(e) {
                var t = 0;
                for (var n in e) Array.isArray(e[n]) && (t += e[n].length);
                return t
              })(e) + i.length <= 1e4 && (e = o(e, i), T().set("ekvs", e))
            }
          }(), i.length = 0)) : (n().w("session id is null: ", t), r.unshift(e))
        },
        setSessionId: function(e) {
          if (t = e, n().v("setSessionId: ", t), Array.isArray(r) && r.length && t) {
            for (var i = 0; i < r.length; i++) this.addEvent(r[i]);
            r.length = 0
          }
        },
        getEkvs: function() {
          var e = T().get("ekvs");
          return i && i.length && (e = o(e, i)), e
        },
        clear: function() {
          T().remove("ekvs"), i.length = 0
        }
      }), e
    }
  }(),
  w = "half_session",
  k = "close_session",
  b = ["access", "access_subtype"],
  D = function() {
    var e = null;

    function t() {
      var e = !1,
        t = {};
      return {
        init: function() {
          ! function(e) {
            var n = T().get(f.IMPRINT);
            n && (t.imprint = n), t.device_type = "Phone", t.sdk_version = f.IMPL_VERSION, t.appkey = i().appKey(), s.getDeviceInfo((function(e) {
              t.device_info = e || ""
            }));
            var r = s.getAppInfoSync();
            t.appid = r.appId, t.app_env = r.appEnv, t.app_version = r.appVersion, s.getSystemInfo((function(n) {
              s.getNetworkInfo((function(i) {
                var r = function(e, t) {
                  var n = {};
                  (e = e || {}).safeArea = e.safeArea || {};
                  var i = (t = t || {}).networkType;
                  "none" === i && (i = "unknown");
                  var r = e.model || "",
                    o = e.platform || "",
                    a = e.brand || "",
                    u = a.toLowerCase();
                  switch (n.sdk_type = s.getSdkType(), n.platform = s.getPlatform(), n.platform_sdk_version = e.platformSDKVersion, n.platform_version = e.platformVersion, n.resolution = e.resolution, n.pixel_ratio = e.pixelRatio, n.os = o, n.font_size_setting = e.fontSizeSetting, n.device_model = r, n.device_brand = a, n.device_manufacturer = u, n.device_manuid = r, n.device_name = r, n.os_version = e.OSVersion, n.language = e.language, n.theme = e.theme, n.benchmark_level = e.benchmarkLevel, n.status_bar_height = e.statusBarHeight, n.safe_area_top = e.safeArea.top, n.safe_area_left = e.safeArea.left, n.safe_area_right = e.safeArea.right, n.safe_area_bottom = e.safeArea.bottom, n.safe_area_height = e.safeArea.height, n.safe_area_width = e.safeArea.width, n.storage = e.storage, n.screen_width = e.screenWidth, n.screen_height = e.screenHeight, n.host = e.host, i = i ? i.toLowerCase() : "") {
                    case "4g":
                      n.access_subtype = "LTE", n.access = "4G";
                      break;
                    case "3g":
                      n.access_subtype = "CDMA", n.access = "3G";
                      break;
                    case "2g":
                      n.access_subtype = "GRPS", n.access = "2G";
                      break;
                    default:
                      n.access = i, delete n.access_subtype
                  }
                  return n
                }(n, i);
                l(t, r), e && e()
              }))
            }))
          }((function() {
            e = !0
          }))
        },
        isLoaded: function() {
          return e
        },
        get: function() {
          return t
        },
        getRealtimeFields: function() {
          var e = {};
          return b.forEach((function(n) {
            e[n] = t[n]
          })), e
        },
        setIdTracking: function(e) {
          this.setItem("id_tracking", e)
        },
        setIdType: function(e) {
          this.setItem("id_type", e)
        },
        setAppVersion: function(e) {
          this.setItem("app_version", e)
        },
        setSuperProperty: function(e) {
          t.sp || (t.sp = {}), t.sp.isv = e
        },
        getSuperProperty: function() {
          return t && t.sp ? t.sp.isv : ""
        },
        setItem: function(e, n) {
          t[e] = n
        },
        getItem: function(e) {
          return t[e]
        }
      }
    }
    return {
      instance: function() {
        return e || (e = t()), e
      }
    }
  }(),
  U = function() {
    var e = null,
      t = null,
      i = null;
    return function() {
      return e || (e = {
        resume: function(e) {
          var r = !1;
          i || (i = T().get(f.CURRENT_SESSION));
          var o = new Date;
          return t = o.getTime(), !i || !i.end_time || t - i.end_time > f.SESSION_INTERVAL ? (r = !0, function(e) {
            try {
              var t = (i || {}).options || {},
                r = l({}, function(e) {
                  var t = {};
                  for (var i in e) 0 === i.indexOf("_um_") && (t[i] = e[i]);
                  return n().v("query: ", e), n().v("_um_params: ", t), t
                }(e.query));
              r.path = e.path || t.path, "gaode" !== s.getPlatform() && (r.scene = e.scene ? s.getPlatform() + "_" + e.scene : t.scene);
              var o = e.referrerInfo;
              o && (r.referrerAppId = o.appId), n().v("session options: ", r);
              var a = r[f.UM_SSRC];
              a && O().setShareSource(a);
              var u = Date.now();
              i = {
                id: p(10) + u,
                start_time: u,
                options: r
              }
            } catch (e) {
              n().e("生成新session失败: ", e)
            }
          }(e), n().v("开始新的session(%s): ", i.id, i)) : n().v("延续上一次session(%s): %s ", i.id, o.toLocaleTimeString(), i), r
        },
        pause: function() {
          ! function() {
            if (i) {
              var e = new Date;
              i.end_time = e.getTime(), "number" != typeof i.duration && (i.duration = 0), i.duration = i.end_time - t, T().set(f.CURRENT_SESSION, i), n().v("退出会话(%s): %s ", i.id, e.toLocaleTimeString(), i)
            }
          }()
        },
        getCurrentSessionId: function() {
          return (i || {}).id
        },
        getCurrentSession: function() {
          return i
        },
        cloneCurrentSession: function() {
          return h(i)
        }
      }), e
    }
  }();
var P = {
    sessions: "sn",
    ekvs: "e",
    active_user: "active_user"
  },
  R = {
    sdk_type: "sdt",
    access: "ac",
    access_subtype: "acs",
    device_model: "dm",
    language: "lang",
    device_type: "dt",
    device_manufacturer: "dmf",
    device_name: "dn",
    platform_version: "pv",
    id_type: "it",
    font_size_setting: "fss",
    os_version: "ov",
    device_manuid: "did",
    platform_sdk_version: "psv",
    device_brand: "db",
    appkey: "ak",
    _id: "id",
    id_tracking: "itr",
    imprint: "imp",
    sdk_version: "sv",
    resolution: "rl",
    testToken: "ttn",
    theme: "t5",
    benchmark_level: "bml",
    screen_width: "sw",
    screen_height: "sh",
    status_bar_height: "sbh",
    safe_area_top: "sat",
    safe_area_left: "sal",
    safe_area_right: "sar",
    safe_area_bottom: "sab",
    safe_area_height: "sah",
    safe_area_width: "saw",
    pixel_ratio: "pr",
    storage: "s7",
    host: "hs"
  },
  L = {
    uuid: "ud",
    unionid: "und",
    openid: "od",
    anonymousid: "nd",
    alipay_id: "ad",
    device_id: "dd",
    userid: "puid"
  };

function C(e, t) {
  var n = M(e, t);
  return e && e.id_tracking && (n[t.id_tracking || "id_tracking"] = M(e.id_tracking, L)), n
}

function M(e, t) {
  var n = {};
  for (var i in e) t[i] ? n[t[i]] = e[i] : n[i] = e[i];
  return n
}

function V(e, t) {
  var n = {};
  if (e)
    for (var i in e) e[i] && (n[t[i]] = e[i]);
  return n
}
var x = "";

function j() {
  return x
}
var G = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  F = function(e) {
    for (var t = {}, n = 0, i = e.length; n < i; n++) t[e.charAt(n)] = n;
    return t
  }(G),
  q = String.fromCharCode,
  K = function(e) {
    if (e.length < 2) return (t = e.charCodeAt(0)) < 128 ? e : t < 2048 ? q(192 | t >>> 6) + q(128 | 63 & t) : q(224 | t >>> 12 & 15) + q(128 | t >>> 6 & 63) + q(128 | 63 & t);
    var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
    return q(240 | t >>> 18 & 7) + q(128 | t >>> 12 & 63) + q(128 | t >>> 6 & 63) + q(128 | 63 & t)
  },
  H = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
  Y = function(e) {
    var t = [0, 2, 1][e.length % 3],
      n = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
    return [G.charAt(n >>> 18), G.charAt(n >>> 12 & 63), t >= 2 ? "=" : G.charAt(n >>> 6 & 63), t >= 1 ? "=" : G.charAt(63 & n)].join("")
  },
  J = function(e) {
    return function(e) {
      return e.replace(H, K)
    }(e).replace(/[\s\S]{1,3}/g, Y)
  },
  B = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"),
  X = function(e) {
    switch (e.length) {
      case 4:
        var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
        return q(55296 + (t >>> 10)) + q(56320 + (1023 & t));
      case 3:
        return q((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
      default:
        return q((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
    }
  },
  z = function(e) {
    var t = e.length,
      n = t % 4,
      i = (t > 0 ? F[e.charAt(0)] << 18 : 0) | (t > 1 ? F[e.charAt(1)] << 12 : 0) | (t > 2 ? F[e.charAt(2)] << 6 : 0) | (t > 3 ? F[e.charAt(3)] : 0),
      r = [q(i >>> 16), q(i >>> 8 & 255), q(255 & i)];
    return r.length -= [0, 0, 2, 1][n], r.join("")
  },
  Q = function(e) {
    return function(e) {
      return function(e) {
        return e.replace(/[\s\S]{1,4}/g, z)
      }(e).replace(B, X)
    }(String(e).replace(/[-_]/g, (function(e) {
      return "-" == e ? "+" : "/"
    })).replace(/[^A-Za-z0-9\+\/]/g, ""))
  },
  W = new function() {
    var e = "",
      t = this;
    this.set = function(t) {
      e = t
    }, this.get = function() {
      return e
    }, this.getImpObj = function() {
      return E(Q(e))
    }, this.getItem = function(e) {
      var n = t.getImpObj();
      return n && n[e] || ""
    }, this.load = function() {
      e = T().get(f.IMPRINT)
    }, this.save = function() {
      e && T().set(f.IMPRINT, e)
    }
  };

function Z(e, t, i, r) {
  D.instance().setIdType(m().getIdType()), D.instance().setIdTracking(m().getIdTracking());
  var o = m().getUserId();
  o && e.analytics && (e.analytics.active_user = {
    puid: o,
    provider: m().getProvider()
  });
  var a = h(D.instance().get());
  e.header = l(a, e.header, {
    ts: Date.now(),
    testToken: j(),
    traceId: p(10) + Date.now() + p(9)
  });
  var u = function(e) {
      return {
        h: C(e.header, R),
        a: V(e.analytics, P)
      }
    }(e),
    c = A(u),
    d = {
      url: f.ENDPOINT + f.LOG_URL,
      method: "POST",
      data: u,
      success: function(r) {
        var o = r.code || r.status || r.statusCode;
        200 === o || 413 === o ? (n().i("数据发送成功: ", e, c), function(e) {
          e && (D.instance().setItem(f.IMPRINT, e), W.set(e), W.save(), n().v("imprint: ", W.getImpObj()), W.getItem("ttn_invalid") && (x = ""))
        }((r.data || {}).imprint), "function" == typeof t && t(r)) : (n().w("数据发送失败: ", c), "function" == typeof i && i())
      },
      fail: function(e) {
        n().w("超时: ", c), "function" == typeof i && i()
      },
      complete: function() {
        "function" == typeof r && r()
      }
    };
  s.request(l(d, {
    header: {
      "Msg-Type": s.getSdkType() + "/json",
      "disable-base64": "Y"
    }
  }))
}

function $(e) {
  var t = e,
    n = [];
  this.enqueue = function(e) {
    "number" == typeof t && this.size() >= t && this.dequeue(), n.push(e)
  }, this.dequeue = function() {
    return n.shift()
  }, this.front = function() {
    return n[0]
  }, this.isEmpty = function() {
    return 0 === n.length
  }, this.clear = function() {
    n.length = 0
  }, this.size = function() {
    return n.length
  }, this.items = function() {
    return n
  }, this.print = function() {
    console.log(n.toString())
  }
}
var ee = function() {
    var e = null,
      t = !1,
      i = [],
      r = new $(50);

    function o(e, t, n) {
      if (D.instance().isLoaded()) {
        t = t || {};
        var i = function(e) {
          var t = null;
          switch (e) {
            case w:
              t = function() {
                var e = null,
                  t = U().cloneCurrentSession();
                return t && (e = {
                  header: {
                    st: "1"
                  },
                  analytics: {
                    sessions: [t]
                  }
                }), e
              }();
              break;
            case k:
              t = function() {
                var e = null,
                  t = {},
                  n = U().cloneCurrentSession();
                if (n) {
                  var i = S().get(),
                    r = O().get();
                  Array.isArray(i) && i.length && (n.pages = h(i)), Array.isArray(r) && r.length && (n.shares = h(r)), S().clear(), O().clear(), t.sessions = [n]
                }
                var o = N().getEkvs();
                return o && (t.ekvs = h(o), N().clear()), (t.sessions || t.ekvs) && (e = {
                  analytics: t
                }), e
              }();
              break;
            case "ekv":
              t = function() {
                var e = null,
                  t = N().getEkvs();
                return t && (e = {
                  analytics: {
                    ekvs: h(t)
                  }
                }, N().clear()), e
              }()
          }
          return t
        }(e);
        if (i) {
          var s = D.instance().getRealtimeFields();
          i.header = l({}, i.header, s), i.noCache = t.noCache, r.enqueue(i)
        }
        "function" == typeof n && n()
      } else setTimeout((function() {
        o(e, t, n)
      }), 100)
    }

    function s(e) {
      m().getId() ? t ? n().i("队列正在发送中") : (t = !0, function e(t) {
        var n = r.front();
        n ? Z(n, (function() {
          r.dequeue(), e(t)
        }), (function() {
          var n = r.dequeue();
          n && !n.noCache && i.push(n), e(t)
        })) : (i.forEach((function(e) {
          r.enqueue(e)
        })), i.length = 0, t())
      }((function() {
        t = !1, "function" == typeof e && e()
      }))) : (n().i("获取id标识失败，暂缓发送"), "function" == typeof e && e())
    }

    function a() {
      this.send = function(e, t, n) {
        e ? this.add(e, t, (function() {
          s(n)
        })) : s(n)
      }, this.add = function(e, t, n) {
        o(e, t, n)
      }, this.load = function() {
        var e = T().get(f.REQUESTS);
        e && e.length && e.forEach((function(e) {
          r.enqueue(e)
        })), T().remove(f.REQUESTS)
      }, this.save = function() {
        T().set(f.REQUESTS, h(r.items())), r.clear()
      }
    }
    return function() {
      return e || (e = new a), e
    }
  }(),
  te = function() {
    var t = null,
      r = null;

    function o() {
      function t(t) {
        if (t && "object" == e(t)) {
          var r = T().get(f.USER_INFO);
          return r && g(t, r) || function(e, t) {
            var r = i().appKey(),
              o = s.getSdkType(),
              a = m().getId(),
              u = m().getIdType();
            if (r && o && a && u) {
              var c = {
                  ak: i().appKey(),
                  sdt: s.getSdkType(),
                  uin: e.nickName,
                  uia: e.avatar || e.avatarUrl,
                  uig: e.gender,
                  uit: e.country,
                  uip: e.province,
                  uic: e.city,
                  uil: e.language,
                  id: m().getId(),
                  it: m().getIdType(),
                  age: e.age,
                  cln: e.constellation
                },
                p = JSON.stringify(c);
              p = function(e, t) {
                return t ? J(String(e)).replace(/[+\/]/g, (function(e) {
                  return "+" == e ? "-" : "_"
                })).replace(/=/g, "") : J(String(e))
              }(p), s.request({
                url: f.ENDPOINT + f.USERINFO_URL,
                method: "POST",
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                data: "ui=" + p,
                success: function(i) {
                  n().v("用户信息上传成功: ", e), t && t(i && i.data && 200 === i.data.code)
                },
                fail: function() {
                  n().e("用户信息上传失败: ", e), t && t(!1)
                }
              })
            }
          }(t, (function(e) {
            e && T().set(f.USER_INFO, t)
          })), !0
        }
        return !1
      }
      this.setUserInfo = function(e) {
        r = e
      }, this.update = function() {
        t(r) || s.getUserInfo((function(e) {
          t(e)
        }))
      }
    }
    return function() {
      return t || (t = new o), t
    }
  }();

function ne(t, n) {
  this.id = t, this.ts = Date.now();
  var i = e(n);
  if ("string" === i && n) this[t] = n;
  else if ("object" === i)
    for (var r in n)({}).hasOwnProperty.call(n, r) && (this[r] = n[r])
}

function ie() {
  var t = !1,
    r = !1,
    o = 0;
  this.init = function(e) {
    n().v("sdk version: " + f.IMPL_VERSION), t ? n().v("Lib重复实例化") : T().load((function() {
      n().v("cache初始化成功: ", T().getAll()), m().setUseOpenid && m().setUseOpenid(i().useOpenid()), m().init((function() {
        D.instance().init(), n().v("Header初始化成功")
      })), t = !0, "function" == typeof e && e(), n().tip("SDK集成成功")
    }))
  }, this.resume = function(e) {
    var o;
    t && !r && (n().v("showOptions: ", e), r = !0, i().enableVerify() && e && e.query && (o = e.query._ttn, x = o || x), this._resume(e))
  }, this._resume = function(e) {
    ee().load();
    var t = U().resume(e),
      r = U().getCurrentSessionId();
    N().setSessionId(r), t && ee().add(w, {}, (function() {
      m().setUseOpenid && m().setUseOpenid(i().useOpenid()), i().useOpenid() && i().autoGetOpenid() && !m().getId() ? (n().v("get id async"), function e(t, r) {
        m().getId() || t <= 0 || m().getOpenIdAsync(i().appKey(), (function(i) {
          i ? (n().v("获取id成功"), ee().send()) : (n().v("获取openid失败,启动重试,剩余可用次数", t - 1), setTimeout((function() {
            e(t - 1, r)
          }), r))
        }))
      }(10, 3e3)) : (n().v("session auto send"), ee().send())
    }))
  }, this.pause = function(e) {
    t && (r = !1, o = 0, U().pause(), i().uploadUserInfo() && te().update(), ee().send(k, {}, (function() {
      ee().save(), T().save(), n().v("cache save success"), "function" == typeof e && e()
    })))
  }, this.setOpenid = function(e) {
    n().v("setOpenId: %s", e), m().setOpenid(e), ee().send()
  }, this.setUnionid = function(e) {
    n().v("setUnionid: %s", e), m().setUnionid(e)
  }, this.setUserid = function(e, t) {
    n().v("setUserid: %s", e, t), m().setUserid(e, t)
  }, this.removeUserid = function() {
    n().v("removeUserid"), m().removeUserid()
  }, this.setUserInfo = function(e) {
    n().v("setUserInfo: %s", e), te().setUserInfo(e)
  }, this.setAnonymousid = function(e) {
    n().v("setAnonymousId: %s", e), m().setAnonymousid(e), ee().send()
  }, this.setAppVersion = function(e) {
    e && "string" != typeof e ? n().w("setAppVersion方法只接受字符串类型参数") : D.instance().setAppVersion(e)
  }, this.setAlipayUserid = function(e) {
    e && "string" != typeof e ? n().w("setAlipayUserid方法只接受字符串类型参数") : (n().v("setAlipayUserid: %s", e), m().setAlipayUserid(e))
  }, this.setDeviceId = function(e) {
    if ("string" == typeof e) return m().setDeviceId(e), e
  }, this.setSuperProperty = function(e) {
    if (e && "string" != typeof e) n().w("超级属性只支持字符串类型");
    else {
      var t = this;
      D.instance().getSuperProperty() !== e && (D.instance().setSuperProperty(e), t.pause((function() {
        t.resume()
      })))
    }
  }, this.trackEvent = function(i, r) {
    if (t && (n().v("event: ", i, r), function(t, i) {
        if (!t || "string" != typeof t) return n().e('please check trackEvent id. id should be "string" and not null'), !1;
        var r = ["id", "ts", "du"],
          o = {};
        if (r.forEach((function(e) {
            o[e] = 1
          })), o[t]) return n().e("eventId不能与以下保留字冲突: " + r.join(",")), !1;
        if (t.length > f.MAX_EVENTID_LENGTH) return n().e("The maximum length of event id shall not exceed " + f.MAX_EVENTID_LENGTH), !1;
        if (i && ("object" != e(i) || Array.isArray(i)) && "string" != typeof i) return n().e("please check trackEvent properties. properties should be string or object(not include Array)"), !1;
        if ("object" == e(i)) {
          var s = 0;
          for (var a in i)
            if ({}.hasOwnProperty.call(i, a)) {
              if (a.length > f.MAX_PROPERTY_KEY_LENGTH) return n().e("The maximum length of property key shall not exceed " + f.MAX_PROPERTY_KEY_LENGTH), !1;
              if (s >= f.MAX_PROPERTY_KEYS_COUNT) return n().e("The maximum count of properties shall not exceed " + f.MAX_PROPERTY_KEYS_COUNT), !1;
              if (o[a]) return n().e("属性中的key不能与以下保留字冲突: " + r.join(",")), !1;
              s += 1
            }
        }
        return !0
      }(i, r))) {
      var s = new ne(i, r);
      N().addEvent(s);
      var a = !!j(),
        u = a ? 0 : f.EVENT_SEND_DEFAULT_INTERVAL,
        c = Date.now();
      (function(e, t) {
        return "number" != typeof o || "number" != typeof t || o <= 0 || e - o > t
      })(c, u) && (o = c, ee().send("ekv", {
        noCache: a
      }, (function() {})))
    }
  }, this.trackShare = function(e) {
    if (t) try {
      s.getSdkType().indexOf("game") > -1 ? (e = O().add(e, !0), n().v("shareQuery: ", e)) : (e = O().add(e, !1), n().v("sharePath: ", e.path))
    } catch (e) {
      n().v("shareAppMessage: ", e)
    }
    return e
  }, this.trackPageStart = function(e) {
    t && S().addPageStart(e)
  }, this.trackPageEnd = function(e) {
    t && S().addPageEnd(e)
  }, this.onShareAppMessage = function(e) {
    var t = this;
    s.onShareAppMessage((function() {
      return t.trackShare(e())
    }))
  }, this.shareAppMessage = function(e) {
    this.trackShare(e), s.shareAppMessage(e)
  }
}
var re = [];

function oe() {}
oe.prototype = {
  createMethod: function(e, t, i) {
    try {
      e[t] = i && i[t] ? function() {
        return i[t].apply(i, arguments)
      } : function() {
        re.push([t, [].slice.call(arguments)])
      }
    } catch (e) {
      n().v("create method errror: ", e)
    }
  },
  installApi: function(e, t) {
    try {
      var i, r, o = "resume,pause,trackEvent,trackPageStart,trackPageEnd,trackShare,setUserid,setOpenid,setUnionid,setSuperProperty,setUserInfo".split(",");
      for (i = 0, r = o.length; i < r; i++) this.createMethod(e, o[i], t);
      if (t)
        for (i = 0, r = re.length; i < r; i++) {
          var s = re[i];
          try {
            t[s[0]].apply(t, s[1])
          } catch (e) {
            n().v("impl[v[0]].apply error: ", s[0], e)
          }
        }
    } catch (e) {
      n().v("install api errror: ", e)
    }
  }
};
var se = [f.ENDPOINT, f.ENDPOINTB];
var ae = function(e) {
    f.ENDPOINTB && setTimeout((function() {
      ! function e(t, i) {
        var r, o;
        if (0 === t || 1 === t && i ? r = f.ENDPOINT : 2 === t && i ? r = f.ENDPOINTB : i && (r = se[t]), t >= se.length || i) return i && (o = r, f.ENDPOINT = o), i && n().v("命中可用服务", r), !i && n().tip_w("未命中可用服务"), !1;
        s.request({
          url: f.ENDPOINT + "/uminiprogram_logs/ckdh",
          success: function(n) {
            200 === (n.code || n.status || n.statusCode) && n.data && 200 === n.data.code ? e(t + 1, !0) : e(t + 1, !1)
          },
          fail: function() {
            e(t + 1, !1)
          }
        })
      }(0, !1)
    }), e)
  },
  ue = new oe,
  ce = {
    _inited: !1,
    _log: n(),
    preinit: function(t) {
      if (t && "object" == e(t))
        for (var n in t) f[n] = t[n];
      return f
    },
    use: function(e, t) {
      return e && _(e.install) ? e.install(ce, t) : _(e) && e(ce, t), ce
    },
    messager: o,
    init: function(e) {
      if (this._inited) n().v("已经实例过，请避免重复初始化");
      else if (e)
        if (e.appKey) {
          "boolean" != typeof e.useOpenid && (e.useOpenid = !0), i().set(e), n().setDebug(e.debug), this._inited = !0;
          var t = this;
          o.emit(o.messageType.CONFIG_LOADED, e);
          try {
            var r = new ie;
            n().v("成功创建Lib对象"), r.init((function() {
              n().v("Lib对象初始化成功"), ue.installApi(t, r), n().v("安装Lib接口成功"), o.emit(o.messageType.UMA_LIB_INITED, e)
            })), ae(3e3)
          } catch (e) {
            n().w("创建Lib对象异常: " + e)
          }
        } else n().err("请确保传入正确的appkey");
      else n().err("请正确设置相关信息！")
    }
  };
try {
  ue.installApi(ce, null)
} catch (t) {
  n().w("uma赋值异常: ", t)
}
var fe = {},
  pe = Array.isArray;
fe.isArray = pe || function(e) {
  return "[object Array]" === toString.call(e)
}, fe.isObject = function(e) {
  return e === Object(e) && !fe.isArray(e)
}, fe.isEmptyObject = function(e) {
  if (fe.isObject(e)) {
    for (var t in e)
      if (hasOwnProperty.call(e, t)) return !1;
    return !0
  }
  return !1
}, fe.isUndefined = function(e) {
  return void 0 === e
}, fe.isString = function(e) {
  return "[object String]" === toString.call(e)
}, fe.isDate = function(e) {
  return "[object Date]" === toString.call(e)
}, fe.isNumber = function(e) {
  return "[object Number]" === toString.call(e)
}, fe.each = function(e, t, n) {
  if (null != e) {
    var i = {},
      r = Array.prototype.forEach;
    if (r && e.forEach === r) e.forEach(t, n);
    else if (e.length === +e.length) {
      for (var o = 0, s = e.length; o < s; o++)
        if (o in e && t.call(n, e[o], o, e) === i) return
    } else
      for (var a in e)
        if (hasOwnProperty.call(e, a) && t.call(n, e[a], a, e) === i) return
  }
}, fe.buildQuery = function(e, t) {
  var n, i, r = [];
  return void 0 === t && (t = "&"), fe.each(e, (function(e, t) {
    n = encodeURIComponent(e.toString()), i = encodeURIComponent(t), r[r.length] = i + "=" + n
  })), r.join(t)
}, fe.JSONDecode = function(e) {
  if (e) {
    try {
      return JSON.parse(e)
    } catch (e) {
      console.error("JSONDecode error", e)
    }
    return null
  }
}, fe.JSONEncode = function(e) {
  try {
    return JSON.stringify(e)
  } catch (e) {
    console.error("JSONEncode error", e)
  }
};
var he = Object.create(null);

function de(e) {
  n().v("开始构建 fetch body"), s.getSystemInfo((function(t) {
    s.getNetworkInfo((function(n) {
      var r = (n = n || {}).networkType;
      r = "none" === r ? "unknown" : r.toUpperCase(), he.access = r,
        function(e, t) {
          var n = e.brand || "";
          if (he.deviceType = "Phone", he.sdkVersion = "2.8.0", he.appkey = i().appKey(), he.sdkType = s.getSdkType(), he.umid = m().getId(), e) {
            he.language = e.language || "", he.os = e.OS, he.osVersion = e.OSVersion, he.deviceName = e.deviceName, he.platformVersion = e.platformVersion, he.platformSdkVersion = e.platformSDKVersion, he.deviceBrand = n;
            var r = e.resolution.split("*");
            fe.isArray(r) && (he.resolutionHeight = Number(r[0]), he.resolutionWidth = Number(r[1]))
          }! function(e) {
            e && (he.installTime = e.install_datetime && Date.parse(e.install_datetime), he.scene = e.install_scene, he.channel = e.install_channel, he.campaign = e.install_campaign)
          }(W.getImpObj()), t && t(he)
        }(t, e)
    }))
  }))
}
var le = Object.create(null),
  ge = null,
  ve = !1,
  _e = {
    minFetchIntervalSeconds: 43200
  };

function ye(e) {
  e && fe.each(e, (function(e) {
    le[e.k] = e
  }))
}

function me() {
  var e = this;
  this.STORAGE_NAME = null, o.once(o.messageType.CONFIG_LOADED, (function(t) {
    n().v("云配初始化开始..."), e.init(t)
  }))
}
me.prototype = {
  setDefaultValues: function(e) {
    ve && fe.isObject(e) && fe.each(e, (function(e, t) {
      le[t] && le[t].v || (le[t] = {
        v: e
      })
    }))
  },
  getValue: function(e) {
    n().v("从配置项中读取 value, 当前配置为: ", le), n().v("待读取的 key : ", e);
    try {
      if (!ve) return;
      var t = le[e] || {};
      return n().v("读取相应配置ing..., 结果为: ", t), fe.isNumber(t.e) && fe.isNumber(t.g) && (n().v("读取到相应配置, 开始数据上报..."), function(e) {
        var t = {
          appkey: i().appKey(),
          sdkType: s.getSdkType(),
          expId: e && e.e,
          groupId: e && e.g,
          clientTs: Date.now(),
          key: e && e.k,
          value: e && e.v,
          umid: m().getId()
        };
        try {
          s.request({
            url: "https://pslog.umeng.com/mini_ablog",
            method: "POST",
            data: [t],
            success: function(e) {
              e && 200 === e.statusCode ? n().v("上传数据成功", t) : n().w("ablog 请求成功, 返回结果异常 ", e)
            },
            fail: function(e) {
              n().w("ablog 请求数据错误 ", t, e)
            }
          })
        } catch (e) {
          n().w("urequest 调用错误", e)
        }
      }(t)), t.v
    } catch (t) {
      n().w("getValue error, key: ", e)
    }
  },
  active: function(e) {
    try {
      if (!ve) return;
      var t, i;
      e && e.params && (t = e.params), e && e.callback && (i = e.callback), n().v("激活配置项: ", t), t ? (n().v("本地已缓存的配置项: ", le), ye(t), n().v("合并后的配置项: ", le), i && i(le), n().v("active 结束")) : (n().v("配置项为空!! 读取本地配置..."), s.getStorage(this.STORAGE_NAME, (function(e) {
        e ? (ye((e = fe.JSONDecode(e) || {}).params), n().v("当前本地配置项为: ", le), i && i(le), n().v("active 结束")) : n().v("当前本地配置项为空, 退出激活")
      })))
    } catch (e) {
      n().w("SDK active 错误", e)
    }
  },
  init: function(e) {
    e.appKey && (ge = e.appKey, this.STORAGE_NAME = "um_remote_config_{{" + ge + "}}"), ge ? ve ? n().w("SDK 已经初始化, 请避免重复初始化") : (ve = !0, this.setOptions(e), this.active()) : n().err("请检查您的小程序 appKey, appKey 不能为空")
  },
  setOptions: function(e) {
    if (fe.isObject(e)) {
      var t = e.minFetchIntervalSeconds;
      fe.isNumber(t) && (_e.minFetchIntervalSeconds = Math.max(t, 5))
    }
  },
  fetch: function(e) {
    if (ve && this.STORAGE_NAME) {
      var t, i;
      e && e.active && (t = e.active), e && e.callback && (i = e.callback);
      var r = this;
      s.getStorage(this.STORAGE_NAME, (function(e) {
        n().v("开始读缓存 data is ", e), (e = fe.JSONDecode(e) || {}).params && e.ts && Date.now() - e.ts < 1e3 * _e.minFetchIntervalSeconds ? (n().v("缓存数据存在, 并且本次触发时间距离上次fetch触发时间未超过 fetch 时间间隔, 无需 fetch"), i && i(e.params)) : de((function(e) {
          n().v("缓存数据不存在, 构建 fetch body :", e);
          try {
            s.request({
              url: "https://ucc.umeng.com/v1/mini/fetch",
              method: "POST",
              data: e,
              success: function(e) {
                if (e && 200 === e.statusCode && e.data && e.data.cc) {
                  n().v("fetch 请求成功, 响应数据: ", e.data);
                  var o = Object.create(null);
                  fe.each(e.data.cc, (function(e) {
                    o[e.k] = e
                  }));
                  var a = {
                    ts: Date.now(),
                    params: o
                  };
                  n().v("开始缓存 fetch 请求的云配置结果..."), s.setStorage(r.STORAGE_NAME, fe.JSONEncode(a), (function(e) {
                    n().v("缓存云配置成功, 缓存数据为: ", a), n().v("缓存云配置成功, 成功消息为: ", e), n().v("云配拉取数据是否自动激活: ", t), e && t && (n().v("激活云配置..."), r.active({
                      params: o,
                      callback: i
                    }))
                  }))
                } else n().w("fetch 请求成功,返回结果异常 ", e.data), i && i()
              },
              fail: function(t) {
                n().w("fetch请求数据错误 ", e, t), i && i()
              }
            })
          } catch (e) {
            n().w("urequest调用错误", e)
          }
        }))
      }))
    }
  }
};
var Se = {
    install: function(e, t) {
      return e.rc || (e.rc = new me), e.messager.once(e.messager.messageType.CONFIG_LOADED, (function() {
        e._log.v("plugin rc installed")
      })), e.rc
    }
  },
  Ie = !1,
  Oe = {
    install: function(e, t) {
      e.wxpluginwraper || (e.wxpluginwraper = function(t) {
        Ie || (t.onAppShow && t.onAppShow((function(t) {
          e.resume(t)
        })), t.onAppHide && t.onAppHide((function(t) {
          e.pause(t)
        })), Ie = !0)
      })
    }
  },
  Ae = "",
  Ee = {};

function Te(e) {
  e && (Ae = e)
}

function Ne(e, t) {
  if (e.onShareAppMessage) {
    var n = e.onShareAppMessage;
    e.onShareAppMessage = function(e) {
      var i = n.call(this, e) || {},
        r = function(e, t) {
          if (!e) return "";
          var n = [];
          for (var i in t) "_um_ssrc" !== i && "_um_sts" !== i && n.push(i + "=" + t[i]);
          var r = n.join("&");
          return r ? e + "?" + r : e
        }(Ae, Ee[Ae]);
      !i.path && r && (i.path = r);
      var o = t.trackShare.call(this, i);
      return void 0 === o ? i : o
    }
  }
}

function we(e, t, n) {
  var i = e[t];
  e[t] = function(e) {
    n.call(this, e), i && i.call(this, e)
  }
}

function ke(e) {
  try {
    ce.resume(e, !0)
  } catch (e) {
    n().v("onAppShow: ", e)
  }
}

function be() {
  try {
    ce.pause()
  } catch (e) {
    n().v("onAppHide: ", e)
  }
}

function De() {
  try {
    Te(this.route), ce.trackPageStart(this.route)
  } catch (e) {
    n().v("onPageShow: ", e)
  }
}

function Ue(e) {
  try {
    Te(this.route), e && (t = this.route, i = e, t && (Ee[t] = i)), n().v("Page onLoad: ", this.route, e)
  } catch (e) {
    n().v("onPageLoad: ", e)
  }
  var t, i
}

function Pe() {
  try {
    ce.trackPageEnd(this.route)
  } catch (e) {
    n().v("onPageHide: ", e)
  }
}
try {
  var Re = App;
  App = function(e) {
    we(e, "onLaunch", (function() {
      ! function(e) {
        try {
          ce.init(e)
        } catch (e) {
          n().v("onAppLaunch: ", e)
        }
      }(e.umengConfig)
    })), we(e, "onShow", ke), we(e, "onHide", be), Re(e)
  }
} catch (t) {
  n().w("App重写异常")
}
try {
  var Le = Page;
  Page = function(e) {
    we(e, "onShow", De), we(e, "onHide", Pe), we(e, "onUnload", Pe), we(e, "onLoad", Ue), Ne(e, ce), Le(e)
  }
} catch (t) {
  n().w("Page重写异常")
}
try {
  var Ce = Component;
  Component = function(e) {
    try {
      e.methods = e.methods || {};
      var t = e.methods;
      we(t, "onShow", De), we(t, "onHide", Pe), we(t, "onUnload", Pe), we(t, "onLoad", Ue), Ne(t, ce), Ce(e)
    } catch (t) {
      Ce(e)
    }
  }
} catch (t) {
  n().w("Component重写异常")
}
var Me = ce.init;
ce.init = function(e) {
  e && e.useOpenid && (n().tip_w(n().repeat("!")), n().tip_w("openid已开启，请确保使用setOpenid设置openid或通过设置autoGetOpenid为true，并在友盟后台设置secret由友盟帮您获取"), n().tip_w(n().repeat("!"))), Me.call(ce, e)
}, ce.use(Se), ce.use(Oe), wx.uma = ce, module.exports = ce;
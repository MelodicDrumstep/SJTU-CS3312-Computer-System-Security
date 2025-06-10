var t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  e = require("../../@babel/runtime/helpers/asyncToGenerator");
Component({
  options: {
    styleIsolation: "shared",
    pureDataPattern: /^_/,
    multipleSlots: !0
  },
  properties: {
    id: {
      type: String,
      value: "vtabs"
    },
    vtabs: {
      type: Array,
      value: []
    },
    activeTab: {
      type: Number,
      value: 0
    },
    height: {
      type: String,
      value: "100%"
    }
  },
  data: {
    currentView: 0,
    contentScrollTop: 0
  },
  _heightRecords: [],
  _height: 0,
  _curContentView: 0,
  isScrolling: !1,
  isScrollByTab: !1,
  observers: {
    activeTab: function(t) {
      this.scrollTabBar(t)
    }
  },
  methods: {
    initHeightRecords: function() {
      var i = this;
      return new Promise((function(r) {
        wx.createSelectorQuery().selectAll("#" + i.data.id + " >>> .vtabs-content__item").boundingClientRect(function() {
          var n = e(t().mark((function e(n) {
            var s, a, o, c, h;
            return t().wrap((function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  if ((s = n.map((function(t) {
                      return t.height
                    }))) && s.length) {
                    for (a = [], o = 0, c = s.length, h = 0; h < c; h++) a[h] = o + (s[h] || 0), o = a[h];
                    i._heightRecords = a, i.createSelectorQuery().select(".vtabs").boundingClientRect((function(t) {
                      i._height = t.height, i.setCurContentView(0), r(t)
                    })).exec()
                  } else r({});
                case 2:
                case "end":
                  return t.stop()
              }
            }), e)
          })));
          return function(t) {
            return n.apply(this, arguments)
          }
        }()).exec()
      }))
    },
    scrollTabBar: function(t) {
      var e = this.data.vtabs.length;
      if (0 !== e) {
        var i = t < 6 ? 0 : t - 5;
        i >= e && (i = e - 1), this.setData({
          currentView: i
        })
      }
    },
    handleTabClick: function(t) {
      var e = this,
        i = t.currentTarget.dataset.index;
      if (i !== this.data.activeTab) {
        var r = this._heightRecords[i - 1] ? this._heightRecords[i - 1] : 0;
        this.isScrollByTab = !0, this.setData({
          activeTab: i,
          contentScrollTop: r
        }), this.triggerEvent("change", {
          index: i
        }), this.timer = setTimeout((function() {
          clearTimeout(e.timer);
          var t = e._heightRecords[i - 1] ? e._heightRecords[i - 1] : 0;
          r < t && e.setData({
            contentScrollTop: t
          })
        }), 700), this.timer2 = setTimeout((function() {
          clearTimeout(e.timer2), e.isScrollByTab = !1
        }), 1500), getApp().trackEvent("menu_type_click", {
          categoryNameSale: this.data.vtabs[i].categoryNameSale
        })
      }
    },
    handleContentScroll: function(t) {
      var e = this;
      if (!this.isScrolling) {
        this.isScrolling = !0;
        var i = setTimeout((function() {
          e.isScrolling = !1;
          var r = t.detail.scrollTop;
          e.triggerEvent("contentScroll", r), e._heightRecords && 0 !== e._heightRecords.length && (e.setCurContentView(r), !e.isScrollByTab && e.setActiveTab(r), clearTimeout(i))
        }), 50)
      }
    },
    setCurContentView: function(t) {
      var e = this;
      if (this._curContentView !== this.data.vtabs.length - 1) {
        var i = this._heightRecords.findIndex((function(i) {
          return i > t + e._height
        })); - 1 === i && (i = this._heightRecords.length - 1), i > (this._curContentView || 0) && (this._curContentView = i, this.triggerEvent("showMoreView", {
          index: this._curContentView
        }), this.initHeightRecords())
      }
    },
    setActiveTab: function(t) {
      var e = this._heightRecords.findIndex((function(e) {
        return e > t
      })); - 1 === e && (e = this._heightRecords.length - 1), e !== this.data.activeTab && (this.triggerEvent("change", {
        index: e
      }), this.setData({
        activeTab: e
      }))
    },
    handleScrollToLower: function() {
      this._curContentView < this._heightRecords.length && (this._curContentView = this._heightRecords.length, this.triggerEvent("showMoreView", {
        index: this._curContentView
      }), this.initHeightRecords())
    }
  }
});
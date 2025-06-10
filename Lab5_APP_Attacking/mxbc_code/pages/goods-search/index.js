var t = require("@/utils/index"),
  e = require("@/request/activity");
Page({
  data: {
    value: "",
    resultList: [],
    historyList: [],
    suggestList: [],
    hasSearched: !1,
    fromPage: !1
  },
  goodsList: [],
  shopId: "",
  onLoad: function() {
    var e = this;
    this.eventChannel = this.getOpenerEventChannel(), this.eventChannel.on && this.eventChannel.on("sendDataToOpenPage", (function(a) {
      var s = a.data,
        r = a.shopId,
        i = a.suggestList,
        n = a.fromPage;
      e.shopId = r, e.suggestList = i || [], s && s.length && (e.goodsList = (0, t.uniqueArr)(s.flatMap((function(t) {
        return t.products
      })), "productId"), n && e.setData({
        fromPage: n
      }))
    })), this.updateHistory(t.periodicArrStorage.getStorage("searchHistory")), getApp().menuOptions.skipRefresh = 1
  },
  onReady: function() {
    this.getHotSuggestFetch()
  },
  getHotSuggestFetch: function() {
    var t = this;
    if (this.suggestList.length) return this.setData({
      suggestList: this.suggestList
    });
    (0, e.getHotSearch)(this.shopId).then((function(e) {
      var a = e.data;
      a && t.setData({
        suggestList: a
      })
    })).catch((function(t) {
      console.log("搜索热词:", t)
    }))
  },
  onInput: function(t) {
    !t.detail.value && this.data.hasSearched && this.setData({
      resultList: [],
      hasSearched: !1
    })
  },
  btnSearch: function() {
    this.confirmSearch({
      detail: {
        value: this.data.value
      }
    })
  },
  confirmSearch: function(e) {
    var a = e.detail.value.trim(),
      s = this.data.suggestList.findIndex((function(t) {
        return t.keyWord === a
      })),
      r = s > -1 ? this.data.suggestList[s] : this.data.suggestList[0] || {},
      i = r.jumpType,
      n = r.jumpContent,
      o = r.keyWord;
    a && -1 === s ? (this.search(a), this.updateHistory(t.periodicArrStorage.setStorage("searchHistory", a, 2592e3))) : o && this.suggestTap({
      currentTarget: {
        dataset: {
          type: i,
          content: n,
          word: o
        }
      }
    })
  },
  historyTap: function(t) {
    var e = t.currentTarget.dataset.value;
    this.search(e), this.setData({
      value: e
    })
  },
  clearHistory: function() {
    this.setData({
      historyList: []
    }), t.periodicArrStorage.clearStorage("searchHistory")
  },
  search: function(t) {
    this.setData({
      hasSearched: !0,
      resultList: this.goodsList.filter((function(e) {
        return e.productName.indexOf(t) > -1
      }))
    })
  },
  clearValue: function() {
    this.setData({
      value: "",
      resultList: [],
      hasSearched: !1
    })
  },
  backMenu: function(t) {
    var e = t.currentTarget.dataset,
      a = e.id,
      s = e.productStatus,
      r = e.productName,
      i = e.categoryNameSale;
    if (3 == s) return getApp().showToast("该商品已售罄");
    this.eventChannel.emit("dataFromSearch", {
      productId: a,
      productName: r,
      categoryNameSale: i
    }), this.goBack()
  },
  updateHistory: function(t) {
    this.setData({
      historyList: t
    })
  },
  suggestTap: function(t) {
    var e = this,
      a = t.currentTarget.dataset,
      s = a.type,
      r = a.content,
      i = a.word;
    switch (getApp().trackEvent("suggest_tap", i), s) {
      case 2:
        this.backMenu({
          currentTarget: {
            dataset: {
              productName: r
            }
          }
        });
        break;
      case 3:
        this.backMenu({
          currentTarget: {
            dataset: {
              categoryNameSale: r
            }
          }
        });
        break;
      case 4:
        getApp().navigate(r);
        break;
      default:
        this.setData({
          value: i
        }, (function() {
          e.search(i)
        }))
    }
  },
  goBack: function() {
    wx.navigateBack()
  }
});
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, l = require("../@babel/runtime/helpers/objectSpread2");
var n = l(l({}, ((e = require("./other")) && e.__esModule ? e : {
  default: e
}).default), {}, {
  levelTxt_index: {
    1: "可享【每日抽奖】等5项权益",
    2: "可享【升级礼包】等7项权益",
    3: "可享【闲时优惠】等8项权益",
    4: "可享【专属兑换】等9项权益"
  },
  levelTxt_mine: {
    1: "再升一级可享【闲时优惠】等7项权益",
    2: "再升一级可享【攒币加速】等8项权益",
    3: "再升一级可享【专属兑换】等9项权益",
    4: "恭喜您已达最高等级，享【专属兑换】等9项权益"
  },
  levelTxt_rights: [{
    currentTxt: "再升一级可享【生日礼】等8项权益",
    nextTxt: ""
  }, {
    currentTxt: "再升一级可享【新品试饮】等10项权益",
    nextTxt: "享【生日礼】等7项权益"
  }, {
    currentTxt: "再升一级可享【买一送一】等14项权益",
    nextTxt: "享【新品试饮】等10项权益"
  }, {
    currentTxt: "恭喜您已达最高等级，享【买一送一】等14项权益",
    nextTxt: "享【买一送一】等14项权益"
  }],
  noNearShop: "搜索不到附近的门店，点击刷新试试",
  noOftenShop: "暂无常去门店",
  noFavoriteShop: "暂无门店",
  markerTipStyle_weixin: {
    bgColor: "#00000099",
    padding: "14rpx",
    color: "#fff",
    fontSize: "24rpx",
    borderRadius: "10rpx"
  },
  markerTipStyle_alipay: {
    fontSize: 12,
    padding: 10,
    borderRadius: 6,
    color: "#333333"
  },
  refundMap: [{
    reasonId: "1",
    name: "个人原因",
    parentId: "0",
    level: 1,
    child: [{
      reasonId: "4",
      name: "点错餐了",
      parentId: "1",
      level: 2,
      child: null
    }, {
      reasonId: "2",
      name: "下错门店了",
      parentId: "1",
      level: 2,
      child: null
    }, {
      reasonId: "13",
      name: "以为是外卖",
      parentId: "1",
      level: 2,
      child: null
    }, {
      reasonId: "14",
      name: "人太多不想等",
      parentId: "1",
      level: 2,
      child: null
    }]
  }, {
    reasonId: "5",
    name: "门店原因",
    parentId: "0",
    level: 1,
    child: [{
      reasonId: "15",
      name: "门店态度问题",
      parentId: "5",
      level: 2,
      child: null
    }, {
      reasonId: "16",
      name: "门店饮品问题",
      parentId: "5",
      level: 2,
      child: null
    }, {
      reasonId: "6",
      name: "门店地址错误",
      parentId: "5",
      level: 2,
      child: null
    }, {
      reasonId: "7",
      name: "门店餐品售罄",
      parentId: "5",
      level: 2,
      child: null
    }, {
      reasonId: "17",
      name: "门店出餐慢",
      parentId: "5",
      level: 2,
      child: null
    }]
  }, {
    reasonId: "12",
    name: "其他",
    parentId: "0",
    level: 1,
    child: null
  }]
});
exports.default = n;
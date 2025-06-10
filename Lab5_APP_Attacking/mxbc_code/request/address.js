Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.createAddress = function(r) {
  return t.default.post("/v1/consigneeaddress/save", e({}, r))
}, exports.deleteAddress = function(e) {
  return t.default.post("/v1/consigneeaddress/delete/".concat(e))
}, exports.getAddressInfo = function(e) {
  return t.default.get("/v1/consigneeaddress/info/".concat(e))
}, exports.getAddressList = function(e) {
  return t.default.get("/v3/consigneeaddress/listAll", {
    shopId: e
  })
}, exports.getRegeoAddress = function(t) {
  return new Promise((function(d) {
    wx.request({
      url: "https://restapi.amap.com/v3/geocode/regeo",
      data: e(e({}, t), {}, {
        key: "e9559804bb56502e961f159c14eb6383",
        sig: (0, r.default)("".concat((0, s.createStrBeforeSign)(e({
          key: "e9559804bb56502e961f159c14eb6383"
        }, t)), "ad52007b0582a69696a5138e526af335"))
      }),
      methods: "GET",
      complete: function(e) {
        200 === e.statusCode && "10000" === e.data.infocode ? d(e.data.regeocode) : d({
          formatted_address: []
        })
      }
    })
  }))
}, exports.updateAddress = function(r) {
  return t.default.post("/v1/consigneeaddress/update", e({}, r))
};
var e = require("../@babel/runtime/helpers/objectSpread2"),
  t = d(require("./index")),
  r = d(require("@/utils/js-md5")),
  s = require("@/utils/index");

function d(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
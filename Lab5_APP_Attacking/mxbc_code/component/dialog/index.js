Component({
  options: {
    styleIsolation: "apply-shared",
    multipleSlots: !0
  },
  externalClasses: ["custom-class"],
  properties: {
    title: {
      type: String,
      value: ""
    },
    content: {
      type: String,
      value: ""
    },
    canCancel: {
      type: Boolean,
      value: !0
    },
    canConfirm: {
      type: Boolean,
      value: !0
    },
    useCustomButton: {
      type: Boolean,
      value: !1
    },
    useCustomBody: {
      type: Boolean,
      value: !1
    },
    cancelText: {
      type: String,
      value: "取消"
    },
    confirmText: {
      type: String,
      value: "确定"
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: !1
    },
    btnStyle: {
      type: String,
      value: "horizontal"
    }
  },
  data: {
    isShow: !1
  },
  methods: {
    openDialog: function() {
      this.setData({
        isShow: !0
      })
    },
    closeDialog: function() {
      this.setData({
        isShow: !1
      })
    },
    cancel: function() {
      this.closeDialog(), this.triggerEvent("cancel")
    },
    confirm: function() {
      this.closeDialog(), this.triggerEvent("confirm")
    },
    onCloseOnOverlay: function() {
      this.data.closeOnClickOverlay && this.setData({
        isShow: !1
      })
    }
  }
});
var t = [];
Component({
  options: {
    styleIsolation: "apply-shared",
    multipleSlots: !0
  },
  externalClasses: ["custom-class"],
  properties: {
    disabled: Boolean,
    asyncClose: Boolean,
    name: {
      type: null,
      value: ""
    }
  },
  data: {
    wrapperStyle: "",
    rightWidth: 0
  },
  created: function() {
    this.offset = 0, t.push(this)
  },
  ready: function() {
    var t = this;
    this.createSelectorQuery().select(".swipe-cell__right").boundingClientRect((function(i) {
      t.setData({
        rightWidth: i.width
      })
    })).exec()
  },
  detached: function() {
    var i = this;
    t = t.filter((function(t) {
      return t !== i
    }))
  },
  methods: {
    open: function() {
      this.swipeMove(-this.data.rightWidth), this.triggerEvent("open", {
        name: this.data.name
      })
    },
    close: function() {
      this.swipeMove(0)
    },
    swipeMove: function(t) {
      void 0 === t && (t = 0), this.offset = Math.min(Math.max(t, -this.data.rightWidth), 0), this.swipeMoving = !0;
      var i = "translate3d(".concat(this.offset, "px, 0, 0)");
      this.setData({
        wrapperStyle: "-webkit-transform: ".concat(i, ";transform: ").concat(i)
      })
    },
    startDrag: function(t) {
      this.data.disabled || (this.startOffset = this.offset, this.touchStart(t))
    },
    onDrag: function(i) {
      var s = this;
      this.data.disabled || (this.touchMove(i), "horizontal" === this.direction && (t.filter((function(t) {
        return t !== s && 0 !== t.offset
      })).forEach((function(t) {
        t.close()
      })), this.swipeMove(this.startOffset + this.deltaX)))
    },
    endDrag: function() {
      if (!this.data.disabled) {
        var t = this.offset,
          i = this.data.rightWidth;
        i > 0 && -t > .3 * i ? this.swipeMoving && this.open() : this.swipeMove(0), this.swipeMoving = !1
      }
    },
    onClick: function(t) {
      this.data.disabled || this.triggerEvent("click", {
        position: "inside",
        instance: this,
        name: this.data.name
      })
    },
    onClose: function() {
      this.data.asyncClose ? this.triggerEvent("close", {
        position: "outside",
        instance: this,
        name: this.data.name
      }) : this.swipeMove(0)
    },
    resetTouchStatus: function() {
      this.direction = "", this.deltaX = 0, this.deltaY = 0, this.offsetX = 0, this.offsetY = 0
    },
    touchStart: function(t) {
      var i = t.touches[0],
        s = i.clientX,
        e = i.clientY;
      this.resetTouchStatus(), this.startX = s, this.startY = e
    },
    touchMove: function(t) {
      var i = t.touches[0],
        s = i.clientX,
        e = i.clientY;
      this.deltaX = s - this.startX, this.deltaY = e - this.startY, this.offsetX = Math.abs(this.deltaX), this.offsetY = Math.abs(this.deltaY), this.direction = this.direction || function(t, i) {
        if (t > i && t > 10) return "horizontal";
        if (i > t && i > 10) return "vertical";
        return ""
      }(this.offsetX, this.offsetY)
    },
    noop: function() {}
  }
});
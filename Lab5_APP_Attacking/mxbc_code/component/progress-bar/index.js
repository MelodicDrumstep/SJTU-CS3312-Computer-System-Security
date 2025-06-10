Component({
  properties: {
    customClass: String,
    width: {
      type: Number,
      value: 360,
      optionalTypes: [String]
    },
    strokeWidth: {
      type: Number,
      value: 4,
      optionalTypes: [String]
    },
    percent: {
      type: Number,
      value: 0
    },
    backgroundColor: {
      type: String,
      value: "rgba(255,255,255,0.3)"
    },
    activeColor: {
      type: String,
      value: "rgba(255,255,255,1)"
    }
  }
});
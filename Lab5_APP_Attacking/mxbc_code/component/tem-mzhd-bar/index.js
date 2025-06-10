Component({
  options: {
    styleIsolation: "shared"
  },
  properties: {
    array: {
      type: Array,
      value: []
    },
    threshold: {
      type: Number,
      value: 0
    },
    customClass: {
      type: String,
      value: ""
    },
    currentNum: {
      type: Number,
      value: 0
    },
    totalNum: {
      type: Number,
      value: 0
    }
  },
  data: {
    progressArray: []
  },
  attached: function() {
    this.processArray()
  },
  observers: {
    "array, threshold": function() {
      this.processArray()
    }
  },
  methods: {
    processArray: function() {
      var r = this.data,
        t = r.array,
        e = r.threshold;
      if (t && Array.isArray(t) && 0 !== t.length) {
        var a = t.map((function(r) {
          return {
            value: r,
            active: r <= e
          }
        }));
        this.setData({
          progressArray: a
        })
      }
    }
  }
});
(() => {
  Number.prototype.format = function () {
    return this.toString().replace(/(.)(?=(?:\d{3})+$)/g, '$1,')
  }

  Number.prototype.times = function (callback) {
    return [...Array(+this).keys()].map(n => n + 1).map(callback)
  }

  Number.prototype.upto = function (limit, callback) {
    return (limit - this + 1).times(n => n + this - 1).map(callback)
  }

  Number.prototype.downto = function (limit, callback) {
    return (this - limit + 1).times(n => this - n + 1).map(callback)
  }
})()

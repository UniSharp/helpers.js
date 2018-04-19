Number.prototype.format = function () {
  return this.toString().replace(/(.)(?=(?:\d{3})+$)/g, '$1,')
}

Number.prototype.times = function (callback) {
  return [...Array(+this).keys()].each(callback)
}

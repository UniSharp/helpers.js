const isf = n => Number(n) === n && n % 1 !== 0

Number.random = function (max = null) {
  let result = Math.random() * (max || 1)

  return max === null || isf(max) ? result : Math.floor(result)
}

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

Number.prototype.round = function (precision = 0) {
  return Math.round(this * 10 ** precision) / 10 ** precision
}

Number.prototype.floor = function () {
  return Math.floor(this)
}

Number.prototype.ceil = function () {
  return Math.ceil(this)
}

Number.prototype.abs = function () {
  return Math.abs(this)
}

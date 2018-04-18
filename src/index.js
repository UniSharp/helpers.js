/* eslint no-extend-native: [error, { exceptions: ['String', 'Number', 'Array'] }] */

Array.prototype.count = function () {
  return this.length
}

Array.prototype.sum = function () {
  return this.reduce((sum, n) => sum + +n, 0)
}

Array.prototype.avg = function () {
  return this.sum() / this.length
}

Array.prototype.min = function () {
  return Math.min(...this)
}

Array.prototype.max = function () {
  return Math.max(...this)
}

Array.prototype.each = function (callback) {
  this.forEach(callback)
}

String.prototype.slugify = function () {
  return this.toLowerCase().replace(/[:/.?=&\s]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')
}

Number.prototype.format = function (withDollarSign = true) {
  return `${withDollarSign ? '$ ' : ''}${this.toString().replace(/(.)(?=(?:\d{3})+$)/g, '$1,')}`
}

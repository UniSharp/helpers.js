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

  return this
}

Array.prototype.first = function (callback = null) {
  if (!callback) {
    return this[0]
  }

  return this.filter(callback)[0]
}

Array.prototype.last = function (callback = null) {
  let array = this

  if (callback) {
    array = array.filter(callback)
  }

  return array[array.length - 1]
}

Array.prototype.unique = function () {
  return [...new Set(this)]
}

String.prototype.slugify = function () {
  return this.toLowerCase().replace(/[:/.?=&\s]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')
}

Number.prototype.format = function (withDollarSign = true) {
  return `${withDollarSign ? '$ ' : ''}${this.toString().replace(/(.)(?=(?:\d{3})+$)/g, '$1,')}`
}

Number.prototype.times = function (callback) {
  return [...Array(+this).keys()].each(callback)
}

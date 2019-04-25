import DateInterval from '../date'

const isf = n => Number(n) === n && n % 1 !== 0

const random = function (max = null) {
  let result = Math.random() * (max || 1)

  return max === null || isf(max) ? result : Math.floor(result)
}

const format = function () {
  return this.toString().replace(/(.)(?=(?:\d{3})+$)/g, '$1,')
}

const times = function (callback) {
  return [...Array(+this).keys()].map(n => n + 1).map(callback)
}

const upto = function (limit, callback) {
  return times.call(limit - this + 1, n => n + this - 1).map(callback)
}

const downto = function (limit, callback) {
  return times.call(this - limit + 1, n => this - n + 1).map(callback)
}

const round = function (precision = 0) {
  return Math.round(this * 10 ** precision) / 10 ** precision
}

const floor = function () {
  return Math.floor(this)
}

const ceil = function () {
  return Math.ceil(this)
}

const abs = function () {
  return Math.abs(this)
}

const createInterval = function (type, value) {
  let interval = new DateInterval()

  interval[type] = value

  return interval
}

const year = function () {
  return createInterval('years', this)
}

const month = function () {
  return createInterval('months', this)
}

const day = function () {
  return createInterval('days', this)
}

const hour = function () {
  return createInterval('hours', this)
}

const minute = function () {
  return createInterval('minutes', this)
}

const second = function () {
  return createInterval('seconds', this)
}

const millisecond = function () {
  return createInterval('milliseconds', this)
}

const years = function () {
  return this.year()
}

const months = function () {
  return this.month()
}

const days = function () {
  return this.day()
}

const hours = function () {
  return this.hour()
}

const minutes = function () {
  return this.minute()
}

const seconds = function () {
  return this.second()
}

const milliseconds = function () {
  return this.millisecond()
}

export const staticMethods = {
  random
}

export const methods = {
  format,
  times,
  upto,
  downto,
  round,
  floor,
  ceil,
  abs,
  year,
  month,
  day,
  hour,
  minute,
  second,
  millisecond,
  years,
  months,
  days,
  hours,
  minutes,
  seconds,
  milliseconds
}

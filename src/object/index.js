Object.isObject = function (obj) {
  return typeof obj === 'object' && obj.constructor === Object
}

Object.prototype.keys = function () {
  return Object.keys(this)
}

Object.prototype.values = function () {
  return Object.values(this)
}

Object.prototype.count = function () {
  return this.keys().count()
}

Object.prototype.sum = function () {
  return this.values().sum()
}

Object.prototype.avg = function () {
  return this.values().sum() / this.count()
}

Object.prototype.each = function (callback) {
  let count = 0

  this.keys().each(key => callback(this[key], key, count++))

  return this
}

Object.prototype.slice = function (begin = 0, end = null) {
  let result = {}

  if (end === null) {
    end = this.count()
  }

  if (begin < 0) {
    begin = this.count() + begin
  }

  if (end < 0) {
    end = this.count() + end
  }

  this.each((value, key, index) => {
    if (index >= begin && index < end) {
      result[key] = value
    }
  })

  return result
}

Object.prototype.toArray = function () {
  let result = []

  this.each(value => {
    if (Object.isObject(value)) {
      value = value.toArray()
    }

    result.push(value)
  })

  return result
}

Object.prototype.chunk = function (size) {
  return Math.ceil(this.count() / size).times(n => this.slice((n - 1) * size, n * size))
}

Object.prototype.filter = function (callback) {
  let result = {}

  this.each((value, key) => {
    if (callback(value, key)) {
      result[key] = value
    }
  })

  return result
}

Object.prototype.first = function (callback = null) {
  let object = this

  if (callback) {
    object = object.filter(callback)
  }

  return object.values()[0]
}

Object.prototype.last = function (callback = null) {
  let object = this

  if (callback) {
    object = object.filter(callback)
  }

  return object.values()[object.count() - 1]
}

Object.prototype.map = function (callback) {
  let result = {}

  this.each((value, key, index) => {
    result[key] = callback(value, key, index)
  })

  return result
}

Object.prototype.reduce = function (callback, init = null) {
  let result = init

  this.each((value, key, index) => {
    result = callback(result, value, key, index)
  })

  return result
}

Object.prototype.flatten = function () {
  return this.reduce((flatten, toFlatten) => {
    if (Array.isArray(toFlatten) || Object.isObject(toFlatten)) {
      toFlatten = toFlatten.flatten()
    }

    return flatten.concat(toFlatten)
  }, [])
}

Object.prototype.min = function () {
  return this.values().min()
}

Object.prototype.max = function () {
  return this.values().max()
}

Object.prototype.unique = function () {
  let haystack = []
  let result = {}

  this.each((value, key) => {
    if (!haystack.contains(value)) {
      result[key] = value
      haystack.push(value)
    }
  })

  return result
}

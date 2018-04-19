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

Object.prototype.min = function () {
  return this.values().min()
}

Object.prototype.max = function () {
  return this.values().max()
}

Object.prototype.each = function (callback) {
  this.keys().each(key => callback(this[key], key))

  return this
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

Object.isObject = function (value) {
  return value && typeof value === 'object' && value.constructor === Object
}

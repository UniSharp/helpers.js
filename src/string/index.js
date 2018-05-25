(() => {
  String.random = function (length = 16) {
    let string = ''

    while (string.length < length) {
      string += Math.random().toString(36).slice(2)
    }

    return string.slice(-length)
  }

  String.prototype.slugify = function () {
    return this.toLowerCase().replace(/[:/.?=&\s]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')
  }
})()

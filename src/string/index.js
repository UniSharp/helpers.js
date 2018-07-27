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

  String.prototype.stripTags = function () {
    return this.replace(/<\/?[a-z0-9]+.*?>/ig, '')
  }

  String.prototype.limit = function (length, suffix = '...') {
    return this.slice(0, length) + suffix
  }

  String.prototype.nl2br = function () {
    return this.replace(/\r\n|\n\r|\n|\r/g, '<br>')
  }
})()

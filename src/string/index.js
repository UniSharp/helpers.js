const random = function (length = 16) {
  let string = ''

  while (string.length < length) {
    string += Math.random().toString(36).slice(2)
  }

  return string.slice(-length)
}

const slugify = function () {
  return this.toLowerCase().replace(/[:/.?=&\s]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')
}

const stripTags = function () {
  return this.replace(/<\/?[a-z0-9]+.*?>/ig, '')
}

const limit = function (length, suffix = '...') {
  return this.slice(0, length) + suffix
}

const nl2br = function () {
  return this.replace(/\r\n|\n\r|\n|\r/g, '<br>')
}

export const staticMethods = {
  random
}

export const methods = {
  slugify,
  stripTags,
  limit,
  nl2br
}

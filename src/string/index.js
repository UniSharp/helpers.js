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

const ucfirst = function () {
  return this.replace(/^(.)/, match => match.toUpperCase())
}

const lcfirst = function () {
  return this.replace(/^(.)/, match => match.toLowerCase())
}

const studly = function () {
  return this.split(/[-_ ]/).filter(word => word).map(word => word.ucfirst()).join('')
}

const camel = function () {
  return this.studly().lcfirst()
}

const snake = function () {
  return this.split(/(?=[A-Z])|[-_ ]/g).filter(word => word).join('_').toLowerCase()
}

const kebab = function () {
  return this.snake().replace(/_/g, '-')
}

export const staticMethods = {
  random
}

export const methods = {
  slugify,
  stripTags,
  limit,
  nl2br,
  studly,
  camel,
  snake,
  kebab,
  ucfirst,
  lcfirst
}

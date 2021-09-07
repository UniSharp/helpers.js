declare global {
  interface StringConstructor {
    random: (length?: number) => string
  }

  interface String {
    slugify: () => string
    stripTags: () => string
    limit: (length: number, suffix?: string) => string
    nl2br: () => string
    ucfirst: () => string
    lcfirst: () => string
    studly: () => string
    camel: () => string
    snake: () => string
    kebab: () => string
    title: () => string
  }
}

export const init = (String: StringConstructor): void => {
  String.random = function (length: number = 16): string {
    let string: string = ''

    while (string.length < length) {
      string += Math.random().toString(36).slice(2)
    }

    return string.slice(-length)
  }

  String.prototype.slugify = function (): string {
    return this.toLowerCase().replace(/[:/.?=&#\s]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')
  }

  String.prototype.stripTags = function (): string {
    return this.replace(/<\/?[a-z0-9]+.*?>/ig, '')
  }

  String.prototype.limit = function (length: number, suffix: string = '...'): string {
    return this.slice(0, length) + suffix
  }

  String.prototype.nl2br = function (): string {
    return this.replace(/\r\n|\n\r|\n|\r/g, '<br>')
  }

  String.prototype.ucfirst = function (): string {
    return this.replace(/^(.)/, (match: string) => match.toUpperCase())
  }

  String.prototype.lcfirst = function (): string {
    return this.replace(/^(.)/, (match: string) => match.toLowerCase())
  }

  String.prototype.studly = function (): string {
    return this.split(/[-_ ]/).filter((word: string) => word).map((word: string) => word.ucfirst()).join('')
  }

  String.prototype.camel = function (): string {
    return this.studly().lcfirst()
  }

  String.prototype.snake = function (): string {
    return this.split(/(?=[A-Z])|[-_ ]/g).filter((word: string) => word).join('_').toLowerCase()
  }

  String.prototype.kebab = function (): string {
    return this.snake().replace(/_/g, '-')
  }

  String.prototype.title = function (): string {
    return this.snake().split(/_/).map((word: string) => word.ucfirst()).join(' ')
  }
}

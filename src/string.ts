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

export function random (): string
export function random (length: number): string
export function random (length: number = 16) {
  let string: string = ''

  while (string.length < length) {
    string += Math.random().toString(36).slice(2)
  }

  return string.slice(-length)
}

export function slugify (string: string): string {
  return string.toLowerCase().replace(/[:/.?=&#\s]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')
}

export function stripTags (string: string): string {
  return string.replace(/<\/?[a-z0-9]+.*?>/ig, '')
}

export function limit (string: string, length: number): string
export function limit (string: string, length: number, suffix: string): string
export function limit (string: string, length: number, suffix: string = '...') {
  return string.slice(0, length) + suffix
}

export function nl2br (string: string): string {
  return string.replace(/\r\n|\n\r|\n|\r/g, '<br>')
}

export function ucfirst (string: string): string {
  return string.replace(/^(.)/, (match: string) => match.toUpperCase())
}

export function lcfirst (string: string): string {
  return string.replace(/^(.)/, (match: string) => match.toLowerCase())
}

export function studly (string: string): string {
  return string.split(/[-_ ]/).filter((word: string) => word).map((word: string) => ucfirst(word)).join('')
}

export function camel (string: string): string {
  return lcfirst(studly(string))
}

export function snake (string: string): string {
  return string.split(/(?=[A-Z])|[-_ ]/g).filter((word: string) => word).join('_').toLowerCase()
}

export function kebab (string: string): string {
  return snake(string).replace(/_/g, '-')
}

export function title (string: string): string {
  return snake(string).split(/_/).map((word: string) => ucfirst(word)).join(' ')
}

export const staticMethods = { random }
export const methods = {
  slugify,
  stripTags,
  limit,
  nl2br,
  ucfirst,
  lcfirst,
  studly,
  camel,
  snake,
  kebab,
  title,
}

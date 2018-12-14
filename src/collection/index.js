const isf = value => typeof value === 'function'

const isn = value => typeof value === 'number' && isFinite(value)

const isa = value => value && typeof value === 'object' && value.constructor === Array

const iso = value => value && typeof value === 'object' && value.constructor === Object

const spaceship = (a, b) => {
  if (a > b) {
    return 1
  }

  if (a < b) {
    return -1
  }

  return 0
}

const normalizeCallback = (callback) => {
  if (isf(callback)) {
    return callback
  }

  if (callback === null) {
    return value => value
  }

  return value => value === callback
}

const _has = (items, key, defaultValue = null) => {
  if (!isa(key)) {
    key = `${key}`.replace(/^\[|\]/g, '').replace(/\[/g, '.').split('.')
  }

  key = [...key]

  let segment = `${key.shift()}`

  if (isa(items)) {
    items = {...items}
  }

  if (!contains(keys(items), segment)) {
    return [false, defaultValue]
  }

  let target = items[segment]

  if (!key.length) {
    return [true, target]
  }

  return _has(target, key, defaultValue)
}

const _merge = (items, merged, flag) => {
  let result = reduce(
    merged,
    (result, value, key) => ({ ...result, [isn(key) ? flag++ : key]: value }),
    { ...items }
  )

  return {
    flag,
    result: iso(items) || iso(merged) ? result : values(result)
  }
}

const keys = (items) => {
  let keys = Object.keys(items)

  if (isa(items)) {
    keys = keys.map(k => +k)
  }

  return keys
}

const values = items => {
  if (isa(items)) {
    return items
  }

  return Object.values(items)
}

const contains = (haystack, needle) => values(haystack).indexOf(needle) !== -1

const count = items => keys(items).length

const has = (items, key) => _has(items, key)[0]

const get = (items, key, defaultValue = null) => _has(items, key, defaultValue)[1]

const sum = (items, key = null) => {
  if (key) {
    items = pluck(items, key)
  }

  return values(items).reduce((carry, n) => carry + (+n || 0), 0)
}

const avg = (items, key = null) => {
  let c = count(items)

  if (!c) {
    return null
  }

  if (key) {
    items = pluck(items, key)
  }

  return sum(items) / c
}

const each = (items, callback) => {
  let c = 0
  let k = keys(items)

  for (let i = 0; i < count(k); i++) {
    if (callback(items[k[i]], k[i], c++) === false) {
      break
    }
  }

  return items
}

const slice = (items, begin = 0, end = null) => {
  if (end === null) {
    end = count(items)
  }

  if (isa(items)) {
    return items.slice(begin, end)
  }

  let result = {}

  if (begin < 0) {
    begin = count(items) + begin
  }

  if (end < 0) {
    end = count(items) + end
  }

  each(items, (value, key, index) => {
    if (index >= begin && index < end) {
      result[key] = value
    }
  })

  return result
}

const reduce = (items, callback, initValue) => {
  let result = initValue

  each(items, (value, key, index) => {
    result = callback(result, value, key, index)
  })

  return result
}

const toArray = items => reduce(
  items,
  (carry, value) => [...carry, iso(value) ? toArray(value) : value],
  []
)

const chunk = (items, size) => reduce(
  [...Array(Math.ceil(count(items) / size)).keys()],
  (carry, n) => [...carry, slice(items, n * size, (n + 1) * size)],
  []
)

const filter = (items, callback = null) => {
  callback = normalizeCallback(callback)

  let result = reduce(items, (carry, value, key, index) => {
    if (callback(value, key, index)) {
      carry[key] = value
    }

    return carry
  }, {})

  return iso(items) ? result : values(result)
}

const except = (items, ...keys) => {
  keys = flatten(keys)

  return filter(items, (value, key) => !contains(keys, key))
}

const isEmpty = (items) => !count(items)

const isNotEmpty = (items) => !isEmpty(items)

const first = (items, callback = null) => {
  if (callback) {
    items = filter(items, callback)
  }

  return isNotEmpty(items) ? values(items)[0] : null
}

const last = (items, callback = null) => {
  if (callback) {
    items = filter(items, callback)
  }

  return isNotEmpty(items) ? values(items)[count(items) - 1] : null
}

const map = (items, callback) => {
  let result = reduce(
    items,
    (result, value, key, index) => ({ ...result, [key]: callback(value, key, index) }),
    {}
  )

  return iso(items) ? result : values(result)
}

const mapWithKeys = (items, callback) => reduce(
  items,
  (result, value, key, index) => ({ ...result, ...callback(value, key, index) }),
  {}
)

const flatten = items => reduce(
  items,
  (carry, value) => isa(value) || iso(value) ? [...carry, ...flatten(value)] : [...carry, value],
  []
)

const min = items => Math.min(...values(items))

const max = items => Math.max(...values(items))

const only = (items, ...keys) => {
  keys = flatten(keys)

  return filter(items, (value, key) => contains(keys, key))
}

const pipe = (items, callback) => callback(items)

const pluck = (items, value, key = null) => reduce(
  items,
  (result, row) => {
    if (key === null) {
      return [...result, get(row, value)]
    }

    return { ...result, [get(row, key)]: get(row, value) }
  },
  key === null ? [] : {}
)

const reject = (items, callback = null) => {
  if (callback === null) {
    throw new Error('Callback function is required.')
  }

  callback = normalizeCallback(callback)

  return filter(items, (value, key, index) => !callback(value, key, index))
}

const swap = (items, from, to) => {
  let result = slice(items)
  let temp = result[from]

  result[from] = result[to]
  result[to] = temp

  return result
}

const shuffle = items => {
  if (iso(items)) {
    return items
  }

  let length = count(items)
  let result = slice(items)

  for (let i = 0; i < length; i++) {
    let target = Math.floor(Math.random() * length)

    result = swap(result, i, target)
  }

  return reduce(result, (carry, item) => ([...carry, item]), [])
}

const take = (items, limit) => slice(items, 0, limit)

const unique = items => {
  let haystack = []
  let result = {}

  each(items, (value, key) => {
    if (!contains(haystack, value)) {
      result[key] = value
      haystack.push(value)
    }
  })

  return iso(items) ? result : values(result)
}

const diff = (items, compared) => filter(items, item => !contains(compared, item))

const diffKeys = (items, compared) => filter({ ...items }, (item, key) => !has(compared, key))

const intersect = (items, compared) => filter(items, item => contains(compared, item))

const intersectByKeys = (items, compared) => filter({ ...items }, (item, key) => has(compared, key))

const merge = (items, ...merged) => reduce(
  merged,
  ({ flag, result }, merged) => _merge(result, merged, flag),
  { flag: isa(items) ? count(items) : 0, result: items }
).result

const keyBy = (items, key) => reduce(
  items,
  (result, row) => ({ ...result, [get(row, key)]: row }),
  {}
)

const groupBy = (items, key) => {
  let result = reduce(items, (result, row, index) => {
    let group = isf(key) ? key(row) : get(row, key)

    if (!result[group]) {
      result[group] = {}
    }

    result[group][index] = row

    return result
  }, {})

  if (isa(items)) {
    result = map(result, row => values(row))
  }

  return result
}

const sort = (items, callback = null) => {
  if (!callback) {
    callback = (a, b) => spaceship(...map([a, b], item => iso(item) ? values(item) : item))
  }

  if (isa(items)) {
    return items.sort(callback)
  }

  let result = values(map(items, (item, key) => [key, item]))

  result = result.sort((a, b) => callback(a[1], b[1]))

  return mapWithKeys(result, ([key, item]) => ({ [key]: item }))
}

const sortBy = (items, callback) => {
  if (!isf(callback)) {
    let key = callback

    callback = item => get(item, key)
  }

  let result = values(map(items, (item, key) => [key, item, callback(item)]))

  result = sort(result, (a, b) => spaceship(a[2], b[2]))

  if (isa(items)) {
    return map(result, ([key, item]) => item)
  }

  return mapWithKeys(result, ([key, item]) => ({ [key]: item }))
}

const append = (items, value, key = null) => isa(items) ? [...items, value] : { ...items, [key]: value }

const prepend = (items, value, key = null) => isa(items) ? [value, ...items] : { [key]: value, ...items }

const index = (items, needle) => {
  let haystack = values(items)
  let result = haystack.indexOf(needle)

  if (result === -1) {
    return null
  }

  return iso(items) ? keys(items)[result] : result
}

const insert = (items, target, value, key = null) => {
  if (isa(items)) {
    return [...slice(items, 0, target), value, ...slice(items, target)]
  }

  target = index(keys(items), target)

  return { ...slice(items, 0, target), [key]: value, ...slice(items, target) }
}

const join = (items, glue = ', ') => {
  if (iso(items)) {
    items = values(items)
  }

  return items.join(glue)
}

const methods = {
  keys,
  values,
  contains,
  count,
  has,
  get,
  sum,
  avg,
  each,
  slice,
  reduce,
  toArray,
  chunk,
  except,
  filter,
  isEmpty,
  isNotEmpty,
  first,
  last,
  map,
  mapWithKeys,
  flatten,
  min,
  max,
  only,
  pipe,
  pluck,
  reject,
  swap,
  shuffle,
  take,
  unique,
  diff,
  diffKeys,
  intersect,
  intersectByKeys,
  merge,
  keyBy,
  groupBy,
  sort,
  sortBy,
  append,
  prepend,
  index,
  insert,
  join
}

export default (method, items, ...args) => {
  if ((!isa(items) && !iso(items)) ||
      (iso(items) && has(items, method))) {
    return items[method](...args)
  }

  return methods[method](items, ...args)
}

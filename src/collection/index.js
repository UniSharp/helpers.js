(() => {
  global.UniSharp = global.UniSharp || {}
  UniSharp.Helpers = UniSharp.Helpers || {}

  const isa = value => value && typeof value === 'object' && value.constructor === Array
  const iso = value => value && typeof value === 'object' && value.constructor === Object

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
  const has = (items, key) => _has(items, key)[0]
  const get = (items, key, defaultValue = null) => _has(items, key, defaultValue)[1]
  const sum = items => values(items).reduce((carry, n) => carry + +n, 0)
  const avg = items => sum(items) / count(items)
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
  const reduce = (items, callback, initValue = null) => {
    let result = initValue

    each(items, (value, key, index) => {
      result = callback(result, value, key, index)
    })

    return result
  }
  const toArray = items => {
    return reduce(items, (carry, value) => {
      if (iso(value)) {
        value = toArray(value)
      }

      return [...carry, value]
    }, [])
  }
  const chunk = (items, size) => {
    return reduce(
      [...Array(Math.ceil(count(items) / size)).keys()],
      (carry, n) => [...carry, slice(items, n * size, (n + 1) * size)],
      []
    )
  }
  const filter = (items, callback = null) => {
    if (!callback) {
      callback = value => value
    }

    let result = reduce(items, (carry, value, key, index) => {
      if (callback(value, key, index)) {
        carry[key] = value
      }

      return carry
    }, {})

    return iso(items) ? result : values(result)
  }
  const isEmpty = (items) => {
    return !count(items)
  }
  const isNotEmpty = (items) => {
    return !isEmpty(items)
  }
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
    let result = {}

    each(items, (value, key, index) => {
      result[key] = callback(value, key, index)
    })

    return iso(items) ? result : values(result)
  }
  const flatten = items => {
    return reduce(
      items,
      (carry, value) => isa(value) || iso(value) ? [...carry, ...flatten(value)] : [...carry, value],
      []
    )
  }
  const min = items => Math.min(...values(items))
  const max = items => Math.max(...values(items))
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
    filter,
    isEmpty,
    isNotEmpty,
    first,
    last,
    map,
    flatten,
    min,
    max,
    unique
  }

  UniSharp.Helpers.collection = (method, items, ...args) => {
    if ((!isa(items) && !iso(items)) ||
        (iso(items) && has(items, method))) {
      return items[method](...args)
    }

    return methods[method](items, ...args)
  }
})()

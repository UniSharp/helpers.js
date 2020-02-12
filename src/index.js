import DateInterval from './date'
import { methods as collectionMethods, call } from './collection'
import { staticMethods as numberStaticMethods, methods as numberMethods } from './number'
import { staticMethods as stringStaticMethods, methods as stringMethods } from './string'

export const Helpers = {
  Collection: { call, ...collectionMethods },
  Number: { ...numberStaticMethods, ...numberMethods },
  String: { ...stringStaticMethods, ...stringMethods },
  init: ({ Number = global.Number, String = global.String } = {}) => {
    global.DateInterval = DateInterval
    global.UniSharp = { Helpers }

    for (const method in numberStaticMethods) {
      Object.assign(Number, { [method]: numberStaticMethods[method] })
    }

    for (const method in numberMethods) {
      Object.assign(Number.prototype, {
        [method]: function (...args) {
          return numberMethods[method].apply(this, args)
        }
      })
    }

    for (const method in stringStaticMethods) {
      Object.assign(String, { [method]: stringStaticMethods[method] })
    }

    for (const method in stringMethods) {
      Object.assign(String.prototype, {
        [method]: function (...args) {
          return stringMethods[method].apply(this, args)
        }
      })
    }
  }
}

export default { Helpers }

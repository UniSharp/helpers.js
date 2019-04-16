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

    for (let method in numberStaticMethods) {
      Number[method] = numberStaticMethods[method]
    }

    for (let method in numberMethods) {
      Number.prototype[method] = numberMethods[method]
    }

    for (let method in stringStaticMethods) {
      String[method] = stringStaticMethods[method]
    }

    for (let method in stringMethods) {
      String.prototype[method] = stringMethods[method]
    }
  }
}

export default { Helpers }

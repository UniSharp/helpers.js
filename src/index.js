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

    Object.assign(Number, numberStaticMethods)
    Object.assign(Number.prototype, numberMethods)
    Object.assign(String, stringStaticMethods)
    Object.assign(String.prototype, stringMethods)
  }
}

export default { Helpers }

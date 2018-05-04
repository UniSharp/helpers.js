(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  (function () {
    global.UniSharp = global.UniSharp || {};
    UniSharp.Helpers = UniSharp.Helpers || {};

    var isa = function isa(value) {
      return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Array;
    };
    var iso = function iso(value) {
      return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Object;
    };

    var keys = function keys(items) {
      var keys = Object.keys(items);

      if (isa(items)) {
        keys = keys.map(function (k) {
          return +k;
        });
      }

      return keys;
    };
    var values = function values(items) {
      if (isa(items)) {
        return items;
      }

      return Object.values(items);
    };
    var contains = function contains(haystack, needle) {
      return values(haystack).indexOf(needle) !== -1;
    };
    var count = function count(items) {
      return keys(items).length;
    };
    var _has = function _has(items, key) {
      var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (!isa(key)) {
        key = ('' + key).replace(/^\[|\]/g, '').replace(/\[/g, '.').split('.');
      }

      key = [].concat(toConsumableArray(key));

      var segment = '' + key.shift();

      if (isa(items)) {
        items = _extends({}, items);
      }

      if (!contains(keys(items), segment)) {
        return [false, defaultValue];
      }

      var target = items[segment];

      if (!key.length) {
        return [true, target];
      }

      return _has(target, key, defaultValue);
    };
    var has = function has(items, key) {
      return _has(items, key)[0];
    };
    var get$$1 = function get$$1(items, key) {
      var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return _has(items, key, defaultValue)[1];
    };
    var sum = function sum(items) {
      return values(items).reduce(function (carry, n) {
        return carry + +n;
      }, 0);
    };
    var avg = function avg(items) {
      return sum(items) / count(items);
    };
    var each = function each(items, callback) {
      var c = 0;
      var k = keys(items);

      for (var i = 0; i < count(k); i++) {
        if (callback(items[k[i]], k[i], c++) === false) {
          break;
        }
      }

      return items;
    };
    var slice = function slice(items) {
      var begin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (end === null) {
        end = count(items);
      }

      if (isa(items)) {
        return items.slice(begin, end);
      }

      var result = {};

      if (begin < 0) {
        begin = count(items) + begin;
      }

      if (end < 0) {
        end = count(items) + end;
      }

      each(items, function (value, key, index) {
        if (index >= begin && index < end) {
          result[key] = value;
        }
      });

      return result;
    };
    var reduce = function reduce(items, callback) {
      var initValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var result = initValue;

      each(items, function (value, key, index) {
        result = callback(result, value, key, index);
      });

      return result;
    };
    var toArray$$1 = function toArray$$1(items) {
      return reduce(items, function (carry, value) {
        if (iso(value)) {
          value = toArray$$1(value);
        }

        return [].concat(toConsumableArray(carry), [value]);
      }, []);
    };
    var chunk = function chunk(items, size) {
      return reduce([].concat(toConsumableArray(Array(Math.ceil(count(items) / size)).keys())), function (carry, n) {
        return [].concat(toConsumableArray(carry), [slice(items, n * size, (n + 1) * size)]);
      }, []);
    };
    var filter = function filter(items) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!callback) {
        callback = function callback(value) {
          return value;
        };
      }

      var result = reduce(items, function (carry, value, key, index) {
        if (callback(value, key, index)) {
          carry[key] = value;
        }

        return carry;
      }, {});

      return iso(items) ? result : values(result);
    };
    var isEmpty = function isEmpty(items) {
      return !count(items);
    };
    var isNotEmpty = function isNotEmpty(items) {
      return !isEmpty(items);
    };
    var first = function first(items) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (callback) {
        items = filter(items, callback);
      }

      return isNotEmpty(items) ? values(items)[0] : null;
    };
    var last = function last(items) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (callback) {
        items = filter(items, callback);
      }

      return isNotEmpty(items) ? values(items)[count(items) - 1] : null;
    };
    var map = function map(items, callback) {
      var result = {};

      each(items, function (value, key, index) {
        result[key] = callback(value, key, index);
      });

      return iso(items) ? result : values(result);
    };
    var flatten = function flatten(items) {
      return reduce(items, function (carry, value) {
        return isa(value) || iso(value) ? [].concat(toConsumableArray(carry), toConsumableArray(flatten(value))) : [].concat(toConsumableArray(carry), [value]);
      }, []);
    };
    var min = function min(items) {
      return Math.min.apply(Math, toConsumableArray(values(items)));
    };
    var max = function max(items) {
      return Math.max.apply(Math, toConsumableArray(values(items)));
    };
    var unique = function unique(items) {
      var haystack = [];
      var result = {};

      each(items, function (value, key) {
        if (!contains(haystack, value)) {
          result[key] = value;
          haystack.push(value);
        }
      });

      return iso(items) ? result : values(result);
    };

    var methods = {
      keys: keys,
      values: values,
      contains: contains,
      count: count,
      has: has,
      get: get$$1,
      sum: sum,
      avg: avg,
      each: each,
      slice: slice,
      reduce: reduce,
      toArray: toArray$$1,
      chunk: chunk,
      filter: filter,
      isEmpty: isEmpty,
      isNotEmpty: isNotEmpty,
      first: first,
      last: last,
      map: map,
      flatten: flatten,
      min: min,
      max: max,
      unique: unique
    };

    UniSharp.Helpers.collection = function (method, items) {
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      if (!isa(items) && !iso(items)) {
        return items[method].apply(items, args);
      }

      return methods[method].apply(methods, [items].concat(args));
    };
  })();

  (function () {
    var PROPERTIES = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'];

    var DateInterval = function () {
      function DateInterval() {
        var _this = this;

        classCallCheck(this, DateInterval);

        PROPERTIES.forEach(function (key) {
          _this[key + 's'] = 0;
        });
      }

      createClass(DateInterval, [{
        key: 'invert',
        value: function invert() {
          var _this2 = this;

          var newInterval = new DateInterval();

          PROPERTIES.forEach(function (key) {
            newInterval[key + 's'] = _this2[key + 's'] * -1;
          });

          return newInterval;
        }
      }, {
        key: 'ago',
        value: function ago() {
          var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          return this.invert().after(date);
        }
      }, {
        key: 'after',
        value: function after() {
          var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          date = date || new Date();

          date.setFullYear(date.getFullYear() + this.years);
          date.setMonth(date.getMonth() + this.months);
          date.setDate(date.getDate() + this.days);
          date.setHours(date.getHours() + this.hours);
          date.setMinutes(date.getMinutes() + this.minutes);
          date.setSeconds(date.getSeconds() + this.seconds);
          date.setMilliseconds(date.getMilliseconds() + this.milliseconds);

          return date;
        }
      }]);
      return DateInterval;
    }();

    PROPERTIES.forEach(function (key) {
      Number.prototype[key] = function () {
        return this[key + 's']();
      };

      Number.prototype[key + 's'] = function () {
        var interval = new DateInterval();

        interval[key + 's'] = this;

        return interval;
      };
    });

    global.DateInterval = DateInterval;
  })();

  (function () {
    Number.prototype.format = function () {
      return this.toString().replace(/(.)(?=(?:\d{3})+$)/g, '$1,');
    };

    Number.prototype.times = function (callback) {
      return [].concat(toConsumableArray(Array(+this).keys())).map(function (n) {
        return n + 1;
      }).map(callback);
    };

    Number.prototype.upto = function (limit, callback) {
      var _this = this;

      return (limit - this + 1).times(function (n) {
        return n + _this - 1;
      }).map(callback);
    };

    Number.prototype.downto = function (limit, callback) {
      var _this2 = this;

      return (this - limit + 1).times(function (n) {
        return _this2 - n + 1;
      }).map(callback);
    };
  })();

  (function () {
    // const has = function (obj, key, defaultValue = null) {
    //   if (!Array.isArray(key)) {
    //     key = `${key}`.replace(/^\[|\]/g, '').replace(/\[/g, '.').split('.')
    //   }
    //
    //   key = [...key]
    //
    //   let segment = `${key.shift()}`
    //
    //   if (Array.isArray(obj)) {
    //     obj = {...obj}
    //   }
    //
    //   if (!obj.keys().contains(segment)) {
    //     return [false, defaultValue]
    //   }
    //
    //   let target = obj[segment]
    //
    //   if (!key.count()) {
    //     return [true, target]
    //   }
    //
    //   return has(target, key, defaultValue)
    // }

    Object.isObject = function (value) {
      return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Object;
    };

    // Object.prototype.keys = function () {
    //   return Object.keys(this)
    // }
    //
    // Object.prototype.values = function () {
    //   return Object.values(this)
    // }
    //
    // Object.prototype.contains = function (needle) {
    //   return this.values().contains(needle)
    // }
    //
    // Object.prototype.has = function (key) {
    //   return has(this, key)[0]
    // }
    //
    // Object.prototype.get = function (key, defaultValue = null) {
    //   return has(this, key, defaultValue)[1]
    // }
    //
    // Object.prototype.count = function () {
    //   return this.keys().count()
    // }
    //
    // Object.prototype.sum = function () {
    //   return this.values().sum()
    // }
    //
    // Object.prototype.avg = function () {
    //   return this.values().sum() / this.count()
    // }
    //
    // Object.prototype.each = function (callback) {
    //   let count = 0
    //
    //   this.keys().each(key => callback(this[key], key, count++))
    //
    //   return this
    // }
    //
    // Object.prototype.slice = function (begin = 0, end = null) {
    //   let result = {}
    //
    //   if (end === null) {
    //     end = this.count()
    //   }
    //
    //   if (begin < 0) {
    //     begin = this.count() + begin
    //   }
    //
    //   if (end < 0) {
    //     end = this.count() + end
    //   }
    //
    //   this.each((value, key, index) => {
    //     if (index >= begin && index < end) {
    //       result[key] = value
    //     }
    //   })
    //
    //   return result
    // }
    //
    // Object.prototype.toArray = function () {
    //   let result = []
    //
    //   this.each(value => {
    //     if (Object.isObject(value)) {
    //       value = value.toArray()
    //     }
    //
    //     result.push(value)
    //   })
    //
    //   return result
    // }
    //
    // Object.prototype.chunk = function (size) {
    //   return Math.ceil(this.count() / size).times(n => this.slice((n - 1) * size, n * size))
    // }
    //
    // Object.prototype.filter = function (callback) {
    //   let result = {}
    //
    //   this.each((value, key) => {
    //     if (callback(value, key)) {
    //       result[key] = value
    //     }
    //   })
    //
    //   return result
    // }
    //
    // Object.prototype.first = function (callback = null) {
    //   let object = this
    //
    //   if (callback) {
    //     object = object.filter(callback)
    //   }
    //
    //   return object.values()[0]
    // }
    //
    // Object.prototype.last = function (callback = null) {
    //   let object = this
    //
    //   if (callback) {
    //     object = object.filter(callback)
    //   }
    //
    //   return object.values()[object.count() - 1]
    // }
    //
    // Object.prototype.map = function (callback) {
    //   let result = {}
    //
    //   this.each((value, key, index) => {
    //     result[key] = callback(value, key, index)
    //   })
    //
    //   return result
    // }
    //
    // Object.prototype.reduce = function (callback, init = null) {
    //   let result = init
    //
    //   this.each((value, key, index) => {
    //     result = callback(result, value, key, index)
    //   })
    //
    //   return result
    // }
    //
    // Object.prototype.flatten = function () {
    //   return this.reduce((flatten, toFlatten) => {
    //     if (Array.isArray(toFlatten) || Object.isObject(toFlatten)) {
    //       toFlatten = toFlatten.flatten()
    //     }
    //
    //     return flatten.concat(toFlatten)
    //   }, [])
    // }
    //
    // Object.prototype.min = function () {
    //   return this.values().min()
    // }
    //
    // Object.prototype.max = function () {
    //   return this.values().max()
    // }
    //
    // Object.prototype.unique = function () {
    //   let haystack = []
    //   let result = {}
    //
    //   this.each((value, key) => {
    //     if (!haystack.contains(value)) {
    //       result[key] = value
    //       haystack.push(value)
    //     }
    //   })
    //
    //   return result
    // }
  })();

  (function () {
    String.prototype.slugify = function () {
      return this.toLowerCase().replace(/[:/.?=&\s]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
    };
  })();

})));

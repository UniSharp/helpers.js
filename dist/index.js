(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.UniSharp = factory());
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

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

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

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var isf = function isf(value) {
    return typeof value === 'function';
  };

  var isn = function isn(value) {
    return typeof value === 'number' && isFinite(value);
  };

  var isa = function isa(value) {
    return value && Array.isArray(value);
  };

  var iso = function iso(value) {
    return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor.name === 'Object';
  };

  var spaceship = function spaceship(a, b) {
    if (a > b) {
      return 1;
    }

    if (a < b) {
      return -1;
    }

    return 0;
  };

  var normalizeCallback = function normalizeCallback(callback) {
    if (isf(callback)) {
      return callback;
    }

    if (callback === null) {
      return function (value) {
        return value;
      };
    }

    return function (value) {
      return value === callback;
    };
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

  var _merge = function _merge(items, merged, flag) {
    var result = reduce(merged, function (result, value, key) {
      return _extends({}, result, defineProperty({}, isn(key) ? flag++ : key, value));
    }, _extends({}, items));

    return {
      flag: flag,
      result: iso(items) || iso(merged) ? result : values(result)
    };
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

  var has = function has(items, key) {
    return _has(items, key)[0];
  };

  var get$1 = function get$$1(items, key) {
    var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return _has(items, key, defaultValue)[1];
  };

  var sum = function sum(items) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (key) {
      items = pluck(items, key);
    }

    return values(items).reduce(function (carry, n) {
      return carry + (+n || 0);
    }, 0);
  };

  var avg = function avg(items) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var c = count(items);

    if (!c) {
      return null;
    }

    if (key) {
      items = pluck(items, key);
    }

    return sum(items) / c;
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

  var reduce = function reduce(items, callback, initValue) {
    var result = initValue;

    each(items, function (value, key, index) {
      result = callback(result, value, key, index);
    });

    return result;
  };

  var toArray$1 = function toArray$$1(items) {
    return reduce(items, function (carry, value) {
      return [].concat(toConsumableArray(carry), [iso(value) ? toArray$$1(value) : value]);
    }, []);
  };

  var chunk = function chunk(items, size) {
    return reduce([].concat(toConsumableArray(Array(Math.ceil(count(items) / size)).keys())), function (carry, n) {
      return [].concat(toConsumableArray(carry), [slice(items, n * size, (n + 1) * size)]);
    }, []);
  };

  var filter = function filter(items) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    callback = normalizeCallback(callback);

    var result = reduce(items, function (carry, value, key, index) {
      if (callback(value, key, index)) {
        carry[key] = value;
      }

      return carry;
    }, {});

    return iso(items) ? result : values(result);
  };

  var except = function except(items) {
    for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      keys[_key - 1] = arguments[_key];
    }

    keys = flatten(keys);

    return filter(items, function (value, key) {
      return !contains(keys, key);
    });
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
    var result = reduce(items, function (result, value, key, index) {
      return _extends({}, result, defineProperty({}, key, callback(value, key, index)));
    }, {});

    return iso(items) ? result : values(result);
  };

  var mapWithKeys = function mapWithKeys(items, callback) {
    return reduce(items, function (result, value, key, index) {
      return _extends({}, result, callback(value, key, index));
    }, {});
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

  var only = function only(items) {
    for (var _len2 = arguments.length, keys = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      keys[_key2 - 1] = arguments[_key2];
    }

    keys = flatten(keys);

    return filter(items, function (value, key) {
      return contains(keys, key);
    });
  };

  var pipe = function pipe(items, callback) {
    return callback(items);
  };

  var pluck = function pluck(items, value) {
    var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return reduce(items, function (result, row) {
      if (key === null) {
        return [].concat(toConsumableArray(result), [get$1(row, value)]);
      }

      return _extends({}, result, defineProperty({}, get$1(row, key), get$1(row, value)));
    }, key === null ? [] : {});
  };

  var reject = function reject(items) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (callback === null) {
      throw new Error('Callback function is required.');
    }

    callback = normalizeCallback(callback);

    return filter(items, function (value, key, index) {
      return !callback(value, key, index);
    });
  };

  var swap = function swap(items, from, to) {
    var result = slice(items);
    var temp = result[from];

    result[from] = result[to];
    result[to] = temp;

    return result;
  };

  var shuffle = function shuffle(items) {
    if (iso(items)) {
      return items;
    }

    var length = count(items);
    var result = slice(items);

    for (var i = 0; i < length; i++) {
      var target = Math.floor(Math.random() * length);

      result = swap(result, i, target);
    }

    return reduce(result, function (carry, item) {
      return [].concat(toConsumableArray(carry), [item]);
    }, []);
  };

  var take = function take(items, limit) {
    return slice(items, 0, limit);
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

  var diff = function diff(items, compared) {
    return filter(items, function (item) {
      return !contains(compared, item);
    });
  };

  var diffKeys = function diffKeys(items, compared) {
    return filter(_extends({}, items), function (item, key) {
      return !has(compared, key);
    });
  };

  var intersect = function intersect(items, compared) {
    return filter(items, function (item) {
      return contains(compared, item);
    });
  };

  var intersectByKeys = function intersectByKeys(items, compared) {
    return filter(_extends({}, items), function (item, key) {
      return has(compared, key);
    });
  };

  var merge = function merge(items) {
    for (var _len3 = arguments.length, merged = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      merged[_key3 - 1] = arguments[_key3];
    }

    return reduce(merged, function (_ref, merged) {
      var flag = _ref.flag,
          result = _ref.result;
      return _merge(result, merged, flag);
    }, { flag: isa(items) ? count(items) : 0, result: items }).result;
  };

  var keyBy = function keyBy(items, key) {
    return reduce(items, function (result, row) {
      return _extends({}, result, defineProperty({}, get$1(row, key), row));
    }, {});
  };

  var groupBy = function groupBy(items, key) {
    var result = reduce(items, function (result, row, index) {
      var group = isf(key) ? key(row) : get$1(row, key);

      if (!result[group]) {
        result[group] = {};
      }

      result[group][index] = row;

      return result;
    }, {});

    if (isa(items)) {
      result = map(result, function (row) {
        return values(row);
      });
    }

    return result;
  };

  var sort = function sort(items) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (!callback) {
      callback = function callback(a, b) {
        return spaceship.apply(undefined, toConsumableArray(map([a, b], function (item) {
          return iso(item) ? values(item) : item;
        })));
      };
    }

    if (isa(items)) {
      return items.sort(callback);
    }

    var result = values(map(items, function (item, key) {
      return [key, item];
    }));

    result = result.sort(function (a, b) {
      return callback(a[1], b[1]);
    });

    return mapWithKeys(result, function (_ref2) {
      var _ref3 = slicedToArray(_ref2, 2),
          key = _ref3[0],
          item = _ref3[1];

      return defineProperty({}, key, item);
    });
  };

  var sortBy = function sortBy(items, callback) {
    if (!isf(callback)) {
      var key = callback;

      callback = function callback(item) {
        return get$1(item, key);
      };
    }

    var result = values(map(items, function (item, key) {
      return [key, item, callback(item)];
    }));

    result = sort(result, function (a, b) {
      return spaceship(a[2], b[2]);
    });

    if (isa(items)) {
      return map(result, function (_ref5) {
        var _ref6 = slicedToArray(_ref5, 2),
            key = _ref6[0],
            item = _ref6[1];

        return item;
      });
    }

    return mapWithKeys(result, function (_ref7) {
      var _ref8 = slicedToArray(_ref7, 2),
          key = _ref8[0],
          item = _ref8[1];

      return defineProperty({}, key, item);
    });
  };

  var append = function append(items, value) {
    var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return isa(items) ? [].concat(toConsumableArray(items), [value]) : _extends({}, items, defineProperty({}, key, value));
  };

  var prepend = function prepend(items, value) {
    var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return isa(items) ? [value].concat(toConsumableArray(items)) : _extends(defineProperty({}, key, value), items);
  };

  var index = function index(items, needle) {
    var haystack = values(items);
    var result = haystack.indexOf(needle);

    if (result === -1) {
      return null;
    }

    return iso(items) ? keys(items)[result] : result;
  };

  var insert = function insert(items, target, value) {
    var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    if (isa(items)) {
      return [].concat(toConsumableArray(slice(items, 0, target)), [value], toConsumableArray(slice(items, target)));
    }

    target = index(keys(items), target);

    return _extends({}, slice(items, 0, target), defineProperty({}, key, value), slice(items, target));
  };

  var join = function join(items) {
    var glue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ', ';

    if (iso(items)) {
      items = values(items);
    }

    return items.join(glue);
  };

  var partition = function partition(items, callback) {
    var result = reduce(items, function (carry, value, key, index) {
      carry[+!callback(value, key, index)][key] = value;

      return carry;
    }, [{}, {}]);

    return iso(items) ? result : map(result, function (part) {
      return values(part);
    });
  };

  var methods = {
    keys: keys,
    values: values,
    contains: contains,
    count: count,
    has: has,
    get: get$1,
    sum: sum,
    avg: avg,
    each: each,
    slice: slice,
    reduce: reduce,
    toArray: toArray$1,
    chunk: chunk,
    except: except,
    filter: filter,
    isEmpty: isEmpty,
    isNotEmpty: isNotEmpty,
    first: first,
    last: last,
    map: map,
    mapWithKeys: mapWithKeys,
    flatten: flatten,
    min: min,
    max: max,
    only: only,
    pipe: pipe,
    pluck: pluck,
    reject: reject,
    swap: swap,
    shuffle: shuffle,
    take: take,
    unique: unique,
    diff: diff,
    diffKeys: diffKeys,
    intersect: intersect,
    intersectByKeys: intersectByKeys,
    merge: merge,
    keyBy: keyBy,
    groupBy: groupBy,
    sort: sort,
    sortBy: sortBy,
    append: append,
    prepend: prepend,
    index: index,
    insert: insert,
    join: join,
    partition: partition
  };

  var collection = (function (method, items) {
    for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
      args[_key4 - 2] = arguments[_key4];
    }

    if (!isa(items) && !iso(items) || iso(items) && has(items, method)) {
      return items[method].apply(items, args);
    }

    return methods[method].apply(methods, [items].concat(args));
  });

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

  var isf$1 = function isf(n) {
    return Number(n) === n && n % 1 !== 0;
  };

  Number.random = function () {
    var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var result = Math.random() * (max || 1);

    return max === null || isf$1(max) ? result : Math.floor(result);
  };

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

  Number.prototype.round = function () {
    var precision = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return Math.round(this * Math.pow(10, precision)) / Math.pow(10, precision);
  };

  Number.prototype.floor = function () {
    return Math.floor(this);
  };

  Number.prototype.ceil = function () {
    return Math.ceil(this);
  };

  Number.prototype.abs = function () {
    return Math.abs(this);
  };

  String.random = function () {
    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;

    var string = '';

    while (string.length < length) {
      string += Math.random().toString(36).slice(2);
    }

    return string.slice(-length);
  };

  String.prototype.slugify = function () {
    return this.toLowerCase().replace(/[:/.?=&\s]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  };

  String.prototype.stripTags = function () {
    return this.replace(/<\/?[a-z0-9]+.*?>/ig, '');
  };

  String.prototype.limit = function (length) {
    var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '...';

    return this.slice(0, length) + suffix;
  };

  String.prototype.nl2br = function () {
    return this.replace(/\r\n|\n\r|\n|\r/g, '<br>');
  };

  global.DateInterval = DateInterval;

  var index$1 = { Helpers: { collection: collection } };

  return index$1;

})));

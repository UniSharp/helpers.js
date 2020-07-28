(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.UniSharp = {})));
}(this, (function (exports) { 'use strict';

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

  var DateInterval = function () {
    function DateInterval() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$years = _ref.years,
          years = _ref$years === undefined ? 0 : _ref$years,
          _ref$months = _ref.months,
          months = _ref$months === undefined ? 0 : _ref$months,
          _ref$days = _ref.days,
          days = _ref$days === undefined ? 0 : _ref$days,
          _ref$hours = _ref.hours,
          hours = _ref$hours === undefined ? 0 : _ref$hours,
          _ref$minutes = _ref.minutes,
          minutes = _ref$minutes === undefined ? 0 : _ref$minutes,
          _ref$seconds = _ref.seconds,
          seconds = _ref$seconds === undefined ? 0 : _ref$seconds,
          _ref$milliseconds = _ref.milliseconds,
          milliseconds = _ref$milliseconds === undefined ? 0 : _ref$milliseconds;

      classCallCheck(this, DateInterval);

      this.years = years;
      this.months = months;
      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
      this.milliseconds = milliseconds;
    }

    createClass(DateInterval, [{
      key: "invert",
      value: function invert() {
        var newInterval = new DateInterval();

        newInterval.years = this.years * -1;
        newInterval.months = this.months * -1;
        newInterval.days = this.days * -1;
        newInterval.hours = this.hours * -1;
        newInterval.minutes = this.minutes * -1;
        newInterval.seconds = this.seconds * -1;
        newInterval.milliseconds = this.milliseconds * -1;

        return newInterval;
      }
    }, {
      key: "ago",
      value: function ago() {
        var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        return this.invert().after(date);
      }
    }, {
      key: "after",
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
    }, {
      key: "valueOf",
      value: function valueOf() {
        /* eslint-disable */
        return this.years * 1000 * 60 * 60 * 24 * 30 * 365 + this.months * 1000 * 60 * 60 * 24 * 30 + this.days * 1000 * 60 * 60 * 24 + this.hours * 1000 * 60 * 60 + this.minutes * 1000 * 60 + this.seconds * 1000 + this.milliseconds;
        /* eslint-enable */
      }
    }]);
    return DateInterval;
  }();

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

  var normalizeKey = function normalizeKey(key) {
    if (!isa(key)) {
      key = ('' + key).replace(/^\[|\]/g, '').replace(/\[/g, '.').split('.');
    }

    return [].concat(toConsumableArray(key));
  };

  var stringKeys = function stringKeys(items) {
    return map(keys(items), function (key) {
      return '' + key;
    });
  };

  var _has = function _has(items, key) {
    var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    key = normalizeKey(key);

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

  var set$1 = function set$$1(items, key, value) {
    key = normalizeKey(key);

    var previous = items;
    var previousKey = key.shift();
    var current = items[previousKey];

    while (key.length) {
      var k = key.shift();

      if (!iso(current) && !isa(current)) {
        previous[previousKey] = isn(+k) ? [] : {};
        current = previous[previousKey];
      }

      previousKey = k;
      previous = current;
      current = current[k];
    }

    previous[previousKey] = value;

    return items;
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
    var itemsIsArray = isa(items);

    var index = 0;

    for (var key in items) {
      if (itemsIsArray) {
        key = +key;
      }

      if (callback(items[key], key, index++) === false) {
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
    var itemsIsArray = isa(items);

    var result = initValue;
    var index = 0;

    for (var key in items) {
      if (itemsIsArray) {
        key = +key;
      }

      result = callback(result, items[key], key, index++);
    }

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

    var itemsIsArray = isa(items);

    var result = {};
    var index = 0;

    callback = normalizeCallback(callback);

    for (var key in items) {
      var value = items[key];

      if (itemsIsArray) {
        key = +key;
      }

      if (callback(value, key, index++)) {
        result[key] = value;
      }
    }

    return itemsIsArray ? values(result) : result;
  };

  var except = function except(items) {
    for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      keys[_key - 1] = arguments[_key];
    }

    var itemsIsArray = isa(items);

    var result = {};

    keys = flatten(keys);

    for (var key in items) {
      if (itemsIsArray) {
        key = +key;
      }

      if (keys.indexOf(key) === -1) {
        result[key] = items[key];
      }
    }

    return itemsIsArray ? values(result) : result;
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
    var itemsIsArray = isa(items);

    var result = {};
    var index = 0;

    for (var key in items) {
      if (itemsIsArray) {
        key = +key;
      }

      result[key] = callback(items[key], key, index++);
    }

    return iso(items) ? result : values(result);
  };

  var mapWithKeys = function mapWithKeys(items, callback) {
    var itemsIsArray = isa(items);

    var result = {};
    var index = 0;

    for (var key in items) {
      if (itemsIsArray) {
        key = +key;
      }

      result = _extends({}, result, callback(items[key], key, index++));
    }

    return result;
  };

  var flatten = function flatten(items) {
    var result = [];

    for (var key in items) {
      var value = items[key];

      result = isa(value) || iso(value) ? [].concat(toConsumableArray(result), toConsumableArray(flatten(value))) : [].concat(toConsumableArray(result), [value]);
    }

    return result;
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

    var itemsIsArray = isa(items);

    var result = {};

    keys = flatten(keys);

    for (var key in items) {
      if (itemsIsArray) {
        key = +key;
      }

      if (keys.indexOf(key) !== -1) {
        result[key] = items[key];
      }
    }

    return iso(items) ? result : values(result);
  };

  var pipe = function pipe(items, callback) {
    return callback(items);
  };

  var pluck = function pluck(items, value) {
    var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var keyIsNull = key === null;

    var result = keyIsNull ? [] : {};

    for (var k in items) {
      var row = items[k];

      result = keyIsNull ? [].concat(toConsumableArray(result), [get$1(row, value)]) : _extends({}, result, defineProperty({}, get$1(row, key), get$1(row, value)));
    }

    return result;
  };

  var reject = function reject(items) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (callback === null) {
      throw new Error('Callback function is required.');
    }

    var itemsIsArray = isa(items);

    var result = {};
    var index = 0;

    callback = normalizeCallback(callback);

    for (var key in items) {
      if (itemsIsArray) {
        key = +key;
      }

      if (!callback(items[key], key, index++)) {
        result[key] = items[key];
      }
    }

    return iso(items) ? result : values(result);
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

    return result;
  };

  var take = function take(items, limit) {
    return slice(items, 0, limit);
  };

  var unique = function unique(items) {
    var haystack = [];
    var result = {};

    for (var key in items) {
      var value = items[key];

      if (haystack.indexOf(value) === -1) {
        result[key] = value;

        haystack.push(value);
      }
    }

    return iso(items) ? result : values(result);
  };

  var diff = function diff(items, compared) {
    return filter(items, function (item) {
      return !contains(compared, item);
    });
  };

  var diffKeys = function diffKeys(items, compared) {
    var comparedKeys = stringKeys(compared);

    return filter(_extends({}, items), function (item, key) {
      return !contains(comparedKeys, key);
    });
  };

  var intersect = function intersect(items, compared) {
    return filter(items, function (item) {
      return contains(compared, item);
    });
  };

  var intersectByKeys = function intersectByKeys(items, compared) {
    var comparedKeys = stringKeys(compared);

    return filter(_extends({}, items), function (item, key) {
      return contains(comparedKeys, key);
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
    var result = {};

    for (var k in items) {
      var row = items[k];

      result[get$1(row, key)] = row;
    }

    return result;
  };

  var groupBy = function groupBy(items, key) {
    var keyIsFunction = isf(key);
    var itemsIsArray = isa(items);

    var result = {};

    for (var k in items) {
      var row = items[k];
      var group = keyIsFunction ? key(row) : get$1(row, key);

      if (!result[group]) {
        result[group] = itemsIsArray ? [] : {};
      }

      itemsIsArray ? result[group].push(row) : result[group][k] = row;
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
    var itemsIsArray = isa(items);

    var result = itemsIsArray ? [[], []] : [{}, {}];
    var index = 0;

    for (var key in items) {
      if (itemsIsArray) {
        key = +key;
      }

      var value = items[key];
      var part = +!callback(value, key, index++);

      itemsIsArray ? result[part].push(value) : result[part][key] = value;
    }

    return result;
  };

  var flip = function flip(items) {
    var itemsIsArray = isa(items);

    var result = {};

    for (var key in items) {
      result[items[key]] = itemsIsArray ? +key : key;
    }

    return result;
  };

  var fill = function fill(items, value) {
    var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var end = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    if (!end) {
      end = count(items);
    }

    if (isa(items)) {
      return items.fill(value, start, end);
    }

    var index = 0;
    var result = {};

    for (var key in items) {
      result[key] = start <= index && index < end ? value : items[key];
      index++;
    }

    return result;
  };

  var freeze = function freeze(items) {
    return Object.freeze(items);
  };

  var isFrozen = function isFrozen(items) {
    return Object.isFrozen(items);
  };

  var methods = {
    keys: keys,
    values: values,
    contains: contains,
    count: count,
    has: has,
    get: get$1,
    set: set$1,
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
    partition: partition,
    flip: flip,
    fill: fill,
    freeze: freeze,
    isFrozen: isFrozen
  };

  var call = function call(method, items) {
    for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
      args[_key4 - 2] = arguments[_key4];
    }

    if (!isa(items) && !iso(items) || iso(items) && has(items, method)) {
      return items[method].apply(items, args);
    }

    return methods[method].apply(methods, [items].concat(args));
  };

  var isf$1 = function isf(n) {
    return Number(n) === n && n % 1 !== 0;
  };

  var random = function random() {
    var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var result = Math.random() * (max || 1);

    return max === null || isf$1(max) ? result : Math.floor(result);
  };

  var format = function format() {
    return this.toString().replace(/(.)(?=(?:\d{3})+$)/g, '$1,');
  };

  var times = function times(callback) {
    return [].concat(toConsumableArray(Array(+this).keys())).map(function (n) {
      return n + 1;
    }).map(callback);
  };

  var upto = function upto(limit, callback) {
    var _this = this;

    return times.call(limit - this + 1, function (n) {
      return n + _this - 1;
    }).map(callback);
  };

  var downto = function downto(limit, callback) {
    var _this2 = this;

    return times.call(this - limit + 1, function (n) {
      return _this2 - n + 1;
    }).map(callback);
  };

  var round = function round() {
    var precision = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return Math.round(this * Math.pow(10, precision)) / Math.pow(10, precision);
  };

  var floor = function floor() {
    return Math.floor(this);
  };

  var ceil = function ceil() {
    return Math.ceil(this);
  };

  var abs = function abs() {
    return Math.abs(this);
  };

  var createInterval = function createInterval(type, value) {
    var interval = new DateInterval();

    interval[type] = value;

    return interval;
  };

  var year = function year() {
    return createInterval('years', this);
  };

  var month = function month() {
    return createInterval('months', this);
  };

  var day = function day() {
    return createInterval('days', this);
  };

  var hour = function hour() {
    return createInterval('hours', this);
  };

  var minute = function minute() {
    return createInterval('minutes', this);
  };

  var second = function second() {
    return createInterval('seconds', this);
  };

  var millisecond = function millisecond() {
    return createInterval('milliseconds', this);
  };

  var years = function years() {
    return year.call(this);
  };

  var months = function months() {
    return month.call(this);
  };

  var days = function days() {
    return day.call(this);
  };

  var hours = function hours() {
    return hour.call(this);
  };

  var minutes = function minutes() {
    return minute.call(this);
  };

  var seconds = function seconds() {
    return second.call(this);
  };

  var milliseconds = function milliseconds() {
    return millisecond.call(this);
  };

  var staticMethods = {
    random: random
  };

  var methods$1 = {
    format: format,
    times: times,
    upto: upto,
    downto: downto,
    round: round,
    floor: floor,
    ceil: ceil,
    abs: abs,
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    second: second,
    millisecond: millisecond,
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };

  var random$1 = function random() {
    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;

    var string = '';

    while (string.length < length) {
      string += Math.random().toString(36).slice(2);
    }

    return string.slice(-length);
  };

  var slugify = function slugify() {
    return this.toLowerCase().replace(/[:/.?=&#\s]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  };

  var stripTags = function stripTags() {
    return this.replace(/<\/?[a-z0-9]+.*?>/ig, '');
  };

  var limit = function limit(length) {
    var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '...';

    return this.slice(0, length) + suffix;
  };

  var nl2br = function nl2br() {
    return this.replace(/\r\n|\n\r|\n|\r/g, '<br>');
  };

  var ucfirst = function ucfirst() {
    return this.replace(/^(.)/, function (match) {
      return match.toUpperCase();
    });
  };

  var lcfirst = function lcfirst() {
    return this.replace(/^(.)/, function (match) {
      return match.toLowerCase();
    });
  };

  var studly = function studly() {
    return this.split(/[-_ ]/).filter(function (word) {
      return word;
    }).map(function (word) {
      return ucfirst.call(word);
    }).join('');
  };

  var camel = function camel() {
    return lcfirst.call(studly.call(this));
  };

  var snake = function snake() {
    return this.split(/(?=[A-Z])|[-_ ]/g).filter(function (word) {
      return word;
    }).join('_').toLowerCase();
  };

  var kebab = function kebab() {
    return snake.call(this).replace(/_/g, '-');
  };

  var staticMethods$1 = {
    random: random$1
  };

  var methods$2 = {
    slugify: slugify,
    stripTags: stripTags,
    limit: limit,
    nl2br: nl2br,
    studly: studly,
    camel: camel,
    snake: snake,
    kebab: kebab,
    ucfirst: ucfirst,
    lcfirst: lcfirst
  };

  var Helpers = {
    Collection: _extends({ call: call }, methods),
    Number: _extends({}, staticMethods, methods$1),
    String: _extends({}, staticMethods$1, methods$2),
    init: function init() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$Number = _ref.Number,
          Number = _ref$Number === undefined ? global.Number : _ref$Number,
          _ref$String = _ref.String,
          String = _ref$String === undefined ? global.String : _ref$String;

      global.DateInterval = DateInterval;
      global.UniSharp = { Helpers: Helpers };

      Object.assign(Number, staticMethods);
      Object.assign(Number.prototype, methods$1);
      Object.assign(String, staticMethods$1);
      Object.assign(String.prototype, methods$2);
    }
  };

  var index$1 = { Helpers: Helpers };

  exports.Helpers = Helpers;
  exports.default = index$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

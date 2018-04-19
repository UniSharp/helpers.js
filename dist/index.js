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

  Array.prototype.contains = function (needle) {
    return this.indexOf(needle) !== -1;
  };

  Array.prototype.count = function () {
    return this.length;
  };

  Array.prototype.sum = function () {
    return this.reduce(function (sum, n) {
      return sum + +n;
    }, 0);
  };

  Array.prototype.avg = function () {
    return this.sum() / this.count();
  };

  Array.prototype.each = function (callback) {
    var count = this.count();

    for (var i = 0; i < count; i++) {
      if (callback(this[i], i) === false) {
        break;
      }
    }

    return this;
  };

  Array.prototype.toArray = function () {
    return this.map(function (value) {
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Object) {
        value = value.toArray();
      }

      return value;
    });
  };

  Array.prototype.chunk = function (size) {
    return _extends({}, this).chunk(size).toArray();
  };

  Array.prototype.first = function () {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (!callback) {
      return this[0];
    }

    return this.filter(callback)[0];
  };

  Array.prototype.last = function () {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var array = this;

    if (callback) {
      array = array.filter(callback);
    }

    return array[array.count() - 1];
  };

  Array.prototype.flatten = function () {
    return _extends({}, this).flatten().toArray();
  };

  Array.prototype.min = function () {
    return Math.min.apply(Math, toConsumableArray(this));
  };

  Array.prototype.max = function () {
    return Math.max.apply(Math, toConsumableArray(this));
  };

  Array.prototype.unique = function () {
    return [].concat(toConsumableArray(new Set(this)));
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

  Object.isObject = function (obj) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor === Object;
  };

  Object.prototype.keys = function () {
    return Object.keys(this);
  };

  Object.prototype.values = function () {
    return Object.values(this);
  };

  Object.prototype.contains = function (needle) {
    return this.values().contains(needle);
  };

  Object.prototype.count = function () {
    return this.keys().count();
  };

  Object.prototype.sum = function () {
    return this.values().sum();
  };

  Object.prototype.avg = function () {
    return this.values().sum() / this.count();
  };

  Object.prototype.each = function (callback) {
    var _this = this;

    var count = 0;

    this.keys().each(function (key) {
      return callback(_this[key], key, count++);
    });

    return this;
  };

  Object.prototype.slice = function () {
    var begin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var result = {};

    if (end === null) {
      end = this.count();
    }

    if (begin < 0) {
      begin = this.count() + begin;
    }

    if (end < 0) {
      end = this.count() + end;
    }

    this.each(function (value, key, index) {
      if (index >= begin && index < end) {
        result[key] = value;
      }
    });

    return result;
  };

  Object.prototype.toArray = function () {
    var result = [];

    this.each(function (value) {
      if (Object.isObject(value)) {
        value = value.toArray();
      }

      result.push(value);
    });

    return result;
  };

  Object.prototype.chunk = function (size) {
    var _this2 = this;

    return Math.ceil(this.count() / size).times(function (n) {
      return _this2.slice((n - 1) * size, n * size);
    });
  };

  Object.prototype.filter = function (callback) {
    var result = {};

    this.each(function (value, key) {
      if (callback(value, key)) {
        result[key] = value;
      }
    });

    return result;
  };

  Object.prototype.first = function () {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var object = this;

    if (callback) {
      object = object.filter(callback);
    }

    return object.values()[0];
  };

  Object.prototype.last = function () {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var object = this;

    if (callback) {
      object = object.filter(callback);
    }

    return object.values()[object.count() - 1];
  };

  Object.prototype.map = function (callback) {
    var result = {};

    this.each(function (value, key, index) {
      result[key] = callback(value, key, index);
    });

    return result;
  };

  Object.prototype.reduce = function (callback) {
    var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var result = init;

    this.each(function (value, key, index) {
      result = callback(result, value, key, index);
    });

    return result;
  };

  Object.prototype.flatten = function () {
    return this.reduce(function (flatten, toFlatten) {
      if (Array.isArray(toFlatten) || Object.isObject(toFlatten)) {
        toFlatten = toFlatten.flatten();
      }

      return flatten.concat(toFlatten);
    }, []);
  };

  Object.prototype.min = function () {
    return this.values().min();
  };

  Object.prototype.max = function () {
    return this.values().max();
  };

  Object.prototype.unique = function () {
    var haystack = [];
    var result = {};

    this.each(function (value, key) {
      if (!haystack.contains(value)) {
        result[key] = value;
        haystack.push(value);
      }
    });

    return result;
  };

  String.prototype.slugify = function () {
    return this.toLowerCase().replace(/[:/.?=&\s]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  };

})));

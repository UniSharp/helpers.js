(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

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

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  (function () {
    Array.prototype.contains = function (needle) {
      return this.indexOf(needle) !== -1;
    };

    // Array.prototype.has = function (key) {
    //   return {...this}.has(key)
    // }
    //
    // Array.prototype.get = function (key, defaultValue = null) {
    //   return {...this}.get(key, defaultValue)
    // }

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
        if (Object.isObject(value)) {
          value = value.toArray();
        }

        return value;
      });
    };

    // Array.prototype.chunk = function (size) {
    //   return {...this}.chunk(size).toArray()
    // }

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

    // Array.prototype.flatten = function () {
    //   return {...this}.flatten().toArray()
    // }

    Array.prototype.min = function () {
      return Math.min.apply(Math, toConsumableArray(this));
    };

    Array.prototype.max = function () {
      return Math.max.apply(Math, toConsumableArray(this));
    };

    Array.prototype.unique = function () {
      return [].concat(toConsumableArray(new Set(this)));
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
    String.prototype.slugify = function () {
      return this.toLowerCase().replace(/[:/.?=&\s]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
    };
  })();

})));

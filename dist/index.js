'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint no-extend-native: [error, { exceptions: ['String', 'Number', 'Array'] }] */

Array.prototype.count = function () {
  return this.length;
};

Array.prototype.sum = function () {
  return this.reduce(function (sum, n) {
    return sum + +n;
  }, 0);
};

Array.prototype.avg = function () {
  return this.sum() / this.length;
};

Array.prototype.min = function () {
  return Math.min.apply(Math, _toConsumableArray(this));
};

Array.prototype.max = function () {
  return Math.max.apply(Math, _toConsumableArray(this));
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

  return array[array.length - 1];
};

Array.prototype.unique = function () {
  return [].concat(_toConsumableArray(new Set(this)));
};

Array.prototype.chunk = function (size) {
  var _this = this;

  return [].concat(_toConsumableArray(Array(Math.ceil(this.count() / size)).keys())).map(function (n) {
    return _this.slice(n * size, (n + 1) * size);
  });
};

Array.prototype.flatten = function () {
  return this.reduce(function (flatten, toFlatten) {
    if (Array.isArray(toFlatten)) {
      toFlatten = toFlatten.flatten();
    }

    return flatten.concat(toFlatten);
  }, []);
};

String.prototype.slugify = function () {
  return this.toLowerCase().replace(/[:/.?=&\s]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
};

Number.prototype.format = function () {
  return this.toString().replace(/(.)(?=(?:\d{3})+$)/g, '$1,');
};

Number.prototype.times = function (callback) {
  return [].concat(_toConsumableArray(Array(+this).keys())).each(callback);
};

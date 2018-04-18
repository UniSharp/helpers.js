'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint no-extend-native: [error, { exceptions: ['String', 'Number', 'Array'] }] */

Array.prototype.count = function () {
  return this.length;
};

Array.prototype.sum = function () {
  return this.reduce(function (sum, n) {
    return sum + n;
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
  this.forEach(callback);
};

String.prototype.slugify = function () {
  return this.toLowerCase().replace(/[:/.?=&\s]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
};

Number.prototype.format = function () {
  var withDollarSign = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  return '' + (withDollarSign ? '$ ' : '') + this.toString().replace(/(.)(?=(?:\d{3})+$)/g, '$1,');
};

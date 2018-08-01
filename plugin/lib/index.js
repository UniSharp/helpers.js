'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      CallExpression: function CallExpression(path) {
        if (!path.node.callee || !path.node.callee.object || !path.node.callee.property) {
          return;
        }

        if (['Identifier', 'MemberExpression', 'ArrayExpression', 'ObjectExpression', 'CallExpression'].indexOf(path.node.callee.object.type) === -1) {
          return;
        }

        if (path.node.callee.object.type === 'Identifier' && path.node.callee.object.name === 'UniSharp.Helpers' && path.node.callee.property.name === 'collection') {
          return;
        }

        var args = path.node.arguments;
        var object = path.node.callee.object;
        var method = path.node.callee.property.name;

        if (METHODS.indexOf(method) === -1) {
          return;
        }

        path.replaceWith(t.callExpression(t.memberExpression(t.identifier('UniSharp.Helpers'), t.identifier('collection')), [t.stringLiteral(method), object].concat(_toConsumableArray(args))));
      }
    }
  };
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var METHODS = ['keys', 'values', 'contains', 'count', 'has', 'get', 'sum', 'avg', 'each', 'slice', 'reduce', 'toArray', 'chunk', 'except', 'filter', 'isEmpty', 'isNotEmpty', 'first', 'last', 'map', 'mapWithKeys', 'flatten', 'min', 'max', 'only', 'pipe', 'pluck', 'reject', 'swap', 'shuffle', 'take', 'unique', 'diff', 'diffKeys', 'intersect', 'intersectByKeys', 'merge'];
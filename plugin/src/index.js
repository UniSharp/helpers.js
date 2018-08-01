const METHODS = [
  'keys',
  'values',
  'contains',
  'count',
  'has',
  'get',
  'sum',
  'avg',
  'each',
  'slice',
  'reduce',
  'toArray',
  'chunk',
  'except',
  'filter',
  'isEmpty',
  'isNotEmpty',
  'first',
  'last',
  'map',
  'mapWithKeys',
  'flatten',
  'min',
  'max',
  'only',
  'pipe',
  'pluck',
  'reject',
  'swap',
  'shuffle',
  'take',
  'unique',
  'diff',
  'diffKeys',
  'intersect',
  'intersectByKeys',
  'merge'
]

export default function({ types: t }) {
  return {
    visitor: {
      CallExpression (path) {
        if (!path.node.callee || !path.node.callee.object || !path.node.callee.property) {
          return
        }

        if (['Identifier', 'MemberExpression', 'ArrayExpression', 'ObjectExpression', 'CallExpression'].indexOf(path.node.callee.object.type) === -1) {
          return
        }

        if (path.node.callee.object.type === 'Identifier' &&
            path.node.callee.object.name === 'UniSharp.Helpers' &&
            path.node.callee.property.name === 'collection') {
          return
        }

        let args = path.node.arguments
        let object = path.node.callee.object
        let method = path.node.callee.property.name

        if (METHODS.indexOf(method) === -1) {
          return
        }

        path.replaceWith(
          t.callExpression(
            t.memberExpression(
              t.identifier('UniSharp.Helpers'),
              t.identifier('collection')
            ),
            [t.stringLiteral(method), object, ...args]
          )
        )
      }
    }
  }
}

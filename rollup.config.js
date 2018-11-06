import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    name: 'UniSharp',
    format: 'umd'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: [['env', { 'modules': false }]],
      plugins: [
        'external-helpers',
        'transform-object-rest-spread'
      ]
    })
  ]
}

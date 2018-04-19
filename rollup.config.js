import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}

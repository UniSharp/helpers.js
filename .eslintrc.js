module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    'no-extend-native': ['error', { exceptions: ['String', 'Number', 'Array', 'Object'] }],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error']
  }
}

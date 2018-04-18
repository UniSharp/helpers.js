# Helpers.js

[![Build Status](https://travis-ci.org/UniSharp/helpers.js.svg?branch=master)](https://travis-ci.org/UniSharp/helpers.js)

## Installation

### Via npm

```bash
npm install @unisharp/helpers.js --save
```

### Via yarn

```bash
yarn add @unisharp/helpers.js
```

## Usage

```javascript
require('@unisharp/helpers.js')

// Array
[1, 2, 3].count() // 3
[1, 2, 3].sum()   // 6
[1, 2, 3].avg()   // 2
[1, 2, 3].min()   // 1
[1, 2, 3].max()   // 3
[1, 2, 3].each()  // Alias for the forEach method.

// String
'Hello World'.slugify() // 'hello-world'

// Number
(1000000).format() // '$ 1,000,000'
```

## License

[MIT](https://unisharp.mit-license.org/)

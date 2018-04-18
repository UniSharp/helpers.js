# Helper.js

[![Build Status](https://travis-ci.org/UniSharp/helper.js.svg?branch=master)](https://travis-ci.org/UniSharp/helper.js)

## Installation

### Via npm

```bash
npm install @unisharp/helper.js --save
```

### Via yarn

```bash
yarn add @unisharp/helper.js
```

## Usage

```javascript
require('@unisharp/helper.js')

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

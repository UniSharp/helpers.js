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

## Getting Started

```javascript
require('@unisharp/helpers.js')

[1, 2, 3].count()  // 3
[1, 2, 3].avg()    // 2
[1, 2, 2].unique() // [1, 2]
```

## Usage

### Array

`count()`

```javascript
[1, 2, 3, 4, 5].count() // 5
```

`sum()`

```javascript
[1, 2, 3, 4, 5].count() // 15
```

`avg()`

```javascript
[1, 2, 3, 4, 5].count() // 3
```

`min()`

```javascript
[1, 2, 3, 4, 5].count() // 1
```

`max()`

```javascript
[1, 2, 3, 4, 5].count() // 5
```

`each()`

```javascript
[1, 2, 3, 4, 5].each((value, index) => {
  //
})
```

`first()`

```javascript
[1, 2, 3, 4, 5].first() // 1
[1, 2, 3, 4, 5].first(n => n > 1) // 2
```

`last()`

```javascript
[1, 2, 3, 4, 5].last() // 5
[1, 2, 3, 4, 5].last(n => n < 5) // 4
```

`unique()`

```javascript
[1, 1, 2, 2, 3].unique() // [1, 2, 3]
```

`chunk()`

```javascript
[1, 2, 3, 4, 5].chunk(2) // [[1, 2], [3, 4], [5]]
```

`flatten()`

```javascript
[[1, 2], [3, 4], [5]].flatten() // [1, 2, 3, 4, 5]
```

### String

`slugify()`

```javascript
'Hello World'.slugify() // 'hello-world'
```

### Number

`format()`

```javascript
(1000000).format() // '1,000,000'
```

`times()`

```javascript
(5).times(n => n) // [0, 1, 2, 3, 4]
```

## License

[MIT](https://unisharp.mit-license.org/)

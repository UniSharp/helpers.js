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

[1, 2, 3].count()          // 3
[1, 2, 3].avg()            // 2
[1, 2, 2].unique()         // [1, 2]
{ a: 1, b: 2, c: 3 }.sum() // 6
```

## Usage

### Array

`contains()`

```javascript
[1, 2, 3, 4, 5].contains(3) // true
[1, 2, 3, 4, 5].contains(6) // false
```

`count()`

```javascript
[1, 2, 3, 4, 5].count() // 5
```

`sum()`

```javascript
[1, 2, 3, 4, 5].sum() // 15
```

`avg()`

```javascript
[1, 2, 3, 4, 5].avg() // 3
```

`each()`

```javascript
[1, 2, 3, 4, 5].each((value, index) => {
  //
})
```

`toArray()`

```javascript
[{ a: 1, b: 2 }, { c: 3 }].toArray() // [1, 2, 3]
```

`chunk()`

```javascript
[1, 2, 3, 4, 5].chunk(2) // [[1, 2], [3, 4], [5]]
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

`flatten()`

```javascript
[[1, 2], [3, 4], [5]].flatten() // [1, 2, 3, 4, 5]
```

`min()`

```javascript
[1, 2, 3, 4, 5].min() // 1
```

`max()`

```javascript
[1, 2, 3, 4, 5].max() // 5
```

`unique()`

```javascript
[1, 1, 2, 2, 3].unique() // [1, 2, 3]
```

### Object

`isObject()`

```javascript
Object.isObject({}) // true
Object.isObject([]) // false
```

`keys()`

```javascript
{ a: 1, b: 2, c: 3 }.keys() // ['a', 'b', 'c']
```

`values()`

```javascript
{ a: 1, b: 2, c: 3 }.values() // [1, 2, 3]
```

`contains()`

```javascript
{ a: 1, b: 2, c: 3 }.contains(3) // true
{ a: 1, b: 2, c: 3 }.contains(4) // false
```

`count()`

```javascript
{ a: 1, b: 2, c: 3 }.count() // 3
```

`sum()`

```javascript
{ a: 1, b: 2, c: 3 }.sum() // 6
```

`avg()`

```javascript
{ a: 1, b: 2, c: 3 }.avg() // 2
```

`each()`

```javascript
{ a: 1, b: 2, c: 3 }.each((value, key, index) => {
  //
})
```

`slice()`

```javascript
{ a: 1, b: 2, c: 3 }.slice(1)     // { b: 2, c: 3 }
{ a: 1, b: 2, c: 3 }.slice(-1)    // { c: 3 }
{ a: 1, b: 2, c: 3 }.slice(1, 2)  // { b: 2 }
{ a: 1, b: 2, c: 3 }.slice(1, -1) // { b: 2 }
```

`toArray()`

```javascript
{ a: { a: 1, b: 2 }, b: { c: 3 }}.toArray() // [1, 2, 3]
```

`chunk()`

```javascript
{ a: 1, b: 2, c: 3 }.chunk(2) // [{ a: 1, b: 2 }, { c: 3 }]
```

`filter()`

```javascript
{ a: 1, b: 2, c: 3 }.filter((value, key, index) => value > 1) // { b: 2, c: 3 }
```

`first()`

```javascript
{ a: 1, b: 2, c: 3 }.first() // 1
{ a: 1, b: 2, c: 3 }.first(n => n > 1) // 2
```

`last()`

```javascript
{ a: 1, b: 2, c: 3 }.last() // 3
{ a: 1, b: 2, c: 3 }.last(n => n < 3) // 2
```

`map()`

```javascript
{ a: 1, b: 2, c: 3 }.map((value, key, index) => value * 2) // { a: 2, b: 4, c: 6 }
```

`reduce()`

```javascript
{ a: 1, b: 2, c: 3 }.reduce((carry, value, key, index) => carry + value) // 6
```

`flatten()`

```javascript
{ a: { a: 1, b: 2 }, b: { c: 3 } }.flatten() // [1, 2, 3]
```

`min()`

```javascript
{ a: 1, b: 2, c: 3 }.min() // 1
```

`max()`

```javascript
{ a: 1, b: 2, c: 3 }.max() // 3
```

`unique()`

```javascript
{ a: 1, b: 2, c: 2 }.unique() // { a: 1, b: 2 }
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
(5).times(n => n) // [1, 2, 3, 4, 5]
```

`upto()`

```javascript
(1).upto(5, n => n) // [1, 2, 3, 4, 5]
```

`downto()`

```javascript
(5).downto(1, n => n) // [5, 4, 3, 2, 1]
```

## License

[MIT](https://unisharp.mit-license.org/)

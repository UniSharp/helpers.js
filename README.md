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

First, add our babel plugin to your bable configuration.

```
{
  "plugins": ["@unisharp/helpers.js/plugin/lib"]
}
```

Then require main library to happy coding.

```javascript
require('@unisharp/helpers.js')

[1, 2, 3].count()          // 3
[1, 2, 3].avg()            // 2
[1, 2, 2].unique()         // [1, 2]
{ a: 1, b: 2, c: 3 }.sum() // 6
```

## Usage

### Collection

#### keys

```javascript
[1, 2, 3, 4, 5].keys()      // [0, 1, 2, 3, 4]
{ a: 1, b: 2, c: 3 }.keys() // ['a', 'b', 'c']
```

#### values

```javascript
[1, 2, 3, 4, 5].values()      // [1, 2, 3, 4, 5]
{ a: 1, b: 2, c: 3 }.values() // [1, 2, 3]
```

#### contains

```javascript
[1, 2, 3, 4, 5].contains(3)      // true
[1, 2, 3, 4, 5].contains(6)      // false
{ a: 1, b: 2, c: 3 }.contains(3) // true
{ a: 1, b: 2, c: 3 }.contains(4) // false
```

#### count

```javascript
[1, 2, 3, 4, 5].count()      // 5
{ a: 1, b: 2, c: 3 }.count() // 3
```

#### has

```javascript
[1, 2, 3, 4, 5].has(2)              // true
[1, 2, 3, 4, 5].has(5)              // false
{ a: { b: { c: 1 } } }.has('a.b.c') // true
{ a: { b: { c: 1 } } }.has('a.b.d') // false
```

#### get

```javascript
[1, 2, 3, 4, 5].get(2, 'default')              // 3
[1, 2, 3, 4, 5].get(5, 'default')              // 'default'
{ a: { b: { c: 1 } } }.get('a.b.c', 'default') // 1
{ a: { b: { c: 1 } } }.get('a.b.c', 'default') // 'default'
```

#### sum

```javascript
[1, 2, 3, 4, 5].sum()      // 15
{ a: 1, b: 2, c: 3 }.sum() // 6
```

#### avg

```javascript
[1, 2, 3, 4, 5].avg()      // 3
{ a: 1, b: 2, c: 3 }.avg() // 2
```

#### each

```javascript
[1, 2, 3, 4, 5].each((value, index) => { /* ... */ })
{ a: 1, b: 2, c: 3 }.each((value, key, index) => { /* ... */ })
```

#### slice

```javascript
[1, 2, 3, 4, 5].slice(1)          // [2, 3, 4, 5]
[1, 2, 3, 4, 5].slice(-1)         // [5]
[1, 2, 3, 4, 5].slice(1, 2)       // [2]
[1, 2, 3, 4, 5].slice(1, -1)      // [2, 3, 4]
{ a: 1, b: 2, c: 3 }.slice(1)     // { b: 2, c: 3 }
{ a: 1, b: 2, c: 3 }.slice(-1)    // { c: 3 }
{ a: 1, b: 2, c: 3 }.slice(1, 2)  // { b: 2 }
{ a: 1, b: 2, c: 3 }.slice(1, -1) // { b: 2 }
```

#### reduce

```javascript
[1, 2, 3, 4, 5].reduce((carry, value, index) => carry + value)           // 15
{ a: 1, b: 2, c: 3 }.reduce((carry, value, key, index) => carry + value) // 6
```

#### toArray

```javascript
[{ a: 1, b: 2 }, { c: 3 }].toArray()        // [1, 2, 3]
{ a: { a: 1, b: 2 }, b: { c: 3 }}.toArray() // [1, 2, 3]
```

#### chunk

```javascript
[1, 2, 3, 4, 5].chunk(2)      // [[1, 2], [3, 4], [5]]
{ a: 1, b: 2, c: 3 }.chunk(2) // [{ a: 1, b: 2 }, { c: 3 }]
```

#### except

```javascript
[1, 2, 3, 4, 5].except(0, 1, 2)         // [4, 5]
{ a: 1, b: 2, c: 3 }.except('a', 'b')   // { c: 3 }
[1, 2, 3, 4, 5].except([0, 1, 2])       // [4, 5]
{ a: 1, b: 2, c: 3 }.except(['a', 'b']) // { c: 3 }
```

#### filter

```javascript
[1, 2, 3, 4, 5].filter((value, index) => value > 1)           // [2, 3, 4, 5]
{ a: 1, b: 2, c: 3 }.filter((value, key, index) => value > 1) // { b: 2, c: 3 }
```

#### isEmpty

```javascript
[].isEmpty()                   // true
[1, 2, 3, 4, 5].isEmpty()      // false
{}.isEmpty()                   // true
{ a: 1, b: 2, c: 3 }.isEmpty() // false
```

#### isNotEmpty

```javascript
[].isNotEmpty()                   // false
[1, 2, 3, 4, 5].isNotEmpty()      // true
{}.isNotEmpty()                   // false
{ a: 1, b: 2, c: 3 }.isNotEmpty() // true
```

#### first

```javascript
[1, 2, 3, 4, 5].first()                // 1
[1, 2, 3, 4, 5].first(n => n > 1)      // 2
{ a: 1, b: 2, c: 3 }.first()           // 1
{ a: 1, b: 2, c: 3 }.first(n => n > 1) // 2
```

#### last

```javascript
[1, 2, 3, 4, 5].last()                // 5
[1, 2, 3, 4, 5].last(n => n < 5)      // 4
{ a: 1, b: 2, c: 3 }.last()           // 3
{ a: 1, b: 2, c: 3 }.last(n => n < 3) // 2
```

#### map

```javascript
[1, 2, 3, 4, 5].map((value, index) => value * 2)           // [2, 4, 6, 8, 10]
{ a: 1, b: 2, c: 3 }.map((value, key, index) => value * 2) // { a: 2, b: 4, c: 6 }
```

#### flatten

```javascript
[[1, 2], [3, 4], [5]].flatten() // [1, 2, 3, 4, 5]
{ a: { a: 1, b: 2 }, b: { c: 3 } }.flatten() // [1, 2, 3]
```

#### min

```javascript
[1, 2, 3, 4, 5].min()      // 1
{ a: 1, b: 2, c: 3 }.min() // 1
```

#### max

```javascript
[1, 2, 3, 4, 5].max()      // 5
{ a: 1, b: 2, c: 3 }.max() // 3
```

#### only

```javascript
[1, 2, 3, 4, 5].only(0, 1, 2)         // [1, 2, 3]
{ a: 1, b: 2, c: 3 }.only('a', 'b')   // { a: 1, b: 2 }
[1, 2, 3, 4, 5].only([0, 1, 2])       // [1, 2, 3]
{ a: 1, b: 2, c: 3 }.only(['a', 'b']) // { a: 1, b: 2 }
```

#### pipe

```javascript
[1, 2, 3, 4, 5].pipe(items => [...items, 6])           // [1, 2, 3, 4, 5, 6]
{ a: 1, b: 2, c: 3 }.pipe(items => { ...items, d: 4 }) // { a: 1, b: 2, c: 3, d: 4 }
```

#### pluck

```javascript
[[1, 2, 3], [1, 2, 3]].pluck(0)                      // [1, 1]
[{ a: 1, b: 2 }, { a: 1, b: 2 }].pluck('a')          // [1, 1]
{ a: { a: 1, b: 2 }, b: { a: 1, b: 2 } }.pluck('a')  // [1, 1]
[{ a: 1, b: 'a' }, { a: 2, b: 'b' }].pluck('a', 'b') // { a: 1, b: 2 }
```

#### reject

```javascript
[1, 2, 3, 4, 5].reject((value, index) => value > 4)           // [1, 2, 3, 4]
{ a: 1, b: 2, c: 3 }.reject((value, key, index) => value > 2) // { a: 1, b: 2 }
```

#### swap

```javascript
[1, 2, 3, 4, 5].swap(0, 1)          // [2, 1, 3, 4, 5]
{ a: 1, b: 2, c: 3 }.swap('a', 'b') // { a: 2, b: 1, c: 3 }
```

#### shuffle

```javascript
[1, 2, 3, 4, 5].shuffle() // [3, 5, 1, 4, 2]
```

#### take

```javascript
[1, 2, 3, 4, 5].take(2)      // [1, 2]
{ a: 1, b: 2, c: 3 }.swap(2) // { a: 1, b: 2 }
```

#### unique

```javascript
[1, 1, 2, 2, 3].unique()      // [1, 2, 3]
{ a: 1, b: 2, c: 2 }.unique() // { a: 1, b: 2 }
```

### Object

#### isObject

```javascript
Object.isObject({}) // true
Object.isObject([]) // false
```

### String

#### random

```javascript
String.random()   // 'hnq6dmd5f9keo20d'
String.random(10) // 'erbzjw0rks'
```

#### slugify

```javascript
'Hello World'.slugify() // 'hello-world'
```

#### stripTags

```javascript
'<h1>Hello World</h1>'.stripTags() // 'Hello World'
```

#### limit

```javascript
'Hello World'.limit(5)        // 'Hello...'
'Hello World'.limit(5, '***') // 'Hello'***')'
```

#### nl2br

```javascript
'Hello\nWorld'.nl2br() // 'Hello<br>World'
```

### Number

#### format

```javascript
(1000000).format() // '1,000,000'
```

#### times

```javascript
(5).times(n => n) // [1, 2, 3, 4, 5]
```

#### upto

```javascript
(1).upto(5, n => n) // [1, 2, 3, 4, 5]
```

#### downto

```javascript
(5).downto(1, n => n) // [5, 4, 3, 2, 1]
```

### Date

```javascript
(1).year().ago()
(10).days().ago()
(1).hour().after()
(10).minutes().after(new Date(2000, 1, 1, 1, 1, 1, 1))
```

## License

[MIT](https://unisharp.mit-license.org/)

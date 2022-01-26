# Helpers.js

[![Build Status](https://app.travis-ci.com/UniSharp/helpers.js.svg?branch=master)](https://app.travis-ci.com/UniSharp/helpers.js)
[![Coverage Status](https://coveralls.io/repos/github/UniSharp/helpers.js/badge.svg?branch=master)](https://coveralls.io/github/UniSharp/helpers.js?branch=master)
[![npm version](https://badge.fury.io/js/%40unisharp%2Fhelpers.js.svg)](https://badge.fury.io/js/%40unisharp%2Fhelpers.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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
  "plugins": ["@unisharp/babel-plugin"]
}
```

Then require main library to happy coding.

```javascript
import { Helpers } from '@unisharp/helpers.js'

Helpers.init({ global })

1.5.floor()                // 1
'Hello World'.slugify()    // 'hello-world'
[1, 2, 3].count()          // 3
[1, 2, 3].avg()            // 2
[1, 2, 2].unique()         // [1, 2]
{ a: 1, b: 2, c: 3 }.sum() // 6
```

## Nuxt Support

Just add `@unisharp/helpers.js/nuxt` to the `buildModules` section of `nuxt.config.js`, and no more extra configuration is needed.

```javascript
// nuxt.config.js
{
  buildModules: [
    '@unisharp/helpers.js/nuxt',
  ],
}
```

## Available Methods

- [**Collection**](#collection)
  - [append](#append)
  - [avg](#avg)
  - [chunk](#chunk)
  - [contains](#contains)
  - [count](#count)
  - [diff](#diff)
  - [diffKeys](#diffkeys)
  - [each](#each)
  - [except](#except)
  - [fill](#fill)
  - [filter](#filter)
  - [first](#first)
  - [flatMap](#flatmap)
  - [flatten](#flatten)
  - [flip](#flip)
  - [freeze](#freeze)
  - [get](#get)
  - [groupBy](#groupby)
  - [has](#has)
  - [index](#index)
  - [insert](#insert)
  - [intersect](#intersect)
  - [intersectByKeys](#intersectbykeys)
  - [isEmpty](#isempty)
  - [isFrozen](#isfrozen)
  - [isNotEmpty](#isnotempty)
  - [join](#join)
  - [keyBy](#keyby)
  - [keys](#keys)
  - [last](#last)
  - [map](#map)
  - [mapWithKeys](#mapwithkeys)
  - [max](#max)
  - [merge](#merge)
  - [min](#min)
  - [only](#only)
  - [partition](#partition)
  - [pipe](#pipe)
  - [pluck](#pluck)
  - [prepend](#prepend)
  - [reduce](#reduce)
  - [reject](#reject)
  - [reverse](#reverse)
  - [set](#set)
  - [shuffle](#shuffle)
  - [slice](#slice)
  - [sort](#sort)
  - [sortDesc](#sortdesc)
  - [sortBy](#sortby)
  - [sortByDesc](#sortbydesc)
  - [sum](#sum)
  - [swap](#swap)
  - [take](#take)
  - [toArray](#toarray)
  - [unique](#unique)
  - [values](#values)
- [**String**](#string)
  - [camel](#camel)
  - [kebab](#kebab)
  - [lcfirst](#lcfirst)
  - [limit](#limit)
  - [nl2br](#nl2br)
  - [random](#random)
  - [slugify](#slugify)
  - [snake](#snake)
  - [stripTags](#striptags)
  - [studly](#studly)
  - [title](#title)
  - [ucfirst](#ucfirst)
- [**Number**](#number)
  - [abs](#abs)
  - [ceil](#ceil)
  - [downto](#downto)
  - [floor](#floor)
  - [format](#format)
  - [random](#random)
  - [round](#round)
  - [times](#times)
  - [upto](#upto)
- [**Date**](#date)

## Usage

### Collection

#### append

```javascript
[1, 2, 3, 4].append(5)        // [1, 2, 3, 4, 5]
{ a: 1, b: 2 }.append(3, 'c') // { a: 1, b: 2, c: 3 }
```

#### avg

```javascript
[1, 2, 3, 4, 5].avg()                     // 3
{ a: 1, b: 2, c: 3 }.avg()                // 2
[{ a: 1, b: 2 }, { a: 3, b: 4 }].avg('a') // 2
```

#### chunk

```javascript
[1, 2, 3, 4, 5].chunk(2)      // [[1, 2], [3, 4], [5]]
{ a: 1, b: 2, c: 3 }.chunk(2) // [{ a: 1, b: 2 }, { c: 3 }]
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

#### diff

```javascript
[1, 2, 3, 4, 5].diff([1, 2, 3])           // [4, 5]
{ a: 1, b: 2, c: 3 }.diff({ a: 1, b: 2 }) // { c: 3 }
```

#### diffKeys

```javascript
{ a: 1, b: 2, c: 3 }.diffKeys({ a: 1, b: 2 }) // { c: 3 }
```

#### each

```javascript
[1, 2, 3, 4, 5].each((value, index) => { /* ... */ })
{ a: 1, b: 2, c: 3 }.each((value, key, index) => { /* ... */ })
```

#### except

```javascript
[1, 2, 3, 4, 5].except(0, 1, 2)         // [4, 5]
{ a: 1, b: 2, c: 3 }.except('a', 'b')   // { c: 3 }
[1, 2, 3, 4, 5].except([0, 1, 2])       // [4, 5]
{ a: 1, b: 2, c: 3 }.except(['a', 'b']) // { c: 3 }
```

#### fill

```javascript
{ a: 1, b: 2, c: 3 }.fill(6) // { a: 6, b: 6, c: 6 }
```

#### filter

```javascript
{ a: 1, b: 2, c: 3 }.filter((value, key, index) => value > 1) // { b: 2, c: 3 }
```

#### first

```javascript
[1, 2, 3, 4, 5].first()                // 1
[1, 2, 3, 4, 5].first(n => n > 1)      // 2
{ a: 1, b: 2, c: 3 }.first()           // 1
{ a: 1, b: 2, c: 3 }.first(n => n > 1) // 2
```

##### flatMap

```javascript
{ a: 1, b: 2 }.flatMap((value, key, index) => ({ [key]: value, [index]: value + 1 })) // { a: 1, 0: 2, b: 2, 1: 3 }
```

#### flatten

```javascript
[[1, 2], [3, 4], [5]].flatten()              // [1, 2, 3, 4, 5]
{ a: { a: 1, b: 2 }, b: { c: 3 } }.flatten() // [1, 2, 3]
```

#### flip

```javascript
['a', 'b', 'c'].flip()      // { a: 0, b: 1, c: 2 }
{ a: 1, b: 2, c: 3 }.flip() // { 1: 'a', 2: 'b', 3: 'c' }
```

#### freeze

```javascript
['a', 'b', 'c'].freeze()      // ['a', 'b', 'c']
{ a: 1, b: 2, c: 3 }.freeze() // { a: 1, b: 2, c: 3 }
```

#### get

```javascript
[1, 2, 3, 4, 5].get(2, 'default')              // 3
[1, 2, 3, 4, 5].get(5, 'default')              // 'default'
{ a: { b: { c: 1 } } }.get('a.b.c', 'default') // 1
{ a: { b: { c: 1 } } }.get('a.b.c', 'default') // 'default'
```

#### groupBy

```javascript
[{ a: 'a' }, { a: 'a' }].groupBy('a')         // { a: [{ a: 'a' }, { a: 'a' }] }
{ a: { a: 'a' }, b: { a: 'a' } }.groupBy('a') // { a: { a: { a: 'a' }, b: { a: 'a' } } }
```

#### has

```javascript
[1, 2, 3, 4, 5].has(2)              // true
[1, 2, 3, 4, 5].has(5)              // false
{ a: { b: { c: 1 } } }.has('a.b.c') // true
{ a: { b: { c: 1 } } }.has('a.b.d') // false
```

#### index

```javascript
[1, 2, 3, 4, 5].index(3)      // 2
{ a: 1, b: 2, c: 3 }.index(2) // b
```

#### insert

```javascript
[1, 2, 4, 5].insert(2, 3)          // [1, 2, 3, 4, 5]
{ a: 1, c: 3 }.insert('c', 2, 'b') // { a: 1, b: 2, c: 3 }
```

#### intersect

```javascript
[1, 2, 3, 4, 5].intersect([1, 2, 3])           // [1, 2, 3]
{ a: 1, b: 2, c: 3 }.intersect({ a: 1, b: 2 }) // { a: 1, b: 2 }
```

#### intersectByKeys

```javascript
{ a: 1, b: 2, c: 3 }.intersectByKeys({ a: 1, b: 2 }) // { a: 1, b: 2 }
```

#### isEmpty

```javascript
[].isEmpty()                   // true
[1, 2, 3, 4, 5].isEmpty()      // false
{}.isEmpty()                   // true
{ a: 1, b: 2, c: 3 }.isEmpty() // false
```

#### isFrozen

```javascript
[1, 2, 3, 4, 5].isFrozen()      // false
{ a: 1, b: 2, c: 3 }.isFrozen() // false
```

#### isNotEmpty

```javascript
[].isNotEmpty()                   // false
[1, 2, 3, 4, 5].isNotEmpty()      // true
{}.isNotEmpty()                   // false
{ a: 1, b: 2, c: 3 }.isNotEmpty() // true
```

#### join

```javascript
{ a: 1, b: 2, c: 3 }.join()    // 1,2,3
{ a: 1, b: 2, c: 3 }.join('-') // 1-2-3
```

#### keyBy

```javascript
[{ a: 1, b: 'a' }, { a: 2, b: 'b' }].keyBy('b')         // { a: { a: 1, b: 'a' }, b: { a: 2, b: 'b' } }
{ a: { a: 1, b: 'c' }, b: { a: 2, b: 'd' } }.keyBy('b') // { c: { a: 1, b: 'c' }, d: { a: 2, b: 'd' } }
```

#### keys

```javascript
{ a: 1, b: 2, c: 3 }.keys() // ['a', 'b', 'c']
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
{ a: 1, b: 2, c: 3 }.map((value, key, index) => value * 2) // { a: 2, b: 4, c: 6 }
```

#### mapWithKeys

```javascript
[1, 2, 3].mapWithKeys((value, index) => ({ [value]: index }))               // { 1: 0, 2: 1, 3: 2 }
{ a: 1, b: 2, c: 3 }.mapWithKeys((value, key, index) => ({ [value]: key })) // { 1: 'a', 2: 'b', 3: 'c' }
```

#### max

```javascript
[1, 2, 3, 4, 5].max()      // 5
{ a: 1, b: 2, c: 3 }.max() // 3
```

#### merge

```javascript
[1, 2, 3, 4, 5].merge([6, 7])              // [1, 2, 3, 4, 5, 6, 7]
{ a: 1, b: 2, c: 3 }.merge({ d: 4, e: 5 }) // { a: 1, b: 2, c: 3, d: 4, e: 5 }
```

#### min

```javascript
[1, 2, 3, 4, 5].min()      // 1
{ a: 1, b: 2, c: 3 }.min() // 1
```

#### only

```javascript
[1, 2, 3, 4, 5].only(0, 1, 2)         // [1, 2, 3]
{ a: 1, b: 2, c: 3 }.only('a', 'b')   // { a: 1, b: 2 }
[1, 2, 3, 4, 5].only([0, 1, 2])       // [1, 2, 3]
{ a: 1, b: 2, c: 3 }.only(['a', 'b']) // { a: 1, b: 2 }
```

#### partition

```javascript
[1, 2, 3, 4, 5].partition((value, key) => key < 2 && value < 3)             // [[1, 2], [3, 4, 5]]
{ a: 1, b: 2, c: 3 }.partition((value, key) => key === 'a' && value === 1)) // [{ a: 1 }, { b: 2, c: 3 }]
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

#### prepend

```javascript
[2, 3, 4, 5].prepend(1)        // [1, 2, 3, 4, 5]
{ b: 2, c: 3 }.prepend(1, 'a') // { a: 1, b: 2, c: 3 }
```

#### reduce

```javascript
{ a: 1, b: 2, c: 3 }.reduce((carry, value, key, index) => carry + value) // 6
```

#### reject

```javascript
[1, 2, 3, 4, 5].reject((value, index) => value > 4)           // [1, 2, 3, 4]
{ a: 1, b: 2, c: 3 }.reject((value, key, index) => value > 2) // { a: 1, b: 2 }
```

#### reverse

```javascript
{ a: 1, b: 2, c: 3 }.reverse() // { c: 3, b: 2, a: 1 }
```

#### set

```javascript
[1, 2, 0, 4, 5].set(2, 3)              // [1, 2, 3, 4, 5]
{ a: { b: { c: 0 } } }.set('a.b.c', 1) // { a: { b: { c: 1 } } }
```

#### shuffle

```javascript
[1, 2, 3, 4, 5].shuffle() // [3, 5, 1, 4, 2]
```

#### slice

```javascript
{ a: 1, b: 2, c: 3 }.slice(1)     // { b: 2, c: 3 }
{ a: 1, b: 2, c: 3 }.slice(-1)    // { c: 3 }
{ a: 1, b: 2, c: 3 }.slice(1, 2)  // { b: 2 }
{ a: 1, b: 2, c: 3 }.slice(1, -1) // { b: 2 }
```

#### sort

```javascript
{ a: 3, b: 2, c: 1 }.sort()                     // { c: 1, b: 2, a: 3 }
{ a: [3, 3], b: [3, 2] }.sort()                 // { b: [3, 2], a: [3, 3] }
{ a: { a: 3, b: 3 }, b: { a: 3, b: 2 } }.sort() // { b: { a: 3, b: 2 }, a: { a: 3, b: 3 } }
{ a: 1, b: 2, c: 3 }.sort((a, b) => b - a)      // { c: 3, b: 2, a: 1 }
```

#### sortDesc

```javascript
[1, 2, 3, 4, 5].sortDesc()                          // [5, 4, 3, 2, 1]
[[5, 4], [5, 5]].sortDesc()                         // [[5, 5], [5, 4]]
[{ a: 5, b: 4 }, { a: 5, b: 5 }].sortDesc()         // [{ a: 5, b: 5 }, { a: 5, b: 4 }]
{ a: 1, b: 2, c: 3 }.sortDesc()                     // { c: 3, b: 2, a: 1 }
{ a: [3, 2], b: [3, 3] }.sortDesc()                 // { b: [3, 3], a: [3, 3] }
{ a: { a: 3, b: 2 }, b: { a: 3, b: 3 } }.sortDesc() // { b: { a: 3, b: 3 }, a: { a: 3, b: 2 } }
```

#### sortBy

```javascript
[[5, 5], [5, 4]].sortBy(1)                              // [[5, 4], [5, 5]]
[{ a: 5, b: 5 }, { a: 5, b: 4 }].sortBy('b')            // [{ a: 5, b: 4 }, { a: 5, b: 5 }]
{ a: [3, 3], b: [3, 2] }.sortBy(1)                      // { b: [3, 2], a: [3, 3] }
{ a: { a: 3, b: 3 }, b: { a: 3, b: 2 } }.sortBy('b')    // { b: { a: 3, b: 2 }, a: { a: 3, b: 3 } }
[[5, 5], [5, 4]].sortBy(item => item[1])                // [[5, 4], [5, 5]]
[{ a: 5, b: 5 }, { a: 5, b: 4 }].sortBy(item => item.b) // [{ a: 5, b: 4 }, { a: 5, b: 5 }]
```

#### sortByDesc

```javascript
[[5, 4], [5, 5]].sortByDesc(1)                              // [[5, 5], [5, 4]]
[{ a: 5, b: 4 }, { a: 5, b: 5 }].sortByDesc('b')            // [{ a: 5, b: 5 }, { a: 5, b: 4 }]
{ a: [3, 2], b: [3, 3] }.sortByDesc(1)                      // { b: [3, 3], a: [3, 2] }
{ a: { a: 3, b: 2 }, b: { a: 3, b: 3 } }.sortByDesc('b')    // { b: { a: 3, b: 3 }, a: { a: 3, b: 2 } }
[[5, 4], [5, 5]].sortByDesc(item => item[1])                // [[5, 5], [5, 4]]
[{ a: 5, b: 4 }, { a: 5, b: 5 }].sortByDesc(item => item.b) // [{ a: 5, b: 5 }, { a: 5, b: 4 }]
```

#### sum

```javascript
[1, 2, 3, 4, 5].sum()                     // 15
{ a: 1, b: 2, c: 3 }.sum()                // 6
[{ a: 1, b: 2 }, { a: 3, b: 4 }].sum('a') // 4
```

#### swap

```javascript
[1, 2, 3, 4, 5].swap(0, 1)          // [2, 1, 3, 4, 5]
{ a: 1, b: 2, c: 3 }.swap('a', 'b') // { a: 2, b: 1, c: 3 }
```

#### take

```javascript
[1, 2, 3, 4, 5].take(2)      // [1, 2]
{ a: 1, b: 2, c: 3 }.take(2) // { a: 1, b: 2 }
```

#### toArray

```javascript
{ a: { a: 1, b: 2 }, b: { c: 3 }}.toArray() // [1, 2, 3]
```

#### unique

```javascript
[1, 1, 2, 2, 3].unique()      // [1, 2, 3]
{ a: 1, b: 2, c: 2 }.unique() // { a: 1, b: 2 }
```

#### values

```javascript
{ a: 1, b: 2, c: 3 }.values() // [1, 2, 3]
```

### String

#### camel

```javascript
'hello-world'.camel() // 'helloWorld'
```

#### kebab

```javascript
'Hello World'.kebab() // 'hello-world'
```

#### lcfirst

```javascript
'Hello World'.lcfirst() // 'hello World'
```

#### limit

```javascript
'Hello World'.limit(5)        // 'Hello...'
'Hello World'.limit(5, '***') // 'Hello***'
```

#### nl2br

```javascript
'Hello\nWorld'.nl2br() // 'Hello<br>World'
```

#### random

```javascript
String.random()   // 'hnq6dmd5f9keo20d'
String.random(10) // 'erbzjw0rks'
```

#### slugify

```javascript
'Hello World'.slugify() // 'hello-world'
```

#### snake

```javascript
'Hello World'.snake() // 'hello_world'
```

#### stripTags

```javascript
'<h1>Hello World</h1>'.stripTags() // 'Hello World'
```

#### studly

```javascript
'hello-world'.studly() // 'HelloWorld'
```

#### title

```javascript
'hello-world'.title() // 'Hello World'
```

#### ucfirst

```javascript
'hello world'.ucfirst() // 'Hello world'
```

### Number

#### abs

```javascript
(-10).abs() // 10
```

#### ceil

```javascript
1.4.ceil() // 2
```

#### downto

```javascript
(5).downto(1, n => n) // [5, 4, 3, 2, 1]
```

#### floor

```javascript
1.5.floor() // 1
```

#### format

```javascript
(1000000).format() // '1,000,000'
```

#### random

```javascript
Number.random()    // 0.6310469770350284
Number.random(5)   // 4
Number.random(5.5) // 2.9265187166993445
```

#### round

```javascript
1.44.round()  // 1
1.44.round(1) // 1.4
```

#### times

```javascript
(5).times(n => n) // [1, 2, 3, 4, 5]
```

#### upto

```javascript
(1).upto(5, n => n) // [1, 2, 3, 4, 5]
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

# babel-plugin-plugin



## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
```

## Installation

```sh
$ npm install babel-plugin-plugin
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["plugin"]
}
```

### Via CLI

```sh
$ babel --plugins plugin script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["plugin"]
});
```

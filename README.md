# find-project-root

Recommend use https://github.com/sindresorhus/find-up instead.

Recursively find the closest specified file.

## Usage

```javascript
const assert = require('assert')
const findRoot = require('find-project-root')

findRoot('./node_modules/mocha', '.git').then(path => {
  assert.equal(path, '')
})
```

## findRoot(startingPath, [filename, [cb]])

* `startingPath` `{String}` the starting path to search, default: `module.parent.filename`
* `filename` `{String}` the searching file name, default: `package.json`
* `cb` `{Function}`
    * `err` `{Error | null}`
    * `path` `{String | null}` the path been found
* return `{Promise<String | null>}`

## findRoot.sync(startingPath, [filename])

* `startingPath` `{String}` the starting path to search, default: `module.parent.filename`
* `filename` `{String}` the searching file name, default: `package.json`
* return `{String | null}` the path been found

const assert = require('assert')
const findRoot = require('../')
const path = require('path')

describe('availablePaths', () => {
  const { availablePaths } = findRoot

  it('works', () => {
    assert.deepEqual(
      availablePaths('/a/b/c/d'),
      ['/a/b/c/d', '/a/b/c', '/a/b', '/a', '/']
    )

    assert.deepEqual(
      availablePaths('./a/b/c/d'),
      ['a/b/c/d', 'a/b/c', 'a/b', 'a', '']
    )

    assert.deepEqual(
      availablePaths('a/b/c/d'),
      ['a/b/c/d', 'a/b/c', 'a/b', 'a', '']
    )
  })
})

describe('sync', () => {
  it('works', () => {
    assert.equal(
      findRoot.sync('./node_modules'),
      ''
    )

    assert.equal(
      findRoot.sync('./node_modules/mocha'),
      'node_modules/mocha'
    )

    assert.equal(
      findRoot.sync('./node_modules/mocha', '.git'),
      ''
    )
  })
})

describe('async', () => {
  it('works', () => {
    return Promise.all([
      findRoot('./node_modules'),
      findRoot('./node_modules/mocha'),
      findRoot('./node_modules/mocha', '.git'),
    ]).then(results => {
      assert.equal(results[0], '')
      assert.equal(results[1], 'node_modules/mocha')
      assert.equal(results[2], '')
    })
  })
})

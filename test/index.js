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
  })
})

describe('async', () => {
  it('works', done => {
    findRoot('./node_modules', (err, result) => {
      if (err) return done(err)
      assert.equal(result, '')
      findRoot('./node_modules/mocha', (err, result) => {
        if (err) return done(err)
        assert.equal(result, 'node_modules/mocha')
        done()
      })
    })
  })
})

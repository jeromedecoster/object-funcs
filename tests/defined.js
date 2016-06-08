const fn = require('../defined')
const test = require('tape')

test('defined', function (t) {

  t.deepEqual(fn(), undefined)
  t.deepEqual(fn(undefined), undefined)
  t.deepEqual(fn(undefined, undefined), undefined)
  t.deepEqual(fn(undefined, undefined, undefined, undefined), undefined)

  t.deepEqual(fn(undefined, false, true), false)
  t.deepEqual(fn(false, true),            false)
  t.deepEqual(fn(true, false),            true)
  t.deepEqual(fn(undefined, 0, true),     0)
  t.deepEqual(fn(0, true),                0)

  t.deepEqual(fn(3, undefined, 4),         3)
  t.deepEqual(fn(undefined, 3, 4),         3)
  t.deepEqual(fn(undefined, undefined, 3), 3)

  t.deepEqual(fn(null),  undefined)
  t.deepEqual(fn([]),    undefined)
  t.deepEqual(fn([1]),   [1])
  t.deepEqual(fn({}),    undefined)
  t.deepEqual(fn({a:1}), {a:1})
  t.deepEqual(fn(''),    undefined)
  t.deepEqual(fn('  '),  undefined)
  t.deepEqual(fn('abc'), 'abc')
  t.deepEqual(fn(NaN),   undefined)
  t.deepEqual(fn(12.3),  12.3)

  t.end()
})

const fn = require('../inject')
const test = require('tape')

test('inject default behavior', function (t) {

  var a = {foo:'0'}
  var b = {foo:'1', bar:'2', baz:'3'}

  var res = {foo:'0', bar:'2', baz:'3'}

  t.deepEqual(fn(a, b), res)
  // new instance
  t.deepEqual(a, {foo:'0'})

  t.deepEqual(fn(a, b, false), res)
  t.deepEqual(fn(a, b, 12),    res)
  t.deepEqual(fn(a, b, [1]),   res)
  t.deepEqual(fn(a, b, {a:1}), res)
  t.deepEqual(fn(a, b, null),  res)

  t.end()
})

test('inject overwrite true', function (t) {

  var a = {foo:'0', quux:'4'}
  var b = {foo:'1', bar:'2', baz:'3'}

  t.deepEqual(fn(a, b, true), {foo:'1', bar:'2', baz:'3', quux:'4'})

  t.end()
})

test('inject key defined', function (t) {

  var a = {}
  var b = {foo:'1', bar:'2', baz:'3', quux:'4'}

  t.deepEqual(fn(a, b, false, /^ba/),      {bar:'2', baz:'3'})
  t.deepEqual(fn(a, b, false, /^(ba|qu)/), {bar:'2', baz:'3', quux:'4'})
  t.deepEqual(fn(a, b, false, /[xz]$/),    {baz:'3', quux:'4'})

  t.deepEqual(fn(a, b, false, false), b)
  t.deepEqual(fn(a, b, false, 12),    b)
  t.deepEqual(fn(a, b, false, [1]),   b)
  t.deepEqual(fn(a, b, false, {a:1}), b)
  t.deepEqual(fn(a, b, false, null),  b)

  t.end()
})

test('inject value defined', function (t) {

  var a = {foo:'1'}
  var b = {bar:'2', baz:'3', quux:'4'}

  var func1 = function(value) { return parseFloat(value) }

  t.deepEqual(fn(a, b, null, null, func1), {foo:'1', bar:2, baz:3, quux:4})

  var res = {foo:'1', bar:'2', baz:'3', quux:'4'}

  t.deepEqual(fn(a, b, null, null, false), res)
  t.deepEqual(fn(a, b, null, null, 12),    res)
  t.deepEqual(fn(a, b, null, null, [1]),   res)
  t.deepEqual(fn(a, b, null, null, {a:1}), res)
  t.deepEqual(fn(a, b, null, null, null),  res)

  t.end()
})


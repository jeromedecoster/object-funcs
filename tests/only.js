const fn = require('../only')
const test = require('tape')

test('only', function (t) {

  var a = {a:1, b:2, c:3, d:4}
  var b = {b:2}
  var noop = function() {}

  t.deepEqual(fn(a, 'b e'),      {b:2})
  t.deepEqual(fn(a, 'b d'),      {b:2, d:4})
  t.deepEqual(fn(a, '  b  d  '), {b:2, d:4})
  t.deepEqual(fn(b, 'a'),        {})
  t.deepEqual(fn(b, 'b'),        {b:2})

  t.deepEqual(fn(a, ['b', 'e']),     {b:2})
  t.deepEqual(fn(a, ['b', 'd']),     {b:2, d:4})
  t.deepEqual(fn(a, [' b ', ' d ']), {})
  t.deepEqual(fn(b, ['a']),          {})
  t.deepEqual(fn(b, ['b']),          {b:2})

  t.deepEqual(fn({a:1, b:noop}, ['b']),                     {b:noop})
  t.deepEqual(fn({a:1, b:Math}, ['b']),                     {b:Math})
  t.deepEqual(fn({a:1, b:null}, ['b']),                     {b:null})
  t.deepEqual(fn({a:1, b:undefined}, ['b']),                {b:undefined})
  t.deepEqual(fn({a:1, b:true}, ['b']),                     {b:true})
  t.deepEqual(fn({a:1, b:false}, ['b']),                    {b:false})
  t.deepEqual(fn({a:1, b:'abc'}, ['b']),                    {b:'abc'})
  t.deepEqual(fn({a:1, b:''}, ['b']),                       {b:''})
  t.deepEqual(fn({a:1, b:' '}, ['b']),                      {b:' '})
  t.deepEqual(fn({a:1, b:[]}, ['b']),                       {b:[]})
  t.deepEqual(fn({a:1, b:[1]}, ['b']),                      {b:[1]})
  t.deepEqual(fn({a:1, b:new Array('1')}, ['b']),           {b:['1']})
  t.deepEqual(fn({a:1, b:Number.POSITIVE_INFINITY}, ['b']), {b:Infinity})
  t.deepEqual(fn({a:1, b:Number.NEGATIVE_INFINITY}, ['b']), {b:-Infinity})

  var res = fn({a:1, b:NaN}, ['b'])
  t.equal(isNaN(res.b), true)

  var d = new Date
  res = fn({a:1, b:d}, ['b'])
  t.equal(Object.getPrototypeOf(res.b) === Date.prototype, true)

  var r = /./
  res = fn({a:1, b:r}, ['b'])
  t.equal(Object.getPrototypeOf(res.b) === RegExp.prototype, true)

  t.deepEqual(fn(),          {})
  t.deepEqual(fn(1),         {})
  t.deepEqual(fn('a'),       {})
  t.deepEqual(fn([1]),       {})
  t.deepEqual(fn(/./),       {})
  t.deepEqual(fn(null),      {})
  t.deepEqual(fn(undefined), {})
  t.deepEqual(fn(true),      {})
  t.deepEqual(fn(false),     {})
  t.deepEqual(fn(noop),      {})
  t.deepEqual(fn(Math),      {})
  t.deepEqual(fn(new Date),  {})
  t.deepEqual(fn(arguments), {})
  t.deepEqual(fn(b),         {})
  t.deepEqual(fn(b, []),     {})
  t.deepEqual(fn(b, ''),     {})
  t.deepEqual(fn(b, ' '),    {})
  t.deepEqual(fn(b, 12),     {})
  t.deepEqual(fn(b, /./),    {})
  t.deepEqual(fn(b, NaN),    {})

  t.end()
})

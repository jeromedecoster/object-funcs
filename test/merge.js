const fn = require('../merge')
const test = require('tape')

test('merge', function (t) {

  var a = {a:'foo'}
  var b = {b:'bar'}
  var noop = function() {}

  t.deepEqual(fn(a, b),                 {a:'foo', b:'bar'})
  t.deepEqual(fn(a, {a:'yes', b:'no'}), {a:'yes', b:'no'})
  t.deepEqual(fn(a, undefined),         {a:'foo'})
  t.deepEqual(fn(a, null),              {a:'foo'})
  t.deepEqual(fn(a, {}),                {a:'foo'})
  t.deepEqual(fn(a, {b:noop}),          {a:'foo', b:noop})
  t.deepEqual(fn(a, []),                {a:'foo'})
  t.deepEqual(fn(a, [1]),               {a:'foo'})
  t.deepEqual(fn(a, Math),              {a:'foo'})
  t.deepEqual(fn(a, noop),              {a:'foo'})
  t.deepEqual(fn(a, /./),               {a:'foo'})
  t.deepEqual(fn(a, NaN),               {a:'foo'})
  t.deepEqual(fn(a, 132),               {a:'foo'})
  t.deepEqual(fn({a:0}, {b:true}),      {a:0, b:true})
  t.deepEqual(fn({a:0}, {b:false}),     {a:0, b:false})
  t.deepEqual(fn({a:0}, b),             {a:0, b:'bar'})
  t.deepEqual(fn({a:null}, b),          {a:null, b:'bar'})
  t.deepEqual(fn({a:undefined}, b),     {a:undefined, b:'bar'})
  t.deepEqual(fn({a:''}, b),            {a:'', b:'bar'})

  t.deepEqual(fn({a:1}, {b:2}),         {a:1, b:2})
  t.deepEqual(fn({a:1}, {b:'2'}),       {a:1, b:'2'})
  t.deepEqual(fn({a:1}, {b:true}),      {a:1, b:true})
  t.deepEqual(fn({a:1}, {b:false}),     {a:1, b:false})
  t.deepEqual(fn({a:1}, {b:null}),      {a:1, b:null})
  t.deepEqual(fn({a:1}, {b:undefined}), {a:1, b:undefined})
  t.deepEqual(fn({a:1}, {b:noop}),      {a:1, b:noop})
  t.deepEqual(fn({a:1}, {b:Math}),      {a:1, b:Math})
  t.deepEqual(fn({a:1}, {b:arguments}), {a:1, b:arguments})

  var res = fn({a:1}, {b:NaN})
  t.equal(isNaN(res.b), true)

  var d = new Date
  res = fn({a:1}, {b:d})
  t.equal(Object.getPrototypeOf(res.b) === Date.prototype, true)

  var r = /./
  res = fn({a:1}, {b:r})
  t.equal(Object.getPrototypeOf(res.b) === RegExp.prototype, true)

  var m = fn({}, a)
  t.deepEqual(m,       {a:'foo'})
  t.deepEqual(m !== a, true)
  m.b = 2
  t.deepEqual(a.b,     undefined)
  t.end()
})

test('merge single', function(t) {

  var a = {a:'foo'}

  var m = fn(a)
  t.deepEqual(m,       {a:'foo'})
  t.deepEqual(m !== a, true)
  m.b = 2
  t.deepEqual(a.b,     undefined)
  t.end()
})

test('merge no deep merge', function (t) {

  var a = {foo:{bar:{baz:'quut'}, no:false}, yes:true}
  var b = {foo:{bar:{c:3}, b:2}, a:1}
  var c = {a:1}

  // only first data level are kept - this is wanted a limitation (kiss)
  t.deepEqual(fn(a, b), {foo:{bar:{c:3}, b:2}, a:1, yes:true})
  t.deepEqual(fn(a, c), {foo:{bar:{baz:'quut'}, no:false}, yes:true, a:1})

  t.deepEqual(fn({foo:{bar:'baz'}}, {a:1}), {foo:{bar:'baz'}, a:1})
  t.deepEqual(fn({foo:{bar:'baz'}}, {foo:{b:2}}), {foo:{b:2}})

  t.end()
})

test('merge arguments', function(t) {

  var a = {a:'foo'}
  var b = {b:'bar'}
  var c = {c:'baz'}
  var d = {d:'quux'}

  t.deepEqual(fn(),           {})
  t.deepEqual(fn(a),          {a:'foo'})
  t.deepEqual(fn(a, b),       {a:'foo', b:'bar'})
  t.deepEqual(fn(a, b, c),    {a:'foo', b:'bar', c:'baz'})
  t.deepEqual(fn(a, b, c, d), {a:'foo', b:'bar', c:'baz', d:'quux'})

  t.deepEqual(fn(a, [], undefined, 12, b), {a:'foo', b:'bar'})

  t.end()
})

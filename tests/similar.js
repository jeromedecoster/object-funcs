const fn = require('../similar')
const test = require('tape')

test('simple', function (t) {

  var a = {foo:'bar', baz:54, quux:NaN}
  var b = {foo:false, bar:true, baz:undefined, quux:null}
  var str = new String('bar')
  var dat = new Date
  var noop = function() {}
  var c = {foo:str, bar:dat, baz:noop}

  t.deepEqual(fn(a, {foo:'bar'}),      true)
  t.deepEqual(fn(a, {baz:54}),         true)
  t.deepEqual(fn(a, {quux:NaN}),       true)
  t.deepEqual(fn(b, {foo:false}),      true)
  t.deepEqual(fn(b, {bar:true}),       true)
  t.deepEqual(fn(b, {baz:undefined}),  true)
  t.deepEqual(fn(b, {quux:null}),      true)
  t.deepEqual(fn(a, {quux:new Number(NaN)}), true)
  t.deepEqual(fn(a, {baz:'54'}),       false)
  t.deepEqual(fn(a, {foo:str}),        false)
  t.deepEqual(fn(b, {foo:true}),       false)
  t.deepEqual(fn(b, {bar:false}),      false)
  t.deepEqual(fn(b, {baz:null}),       false)
  t.deepEqual(fn(b, {quux:undefined}), false)

  t.end()
})

test('deep', function (t) {

  var a = {foo:'bar', baz:[54], quux:[{a:1}, {b:2}]}
  t.deepEqual(fn(a, {baz:[54]}),            true)
  t.deepEqual(fn(a, {quux:[]}),             true)
  t.deepEqual(fn(a, {quux:[{a:1}]}),        true)
  t.deepEqual(fn(a, {quux:[{a:1}, {b:2}]}), true)
  t.deepEqual(fn(a, {quux:[{a:1}, {b:3}]}), false)
  t.deepEqual(fn(a, {quux:[{a:2}]}),        false)
  t.deepEqual(fn(a, {quux:[{a:null}]}),     false)

  var b = {foo:{bar:{baz:'quux', c:3}, b:2}, a:1}
  t.deepEqual(fn(b, {foo:{}}),                      true)
  t.deepEqual(fn(b, {foo:{}, a:1}),                 true)
  t.deepEqual(fn(b, {foo:{bar:{}}}),                true)
  t.deepEqual(fn(b, {foo:{bar:{}, b:2}}),           true)
  t.deepEqual(fn(b, {foo:{bar:{baz:'quux'}}}),      true)
  t.deepEqual(fn(b, {foo:{bar:{baz:'quux', c:3}}}), true)
  t.deepEqual(fn(b, {foo:{bar:{baz:'quux', c:3}}, a:2}),  false)
  t.deepEqual(fn(b, {foo:{bar:{baz:'quux', c:3},  b:1}}), false)
  t.deepEqual(fn(b, {foo:{bar:{baz:'quut', c:3}}}),       false)

  t.end()
})

test('not objects', function (t) {

  var a = {foo:'bar', baz:54}

  t.deepEqual(fn(a),            false)
  t.deepEqual(fn(a, {}),        false)
  t.deepEqual(fn(a, []),        false)
  t.deepEqual(fn(a, [1]),       false)
  t.deepEqual(fn(a, 'a'),       false)
  t.deepEqual(fn(a, 1),         false)
  t.deepEqual(fn(a, null),      false)
  t.deepEqual(fn(a, undefined), false)

  t.deepEqual(fn({}, a),        false)
  t.deepEqual(fn([], a),        false)
  t.deepEqual(fn([1], a),       false)
  t.deepEqual(fn('a', a),       false)
  t.deepEqual(fn(1, a),         false)
  t.deepEqual(fn(null, a),      false)
  t.deepEqual(fn(undefined, a), false)

  // force plain object at first level
  t.deepEqual(fn([1, 2], [1]),  false)
  t.deepEqual(fn('abc', 'a'),   false)

  t.end()
})

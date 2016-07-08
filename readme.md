# object-funcs

> A very limited subset of object functions I use every day

## Install

```bash
npm i object-funcs
```

Package [on npm](https://www.npmjs.com/package/object-funcs)

## API

* [defined](#definedarg-arg-)
* [inject](#injecta-b-overwrite-key-value)
* [merge](#mergeobj-obj-)
* [only](#onlyobj-keys)
* [similar](#similarobj-search)

## defined([arg], [arg], [...])

Return the first defined `arg`

`arg` is considered not defined when

* `arg` is `null`
* `arg` is `undefined`
* `arg` is a **Number** and it's `NaN`

```js
const defined = require('object-funcs/defined')

var opts = {y:false, w:4}

// false
defined(opts.x, opts.y, 100)

// 'yes'
defined(null, undefined, NaN, 'yes')
```

---

## inject(a, b, [overwrite], [key], [value])

Merge properties of two **Plain Object** into a new one

By default, existing properties of `a` **are not** overwritten by properties of `b`

| Argument | Action |
| :------ | :------- |
| **a** | the reference object |
| **b** | the object from which the properties are taken |
| **overwrite** | optional `overwrite`, default to `false` |
| **key** | optional `key` filter. A RegExp to filter which properties of `b` must be included |
| **value** | optional `value` transform. A Function to modify the injected values from `b` |

```js
const inject = require('object-funcs/inject')

var ref = {foo:0}

// {foo:0, bar:2, baz:3}
var obj = inject(ref, {foo:1, bar:2, baz:3})

// {foo:0}
ref
```

With `overwritte` enabled

```js
const inject = require('object-funcs/inject')

// {foo:1, bar:2, baz:3}
inject({foo:0, baz:3}, {foo:1, bar:2}, true)
```

With `key` filter

```js
const inject = require('object-funcs/inject')

// {bar:1, baz:2}
inject({}, {foo:0, bar:1, baz:2, quux:3}, null, /^ba/)
```

With `value` transform

```js
const inject = require('object-funcs/inject')

function func(e) { return parseFloat(e) }

// {foo:'0', bar:1, baz:2}
inject({foo:'0'}, {bar:'1', baz:'2'}, null, null, func)
```

---

## merge([obj], [obj], [...])

Merge properties of a **Plain Object** or a serie of **Plain Objects** into a new one

```js
const merge = require('object-funcs/merge')

var ref = {a:'foo'}

// {a:'foo', b:'bar'}
var obj = merge(ref, {b:'bar'})

// {a:'foo'}
ref
```

Always overwrite properties

```js
const merge = require('object-funcs/merge')

// {a:'foo', b:'baz', c:'quux'}
merge({a:'foo'}, {b:'bar'}, {b:'baz'}, {c:'quux'})
```

No deep merge, only first level of properties are injected

```js
const merge = require('object-funcs/merge')

var ref = {foo:{bar:'baz'}}

// {foo:{bar:'baz'}, a:1}
merge(ref, {a:1})

// {foo:{b:2}}
merge(ref, {foo:{b:2}})
```

---

## only(obj, keys)

Return a new **Plain Object** with filtered properties

`keys` can be a string or an array of targeted keys

```js
const only = require('object-funcs/only')

// {a:1, b:2}
only({a:1, b:2, c:3}, 'a b')

// {b:2, c:3}
only({a:1, b:2, c:3}, ['b', 'c'])
```

---

## similar(obj, search)

Partial comparison of two objects

Check if the **keys / values** in `search` are equals in `obj`

```js
const similar = require('object-funcs/similar')

// true
similar({foo:'bar', baz:54}, {baz:54})

// false
similar({foo:'bar', baz:54}, {baz:54, a:1})

// true
similar({foo:{bar:{baz:'quux', c:3}, b:2}, a:1}, {foo:{bar:{baz:'quux'}}})
```

## Thanks

Mainly forked / inspired on
- [defined](https://github.com/substack/defined)
- [node-partial-compare](https://github.com/defunctzombie/node-partial-compare)
- [only](https://github.com/tj/node-only)
- [xtend](https://github.com/Raynos/xtend)

## License

MIT

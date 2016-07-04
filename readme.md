# object-funcs

> A very limited subset of object functions I use every day

## Install

```bash
npm i object-funcs
```

Package [on npm](https://www.npmjs.com/package/object-funcs)

## API

* [defined](#definedarg-arg-)
* [merge](#mergeobj-obj-)
* [only](#onlyobj-keys)
* [similar](#similarobj-search)

## defined([arg], [arg], [...])

Return the first defined `arg`

`arg` is defined when

* `arg` is a **Number** and it's not `NaN`
* `arg` is a **Plain Object** and has at least 1 key
* `arg` is an **Array** and is length is > 0
* `arg` is a **String** and is trimmed length is > 0

```js
const defined = require('object-funcs/defined')

var opts = {y:false, w:4}

// false
defined(opts.x, opts.y, 100)

// 'yes'
defined({}, [], ' ', null, 'yes')
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

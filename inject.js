const isObject = require('is-funcs/is-object')
const isRegexp = require('is-funcs/is-regexp')

const has = Object.prototype.hasOwnProperty

module.exports = function(a, b, overwrite, key, value) {
  if (isObject(a, false) == false || isObject(b, false) == false) return {}

  overwrite = overwrite === true
  if (isRegexp(key) == false) key = null
  if (typeof value !== 'function') value = null

  var obj = {}
  for (var k in a) {
    if (has.call(a, k)) obj[k] = a[k]
  }

  for (var k in b) {
    if (key && key.test(k) == false) continue
    if (overwrite == false && has.call(a, k)) continue
    if (has.call(b, k) == false) continue
    obj[k] = value ? value(b[k]) : b[k]
  }

  return obj
}

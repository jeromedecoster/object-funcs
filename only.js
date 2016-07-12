const isObject = require('is-funcs/is-object')
const isRegexp = require('is-funcs/is-regexp')

const has = Object.prototype.hasOwnProperty

module.exports = function(obj, keys) {
  if (!isObject(obj)) return {}

  var result = {}
  if (isRegexp(keys)) {
    for (var key in obj) {
      if (has.call(obj, key) && keys.test(key)) result[key] = obj[key]
    }
    return result
  }

  if (typeof keys === 'string') keys = keys.trim().split(/ +/)
  else if (Array.isArray(keys) === false) return result
  keys.forEach(function(key) {
    if (has.call(obj, key)) result[key] = obj[key]
  })
  return result
}

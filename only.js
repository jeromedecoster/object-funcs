const isObject = require('is-funcs/is-object')

const has = Object.prototype.hasOwnProperty

module.exports = function(obj, keys) {
  if (!isObject(obj)) return {}
  if (typeof keys === 'string') keys = keys.trim().split(/ +/)
  else if (Array.isArray(keys) === false) return {}
  var result = {}
  keys.forEach(function(key) {
    if (has.call(obj, key)) result[key] = obj[key]
  })
  return result
}

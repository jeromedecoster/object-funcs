const isObject = require('is-funcs/is-object')
const isString = require('is-funcs/is-string')
const isArray = require('is-funcs/is-array')

const has = Object.prototype.hasOwnProperty

module.exports = function(obj, keys) {
  if (!isObject(obj)) return {}
  if (isString(keys)) keys = keys.trim().split(/ +/)
  else if (!isArray(keys)) return {}
  return keys.reduce(function(prev, curr) {
    if (has.call(obj, curr)) prev[curr] = obj[curr]
    return prev
  }, {})
}

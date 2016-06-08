const isNumber = require('is-funcs/is-number')
const isObject = require('is-funcs/is-object')
const isArray = require('is-funcs/is-array')
const isnan = require('is-funcs/is-nan')

module.exports = similar

function similar(obj, search) {
  if (arguments[2] === undefined
    && (!isObject(obj) || !isObject(search))) return false

  return Object.keys(search).every(function(key) {
    var val = search[key]
    if (isObject(val, false) || isArray(val, false)) {
      return similar(obj[key], val, true)
    }
    if (isnan(search[key])) return isnan(obj[key])
    return obj[key] === search[key]
  })
}

const isObject = require('is-funcs/is-object')
const isNan = require('is-funcs/is-nan')

module.exports = similar

function similar(obj, search) {
  if (arguments[2] === undefined
    && (!isObject(obj) || !isObject(search))) return false

  return Object.keys(search).every(function(key) {
    var val = search[key]
    if (isObject(val, false) || Array.isArray(val)) {
      return similar(obj[key], val, true)
    }
    if (isNan(search[key])) return isNan(obj[key])
    return obj[key] === search[key]
  })
}

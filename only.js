const has = Object.prototype.hasOwnProperty

module.exports = function(obj, keys) {
  if (typeof keys === 'string') keys = keys.trim().split(/ +/)
  else if (Array.isArray(keys) === false) return {}
  return keys.reduce(function(prev, curr) {
    if (has.call(obj, curr)) prev[curr] = obj[curr]
    return prev
  }, {})
}

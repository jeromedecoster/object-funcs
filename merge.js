module.exports = function() {
  var arg
  var obj = {}
  for (var i = 0, n = arguments.length; i < n; i++) {
    arg = arguments[i]
    if (arg == null || Array.isArray(arg)) continue
    Object.keys(arg).forEach(function(key) {
      obj[key] = arg[key]
    })
  }
  return obj
}

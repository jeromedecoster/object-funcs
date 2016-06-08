const isDefined = require('is-funcs/is-defined')

module.exports = function() {
  for (var i = 0, n = arguments.length; i < n; i++) {
    if (isDefined(arguments[i])) return arguments[i]
  }
}

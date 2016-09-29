const { getIsWindows, getWindowsVersion } = require('./utils')
const { noop, NoopClass } = require('./noops')
const win = getIsWindows() ? getWindowsVersion() : null

/**
 * Overrides the logger on all methods and classes.
 *
 * @param {function} fn - Logger function to use
 */
function setLogger (fn) {
  exp.forEach((klass) => klass.setLogger(fn))
}

let exp

// Requiring native Windows stuff on a non-windows machine isn't a great idea,
// so we just export no-ops with console warnings.
if (process.platform !== 'win32' || !(win === '10.0' || win === '8.1' || win === '8')) {
  exp = {
    Notification: NoopClass,
    history: {
      remove: noop,
      clear: noop,
      removeGroup: noop,
      setLogger: noop
    },
    Template: NoopClass,
    setLogger: noop
  }
} else {
  exp = {
    Notification: require('./notification'),
    history: require('./history'),
    Template: require('./template'),
    setLogger
  }
}

module.exports = exp

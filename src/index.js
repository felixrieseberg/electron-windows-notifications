const { getIsWindows, getWindowsVersion } = require('./utils')
const { noop, NoopClass } = require('./noops')
const win = getWindowsVersion()

let exports = {
  Notification: require('./notification'),
  history: require('./history')
}

// Requiring native Windows stuff on a non-windows machine isn't a great idea,
// so we just export no-ops with console warnings.
if (!getIsWindows() || !(win === '10.0' || win === '8.1' || win === '8')) {
  Object.keys(exports).forEach((k) => {
    exports[k] = k === 'Notification' ? NoopClass : noop
  })
}

module.exports = exports

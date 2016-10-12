const { getIsWindows, getWindowsVersion, setLogger } = require('./utils')
const { noop, NoopClass } = require('./noops')
const win = getIsWindows() ? getWindowsVersion() : null

let _exports = {
  TileNotification: require('./tile-notification'),
  ToastNotification: require('./toast-notification'),
  TileUpdater: require('./tile-updater'),
  history: require('./history'),
  Template: require('./template'),
  setLogger
}

/**
 * Overrides the logger on all methods and classes.
 *
 * @param {function} fn - Logger function to use
 */

// Requiring native Windows stuff on a non-windows machine isn't a great idea,
// so we just export no-ops with console warnings.
if (process.platform !== 'win32' || !(win === '10.0' || win === '8.1' || win === '8')) {
  _exports = {
    ToastNotification: NoopClass,
    TileNotification: NoopClass,
    history: {
      remove: noop,
      clear: noop,
      removeGroup: noop,
      setLogger: noop
    },
    Template: NoopClass,
    setLogger: noop
  }
}

module.exports = _exports

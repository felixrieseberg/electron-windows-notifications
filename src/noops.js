const EventEmitter = require('events')

/**
 * No-op method that just warns to console that the package has been required
 * despite not running in the correct version of windows
 */
function noop () {
  console.warn(`You tried to use electron-windows-notifications, but you're not running Windows 10, 8.1, or 8. No operations will be performed.`)
}

/**
 * No-op class that just warns to console that the package has been required
 * despite not running in the correct version of windows
 */
class NoopClass extends EventEmitter {
  constructor () {
    super()
    noop()
  }

  static setLogger () { return noop() }
  static getXML () { return noop() }
}

module.exports = { noop, NoopClass }

const os = require('os')

let d = require('debug')('electron-windows-notifications:tile-notification')

const utils = {
  /**
   * Gets the version of Windows
   * @param {string} [version=os.release()] Release value to test
   *
   * @returns {number} Major & minor of Windows (8.0, 8.1, 10)
   */
  getWindowsVersion (version = os.release()) {
    let match = version.match(/^(\d+).?(\d+).?(\*|\d+)$/)

    if (match === null) {
      return version
    }

    // We got major, minor
    if (match.length > 2 && match[1] === '6' && match[2] === '1') {
      return '7.0'
    } else if (match.length > 2 && match[1] === '6' && match[2] === '2') {
      return '8.0'
    } else if (match.length > 2 && match[1] === '6' && match[2] === '3') {
      return '8.1'
    } else if (match.length > 2 && match[1] === '10' && match[2] === '0') {
      return '10.0'
    } else if (match.length > 2) {
      return `${match[1]}.${match[2]}`
    } else {
      return version
    }
  },

  /**
   * @returns {boolean} Is Windows
   */
  getIsWindows (platform = os.platform()) {
    return platform === 'win32'
  },

  /**
   * @returns {string} appUserModelId
   */
  getAppId () {
    if (process.windowsStore) {
      try {
        const appModel = require('@nodert-win10/windows.applicationmodel')

        // This is a horrible and sad hack that hopefully won't be always neccessary
        const familyName = appModel.Package.current.id.familyName
        const name = appModel.Package.current.id.name

        return `${familyName}!${name}`
      } catch (e) {
        console.log('Tried to get appUserModelId for UWP app, failed with error:', e)
        return null
      }
    }

    try {
      const electron = require('electron')
      const isRenderer = require('is-electron-renderer')

      if (isRenderer) {
        return electron.remote.getGlobal('appUserModelId')
      } else {
        return electron.getGlobal('appUserModelId')
      }
    } catch (e) {
      return null
    }
  },

  /**
   * @returns {boolean} Whether or not the app is running as Windows Store app
   */
  getIsCentennial () {
    return process.windowsStore || false
  },

  /**
   * Internal logger
   */
  log () {
    return d(...arguments)
  },

  /**
   * Override the internal logging function
   *
   * @param {function} fn
   */
  setLogger (fn) {
    d = fn
  }
}

module.exports = utils

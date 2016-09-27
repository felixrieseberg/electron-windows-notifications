const xml = require('@nodert-win10/windows.data.xml.dom')
const notifications = require('@nodert-win10/windows.ui.notifications')
const EventEmitter = require('events')
const util = require('util')

const { getAppId } = require('./utils')

let d = require('debug-electron')('electron-windows-notifications:notification')

class Notification extends EventEmitter {
  /**
   * Creates an instance of Notification.
   *
   * @param {object} options
   * @param {string} options.template
   * @param {string[]} options.strings
   * @param {Date} options.expirationTime
   * @param {string} options.group
   * @param {string} options.tag
   * @param {string} [options.appId]
   *
   * @memberOf Notification
   */
  constructor (options = {}) {
    super(...arguments)

    options.template = options.template || '' // todo: add default template
    options.strings = options.strings || []
    options.appId = options.appId || getAppId()

    let formattedXml = util.format(options.template, ...options.strings)
    let xmlDocument = new xml.XmlDocument()
    xmlDocument.loadXml(formattedXml)

    d(`Creating new notification`)
    d(formattedXml)

    this.toast = new notifications.ToastNotification(xmlDocument)
    this.toast.on('activated', () => this.emit('activated', ...arguments))
    this.toast.on('dismissed', () => this.emit('dismissed', ...arguments))
    this.toast.on('failed', () => this.emit('failed', ...arguments))

    if (options.expirationTime) this.toast.expirationTime = options.expirationTime
    if (options.group) this.toast.group = options.group
    if (options.tag) this.toast.tag = options.tag

    // Not present: surpressPopup. Why? From Microsoft:
    // Note Do not set this property to true in a toast sent to a Windows 8.x device.
    // Doing so will cause a compiler error or a dropped notification.

    this.notifier = notifications.ToastNotificationManager.createToastNotifier(options.appId)
  }

  /**
   * Shows the toast notification
   *
   * @memberOf Notification
   */
  show () {
    if (this.toast && this.notifier) this.notifier.show(this.toast)
  }

  /**
   * Hides the toast notification
   *
   * @memberOf Notification
   */
  hide () {
    if (this.toast && this.notifier) this.notifier.hide(this.toast)
  }

  /**
   * Overrides the logger for all instances of Notification
   *
   * @static
   * @param {function} Replacement for `console.log`
   *
   * @memberOf Notification
   */
  static setLogger (fn) {
    d = fn
  }
}

module.exports = Notification

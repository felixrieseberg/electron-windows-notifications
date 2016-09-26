const xml = require('windows.data.xml.dom')
const notifications = require('windows.ui.notifications')
const EventEmitter = require('events')
const util = require('util')

const { getAppId } = require('./utils')

class Notification extends EventEmitter {
  /**
   * Creates an instance of Notification.
   *
   * @param {object} options
   * @param {string} options.template
   * @param {object} options.strings
   *
   * @memberOf Notification
   */
  constructor (options = {}) {
    super(...arguments)

    options.template = options.template || '' // todo: add default template
    options.strings = options.strings || []

    let appId = getAppId()
    let formattedXml = util.format(options.template, ...options.strings)
    let xmlDocument = new xml.XmlDocument(formattedXml)

    this.toast = new notifications.ToastNotification(xmlDocument)
    this.toast.on('activated', () => this.emit('activated', ...arguments))
    this.toast.on('dismissed', () => this.emit('dismissed', ...arguments))
    this.toast.on('failed', () => this.emit('failed', ...arguments))
    this.notifier = notifications.ToastNotificationManager.createToastNotifier(appId)
  }

  show () {
    if (this.toast && this.notifier) this.notifier.show(this.toast)
  }

  hide () {
    if (this.toast && this.notifier) this.notifier.hide(this.toast)
  }
}

module.exports = Notification

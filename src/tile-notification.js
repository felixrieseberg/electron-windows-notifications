const xml = require('@nodert-win10/windows.data.xml.dom')
const notifications = require('@nodert-win10/windows.ui.notifications')
const util = require('util')
const xmlEscape = require('xml-escape')

const {
  log
} = require('./utils')

/**
 * A notification similar to the native Windows ToastNotification.
 *
 * @class TileNotification
 */
class TileNotification {
  /**
   * Creates an instance of TileNotification.
   *
   * @param {object} options
   * @param {string} options.template
   * @param {string[]} options.strings
   * @param {Date} options.expirationTime
   * @param {string} options.group
   * @param {string} options.tileId             If set, use CreateTileUpdaterForSecondaryTile.
   *                                            Otherwise, CreateTileUpdaterForApplication.
   */
  constructor (options = {}) {
    options.template = options.template || '' // todo: add default template
    options.strings = options.strings || []

    let strings = options.strings.map(v => xmlEscape(v))

    this.formattedXml = util.format(options.template, ...strings)
    let xmlDocument = new xml.XmlDocument()
    xmlDocument.loadXml(this.formattedXml)

    log(`Creating new tile notification`)
    log(this.formattedXml)

    this.tile = new notifications.TileNotification(xmlDocument)

    if (options.expirationTime) this.tile.expirationTime = options.expirationTime
    if (options.tag) this.tile.tag = options.tag

    if (!options.tileId) {
      this.updater = notifications.TileUpdateManager.createTileUpdaterForApplication()
    } else {
      this.updater = notifications.TileUpdateManager.createTileUpdaterForSecondaryTile(options.tileId)
    }
  }

  /**
   * Shows the tile notification
   *
   * @memberOf Notification
   */
  show () {
    if (this.tile && this.updater) this.updater.update(this.tile)
  }
}

module.exports = TileNotification

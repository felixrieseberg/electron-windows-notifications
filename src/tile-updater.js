const notifications = require('@nodert-win10/windows.ui.notifications')

class TileUpdater {
  /**
   * Creates an instance of TileUpdater.
   *
   * @param {string} tileId
   *
   * @memberOf TileUpdater
   */
  constructor (tileId = '') {
    if (!tileId) {
      this.updater = notifications.TileUpdateManager.createTileUpdaterForApplication()
    } else {
      this.updater = notifications.TileUpdateManager.createTileUpdaterForSecondaryTile(tileId)
    }
  }

  /**
   * Removes all updates and causes the tile to display its default
   * content as declared in the app's manifest.
   *
   * @memberOf TileUpdater
   */
  clear () {
    if (this.updater) this.updater.clear()
  }

  /**
   * Applies a change in content or appearance to the tile.
   *
   * @param {Object} tile
   *
   * @memberOf TileUpdater
   */
  update (tile) {
    if (this.updater) this.updater.update(tile)
  }

  /**
   * Enables the tile to queue up to five notifications.
   * This enables the notification queue on all tile sizes.
   *
   * @param {boolean} [value=true]
   *
   * @memberOf TileUpdater
   */
  enableNotificationQueue (value = true) {
    if (this.updater) this.updater.enableNotificationQueue(value)
  }

  /**
   * Enables the tile to queue up to five notifications on the medium tile.
   *
   * @param {boolean} [value=true]
   *
   * @memberOf TileUpdater
   */
  enableNotificationQueueForSquare150x150 (value = true) {
    if (this.updater) this.updater.enableNotificationQueueForSquare150x150(value)
  }

  /**
   * Enables the tile to queue up to five notifications on the large tile.
   *
   * @param {boolean} [value=true]
   *
   * @memberOf TileUpdater
   */
  enableNotificationQueueForSquare310x310 (value = true) {
    if (this.updater) this.updater.enableNotificationQueueForSquare310x310(value)
  }

  /**
   * Enables the tile to queue up to five notifications on the wide tile.
   *
   * @param {boolean} [value=true]
   *
   * @memberOf TileUpdater
   */
  enableNotificationQueueForWide310x150 (value = true) {
    if (this.updater) this.updater.enableNotificationQueueForWide310x150(value)
  }
}

module.exports = TileUpdater

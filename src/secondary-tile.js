const uuid = require('uuid')

let StartScreen = null
let Foundation = null

class SecondaryTile {
  /**
   * Creates an instance of SecondaryTile.
   *
   * @param {any} [options={}]
   * @param {string} options.tileId                   A string that will uniquely identify the tile within
   *                                                  your app's package. It is limited to 64 characters and
   *                                                  must begin with a number or letter and be composed of
   *                                                  the characters a-z, A-Z, 0-9, period (.), or underscore (_).
   *                                                  If you provide the same ID as that of an existing secondary
   *                                                  tile, the existing secondary tile will be overwritten.
   * @param {string} options.displayName              A name to be displayed on the tile, in the tile's
   *                                                  tooltip, and when showing small tiles, such as on the Apps
   *                                                  or search results screens.
   * @param {string} options.arguments                An app-defined string meaningful to the calling application.
   *                                                  This argument string is passed back to the app when the app is
   *                                                  activated from the secondary tile. It will be truncated after
   *                                                  2048 characters. Can be set or retrieved through the Arguments
   *                                                  property.
   * @param {string} options.desiredSize              The size of tile to pin. This value must be Default (which provides
   *                                                  Windows 8 behavior), Square150x150, or Wide310x150.
   * @param {string} options.logo                     Default logo
   * @param {Object} options.visualElements           Visual elements to set on the tile object
   *
   * @memberOf SecondaryTile
   */
  constructor (options = {}) {
    StartScreen = StartScreen || require('@nodert-win10/windows.ui.startscreen')
    Foundation = Foundation || require('@nodert-win10/windows.foundation')

    const tileId = this._validateTileId(options._validateTileId)
    const displayName = options.displayName || ''
    const tileArguments = options.arguments || ''
    const logo = new Foundation.Uri(options.logo)
    const tileSize = this._validateTileSize(options.tileSize)

    const secondaryTile = new StartScreen.SecondaryTile(
      tileId,
      displayName,
      tileArguments,
      logo,
      tileSize
    )

    // Set visual elements
    if (options.visualElements) {
      Object.keys(options.visualElements).forEach((key) => {
        secondaryTile.visualElements[key] = new Foundation.Uri(options.visualElements[key])
      })
    }

    this.secondaryTile = secondaryTile
  }

  requestCreate () {
    return new Promise((resolve, reject) => {
      if (!this.secondaryTile) return reject(new Error('SecondaryTile not created'))

      this.secondaryTile.requestCreateAsync((err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  }

  static findAll () {
    return new Promise((resolve, reject) => {
      StartScreen.SecondaryTile.findAllAsync((err, res) => {
        if (err) return reject(err)
        return resolve(res)
      })
    })
  }

  static findAllForPackage () {
    return new Promise((resolve, reject) => {
      StartScreen.SecondaryTile.findAllForPackageAsync((err, res) => {
        if (err) return reject(err)
        return resolve(res)
      })
    })
  }

  _validateTileSize (tileSize = 'default') {
    if (StartScreen.TileSize[tileSize]) {
      return StartScreen.TileSize[tileSize]
    } else {
      return StartScreen.TileSize.default
    }
  }

  _validateTileId (tileId = uuid.v4()) {
    const validLength = 64
    const regexp = /^[a-zA-Z0-9][a-zA-Z0-9-_.]+$/

    tileId = tileId.slice(0, validLength)

    if (!regexp.test(tileId)) {
      throw new Error(`tileId ${tileId} is not valid. It needs to conform to ${regexp.source}.`)
    }

    return tileId
  }
}

module.exports = SecondaryTile

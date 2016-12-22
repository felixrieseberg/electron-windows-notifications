const notifications = require('@nodert-win10/windows.ui.notifications')
const { getIsCentennial, getAppId, log } = require('./utils')

const history = {
  /**
   * Removes all notifications from action center that were sent by another app
   * inside the same app package.
   *
   * @param {string} [appId=getAppId()]
   */
  clear (appId = getAppId()) {
    log('Clearing all notifications')

    if (getIsCentennial()) {
      notifications.ToastNotificationManager.history.clear()
    } else {
      notifications.ToastNotificationManager.history.clear(appId)
    }
  },

  /**
   * Removes an individual toast notification from action center, identified by the
   * combination of tag label, group label and app ID.
   *
   * @param {object} options={}
   * @param {string} options.tag tag
   * @param {string} [options.appId] appId
   * @param {string} [options.group] group
   */
  remove (options = {}) {
    options.group = options.group || ''
    options.appId = options.appId || getAppId()

    log(`Removing notifications for ${options.group ? `group ${options.group} and` : ''} tag ${options.tag}`)

    if (getIsCentennial()) {
      notifications.ToastNotificationManager.history.remove(options.tag, options.group)
    } else {
      notifications.ToastNotificationManager.history.remove(options.tag, options.group, options.appId)
    }
  },

  /**
   * Removes a group of toast notifications, identified by the specified group label,
   * from action center.
   *
   * @param {object} options={}
   * @param {string} options.group group
   * @param {string} [options.appId] appId
   */
  removeGroup (options = {}) {
    options.group = options.group || ''
    options.appId = options.appId || getAppId()

    log(`Removing notifications for group ${options.group}`)

    try {
      if (getIsCentennial()) {
        notifications.ToastNotificationManager.history.removeGroup(options.group)
      } else {
        notifications.ToastNotificationManager.history.removeGroup(options.group, options.appId)
      }

      return true
    } catch (e) {
      return false
    }
  }
}

module.exports = history

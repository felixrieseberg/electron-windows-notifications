const notifications = require('@nodert-win10-au/windows.ui.notifications')
const { getIsCentennial } = require('./utils')

let _notifier

function getToastNotifier (appId = '') {
  if (_notifier) return _notifier

  _notifier = getIsCentennial()
    ? notifications.ToastNotificationManager.createToastNotifier()
    : notifications.ToastNotificationManager.createToastNotifier(appId)

  return _notifier
}

module.exports = getToastNotifier

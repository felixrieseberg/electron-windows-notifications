// Create shortcut, just to be sure
require('./shortcut')

// Sample
const appId = 'electron-windows-notifications'
const Notification = require('../src/notification')

let notification = new Notification({
    appId: appId,
    template: `<toast activationType="protocol" launch='%s'><visual><binding template="ToastText01"><text id="1">%s</text></binding></visual></toast>`,
    strings: ['slack://channel?id=D221YR34P&message=1475010986.000018&team=T2104UHEX', 'Hi!']
})

notification.on('activated', () => console.log('Actived!'))
notification.show()
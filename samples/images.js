// Create shortcut, just to be sure
require('./shortcut')

// Sample
const appId = 'electron-windows-notifications'
const path = require('path')
const Notification = require('../src/notification')

let imagePath = (`file:///${path.join(__dirname, 'images', 'bp.png').replace(/\\/g, '/')}`)
let notification = new Notification({
    appId: appId,
    template: `<toast><visual><binding template="ToastImageAndText01"><image id="1" src="%s"/><text id="1">%s</text></binding></visual></toast>`,
    strings: [imagePath, 'Hi!']
})

notification.on('activated', () => console.log('Actived!'))
notification.show()
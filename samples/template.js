// Create shortcut, just to be sure
require('./shortcut')

// Sample
const appId = 'electron-windows-notifications'
const Notification = require('../src/notification')
const Template = require('../src/template')

let notificationSimple = new Notification({
    appId: appId,
    template: new Template({
    	templateText: '<text id="1">%s</text>'
    }).getXML(),
    strings: ['Hi!']
})

notificationSimple.on('activated', () => console.log('Actived!'))
notificationSimple.show()

let imagePath = (`file:///${path.join(__dirname, 'images', 'bp.png').replace(/\\/g, '/')}`)
let notificationImage = new Notification({
    appId: appId,
    template: new Template({
    	templateText: '<text id="1">%s</text>',
    	templateImage: '<image id="1" src="%s"/>',
    	templateActions: '<actions><action content="check" arguments="check" /></actions>'
    }).getXML(),
    strings: [imagePath, 'Hi!']
})

notificationImage.on('activated', () => console.log('Actived!'))
notificationImage.show()
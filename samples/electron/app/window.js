const path = require('path')
const {remote} = require('electron')
const ElectronWindowsNotifications = require('electron-windows-notifications');

const {ToastNotification, TileNotification, Template, SecondaryTile} = ElectronWindowsNotifications

const iconPath = path.join(__dirname, '../../images/bp.png')
const appId = 'electron-windows-notifications-sample'
const textNode = $("#text")

function sendNotification(evt) {
  let template
  let strings

  // set notification content accordingly
  if (evt.srcElement.id === 'basic') {
    template = new Template({
      templateText: '<text>%s</text>'
    })
	  strings = ['Hi from Electron']
  } else if (evt.srcElement.id === 'image') {
    template = new Template ({
      templateText: '<text>%s</text>',
      templateImage: '<image id="1" src="%s"/><text>This is a simple image toast notification example</text>'
    })
	  strings = ['Hi from Electron', iconPath]
  } else if (evt.srcElement.id === 'actions') {
    template = new Template({
      templateText: '<text>%s</text>',
      templateImage: '<image id="1" src="%s"/><text>This is a simple actions toast notification example</text>',
      templateActions: '<actions><action content="Confirm" arguments="confirm" /><action content="Cancel" arguments="cancel" /></actions>'
    })
	  strings = ['Hi from Electron', iconPath]
  }

  // create the notification object
  let notification = new ToastNotification({
		appId: process.windowsStore ? undefined : appId,
		template: template.getXML(),
		strings: strings
  })
  
  // register to notification events
  notification.on('failed', () => textNode.text('Notification failed!'))
  notification.on('dismissed', () => textNode.text('Notification dismissed!'))

  // information about the chosen action is provided inside the "arguments" object
  notification.on('activated', (t, e) => textNode.text(`You've clicked ${e.arguments}!`))

  // show notification
  notification.show()
}

function sendTile() {
  let template = `
    <tile>
      <visual>
        <binding template="TileSmall">
          <text>Small</text>
        </binding>
        <binding template="TileMedium">
          <text>Medium</text>
        </binding>
        <binding template="TileWide">
          <text>Wide</text>
        </binding>
        <binding template="TileLarge">
          <text>Large</text>
        </binding>
      </visual>
    </tile>`.replace(/\>\s+\</g, '><')

  let tile = new TileNotification({template})
  tile.show();
}

function createTile() {
  const secondaryTile = new SecondaryTile({
    tileId: 'hello',
    displayName: 'hello',
    arguments: 'hello',
    logo: 'ms-appx:///assets/SampleAppx.150x150.png'
  })

  // Will always return false - we're missing XAMl to actually
  // display the flyout :(
  secondaryTile.requestCreate()
}

ElectronWindowsNotifications.setLogger(console.log)
remote.getCurrentWebContents().toggleDevTools()

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('basic').addEventListener('click', sendNotification);
  document.getElementById('image').addEventListener('click', sendNotification);
  document.getElementById('actions').addEventListener('click', sendNotification);
  document.getElementById('tile-notification').addEventListener('click', sendTile);
  document.getElementById('tile-pin').addEventListener('click', createTile);
})

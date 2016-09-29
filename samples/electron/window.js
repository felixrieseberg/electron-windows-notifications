var path = require('path');
const Notification = require('electron-windows-notifications').Notification;
const Template = require('electron-windows-notifications').Template;

var nts = require('@nodert-win10/windows.ui.notifications');

var options = [
  {
    title: "Basic Notification",
    body: "Short message part"
  },
  {
    title: "Content-Image Notification",
    body: "Short message plus a custom content image",
    icon: path.join(__dirname, 'icon.png')
  }
]

const iconPath = path.join(__dirname, 'icon.png');
const appId = 'electron-windows-notifications-sample'

var basicTemplate = `<toast><visual><binding template="ToastText01"><text id="1">%s</text></binding></visual></toast>`
var strings = ['Hi!']

function doNotify(evt) {
  if (evt.srcElement.id == "basic") {
	let notification = new Notification({
		appId: appId,
		template: new Template({
      templateText: '<text>%s</text>',
      templateImage: '<image id="1" src="%s"/><text>This is a simple toast notification example</text>',
      templateActions: '<actions><action content="Confirm" arguments="confirm" /><action content="Cancel" arguments="cancel" /></actions>'
    }).getXML(),
		strings: ['Hi from Electron', iconPath]
		})

	notification.on('activated', function(t,e) {
		console.log(e.arguments);
    if(e.arguments === 'confirm'){
      $("#text").text("You've clicked Confirm!")
    }
    if(e.arguments === 'cancel'){
      $("#text").text("You've clicked Cancel!")
    }
	})
	notification.show()
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("basic").addEventListener("click", doNotify);
})

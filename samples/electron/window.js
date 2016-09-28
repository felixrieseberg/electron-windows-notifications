var path = require('path');
const Notification = require('electron-windows-notifications').Notification;

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

template = '<toast launch="app-defined-string">' +
  '<visual>' + 
    '<binding template="ToastGeneric">' +
      '<text>Sample</text>' +
      '<text>This is a simple toast notification example</text>' +
      '<image placement="AppLogoOverride" src="' + iconPath  + '" />' +
    '</binding>' +
  '</visual>' +
  '<actions>' +
    '<action content="check" arguments="check"/>' +
    '<action content="cancel" arguments="cancel" />' +
  '</actions>' +
  '<audio src="ms-winsoundevent:Notification.Reminder"/>' +
'</toast>';

var basicTemplate = `<toast><visual><binding template="ToastText01"><text id="1">%s</text></binding></visual></toast>`
var strings = ['Hi!']

function doNotify(evt) {
  if (evt.srcElement.id == "basic") {
    //new Notification(options[0].title, options[0]);
	let notification = new Notification({
		appId: appId,
		template: template,
		strings: []
		})

	notification.on('activated', function(t,e) {
		console.log(e.arguments);
	})
	notification.show()
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("basic").addEventListener("click", doNotify);
})

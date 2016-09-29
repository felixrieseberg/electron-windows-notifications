var path = require('path')
const Notification = require('electron-windows-notifications').Notification
const Template = require('electron-windows-notifications').Template

const iconPath = path.join(__dirname, '../images/bp.png')
const appId = 'electron-windows-notifications-sample'

function doNotify(evt) {
  let template
  let strings
  
  // set notification content accordingly
  if (evt.srcElement.id == "basic") {
	template = new Template({ 
	  templateText: '<text>%s</text>'
	})
	strings = ['Hi from Electron']
  }
  else if (evt.srcElement.id == "image") {
	template = new Template ({ 
	  templateText: '<text>%s</text>',
      templateImage: '<image id="1" src="%s"/><text>This is a simple image toast notification example</text>'
	})
	strings = ['Hi from Electron', iconPath]
  }
  else if (evt.srcElement.id == "actions") {
	template = new Template({ 
	  templateText: '<text>%s</text>',
      templateImage: '<image id="1" src="%s"/><text>This is a simple actions toast notification example</text>',
	  templateActions: '<actions><action content="Confirm" arguments="confirm" /><action content="Cancel" arguments="cancel" /></actions>'
	})
	strings = ['Hi from Electron', iconPath]
  }
  
  // create the notification object
  let notification = new Notification({
		appId: appId,
		template: template.getXML(),
		strings: strings
  })
  
  // register to notification events
  notification.on('failed', () => $("#text").text("Notification failed!"))
  notification.on('dismissed', () => $("#text").text("Notification dismissed!"))
  
  // information about the chosen action is provided inside the "arguments" object
  notification.on('activated', function(t,e) {
    if(e.arguments === 'confirm'){
      $("#text").text("You've clicked Confirm!")
    }
    if(e.arguments === 'cancel'){
      $("#text").text("You've clicked Cancel!")
    }
  })
  
  // show notification
  notification.show()
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("basic").addEventListener("click", doNotify);
  document.getElementById("image").addEventListener("click", doNotify);
  document.getElementById("actions").addEventListener("click", doNotify);
})

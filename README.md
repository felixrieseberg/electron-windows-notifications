# electron-windows-notifications
Create native Windows toast notifications for Windows 8, 8.1, and 10 using native bindings to WinRT (using NodeRT).

```
npm install --save electron-windows-notifications
```

#### Usage

The constructor for the `Notification` class accepts an options `object` with the following properties:

 * `string` template - The XML template for the notification.
 * `string[]` strings - An array of strings to be used in your template. XML escaping is applied to all strings.
 * `Date` expirationTime - Time after which a toast notification should not be displayed.
 * `string` group - Group identifier for the notification.
 * `string` tag - Unique identifier of this notification within the notification group.
 * `string` appId - `appUserModelId` of the application for which the notification is sent. If not passed, it will be assumed to be a global property in Electron's main thread.

```JS
const appId = 'electron-windows-notifications'
const {Notification} = require('electron-windows-notifications')

let notification = new Notification({
    appId: appId,
    template: `<toast><visual><binding template="ToastText01"><text id="1">%s</text></binding></visual></toast>`,
    strings: ['Hi!']
})

notification.on('activated', () => console.log('Activated!'))
notification.show()
```

For more samples, check out the `samples` folder.

### Hints

##### appUserModelId
The appUserModelId identifies application in Windows. In Electron, you can set it at runtime using the `app.setAppUserModelId()` method. If you don't pass it, this module will assume that it's a property on Electron's main thread. Usually, you probably want to pass it.

##### Mysterious Failures & XML Escaping
Microsoft follows the XML spec to the letter - and XML has escaping rules you might not be familiar with. If you're adding strings and properties to your template, consider just using the `strings` property in the constructor - it will automatically properly escape all input.

##### String replacement
Inside the module, `util.format` is used. It'll format the template in a `printf`-like format. The template is expected to hold zero or more placeholders. Each placeholder is replaced with the converted value from its corresponding argument. If the placeholder does not have a corresponding argument, the placeholder is not replaced. Supported placeholders are:

* %s - String.
* %d - Number (both integer and float).
* %j - JSON.
* %% - single percent sign ('%'). This does not consume an argument.

### License
MIT. Please see LICENSE for details.
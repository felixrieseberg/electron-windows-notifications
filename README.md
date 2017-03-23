# electron-windows-notifications
Create native Windows toast and tile notifications for Windows 8, 8.1, and 10 using native bindings to WinRT (using NodeRT).

```
npm install --save electron-windows-notifications
```

### Usage
For more samples, check out the `samples` folder.

> :memo: Want to respond to interactive notifications (with input fields, for instance)? You can send them with this module - and respond to them with [electron-windows-interactive-notifications](https://github.com/felixrieseberg/electron-windows-interactive-notifications)!

> :memo: Want to check if _you should send a notification?_, accounting for the user notification state and quiet hours? Check out [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

#### ToastNotification
The constructor for the `ToastNotification` class accepts an options `object` with the following properties:

 * `string` template - The XML template for the notification. You can also call `new Template()` with few properties to customize your own XML template based on the default. See example: [template.js](samples/template.js)
 * `string[]` strings - An array of strings to be used in your template. XML escaping is applied to all strings.
 * `Date` expirationTime - Time after which a toast notification should not be displayed.
 * `string` group - Group identifier for the notification.
 * `string` tag - Unique identifier of this notification within the notification group.
 * `string` appId - `appUserModelId` of the application for which the notification is sent. If not passed, it will be assumed to be a global property in Electron's main thread.

```JS
const appId = 'electron-windows-notifications'
const {ToastNotification} = require('electron-windows-notifications')

let notification = new ToastNotification({
    appId: appId,
    template: `<toast><visual><binding template="ToastText01"><text id="1">%s</text></binding></visual></toast>`,
    strings: ['Hi!']
})

notification.on('activated', () => console.log('Activated!'))
notification.show()
```

#### TileNotification
Tile notifications update the app's primary or secondary tiles. They require that the app is running inside the UWP model, which is possible on Windows 10 Anniversary Update and later. For more information, check out [`electron-windows-store`](https://github.com/felixrieseberg/electron-windows-store). The constructor for the `TileNotification` class accepts an options `object` with the following properties:

 * `string` template - The XML template for the notification. You can also call `new Template()` with few properties to customize your own XML template based on the default. See example: [template.js](samples/template.js)
 * `string[]` strings - An array of strings to be used in your template. XML escaping is applied to all strings.
 * `string` tag - Unique identifier of this notification within the notification group.
 * `string` tileId - If set, the given tile will be updated. Otherwise, the app's primary tile will be used.

```JS
const appId = 'electron-windows-notifications'
const {ToastNotification} = require('electron-windows-notifications')

let notification = new ToastNotification({
    appId: appId,
    template: `<toast><visual><binding template="ToastText01"><text id="1">%s</text></binding></visual></toast>`,
    strings: ['Hi!']
})

notification.on('activated', () => console.log('Activated!'))
notification.show()
```

### Hints

##### appUserModelId
The appUserModelId identifies application in Windows. In Electron, you can set it at runtime using the `app.setAppUserModelId()` method. If you don't pass it, this module will assume that it's a property on Electron's main thread. Unless running inside a UWP container, you probably want to pass it.

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

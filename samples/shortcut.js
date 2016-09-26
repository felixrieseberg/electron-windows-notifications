const shortcut = require('node-win-shortcut')
const appId = 'electron-windows-notifications'

shortcut.createShortcut(process.execPath, 'node', appId)

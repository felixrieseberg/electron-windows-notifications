const { getIsWindows, getWindowsVersion } = require('./utils')
const win = getWindowsVersion()

if (getIsWindows() && (win === '10.0' || win === '8.1' || win === '8')) {
}

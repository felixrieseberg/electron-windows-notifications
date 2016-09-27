const util = require('util')

class Template {
   /**
   * Creates an instance of notification Template.
   *
   * @param {object} options
   * @param {string} options.templateText
   * @param {string} options.templateImage
   * @param {string} options.templateActions
   *
   * @memberOf Template
   */
  constructor (options = {}) {
    let rootTemplate = '<toast launch="app-defined-string">' +
                          '<visual>' +
                            '<binding template="ToastGeneric">' +
                              '%s' +
                              '%s' +
                            '</binding>' +
                          '</visual>' +
                          '%s' +
                          '<audio src="ms-winsoundevent:Notification.Reminder"/>' +
                        '</toast>'

    options.templateText = options.templateText || '<text id="1">%s</text>'
    options.templateImage = options.templateImage || '' // eg: <image placement="AppLogoOverride" src="oneAlarm.png" />
    options.templateActions = options.templateActions || '' // eg: <actions><action content="check" arguments="check" imageUri="check.png" /></actions>

    this.template = util.format(rootTemplate, options.templateText, options.templateImage, options.templateActions)
  }

   /**
   * Returns the template in raw string
   *
   * @memberOf Template
   */
  getXML () {
    if (this.template) return this.template
  }
}

module.exports = Template

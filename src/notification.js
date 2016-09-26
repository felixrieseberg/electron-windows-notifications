const xml = require('windows.data.xml.dom');
const notifications = require('windows.ui.notifications');
const EventEmitter = require('events');

class Notification extends EventEmitter {
  /**
   * Creates an instance of Notification.
   * 
   * @param {object} options
   * @param {string} options.title
   * @param {string} options.message
   * 
   * @memberOf Notification
   */
  constructor(options = {}) {
    this.xmlDocument = new xml.XmlDocument()

    
  }

  show() {

  }

  hide() {

  }
}
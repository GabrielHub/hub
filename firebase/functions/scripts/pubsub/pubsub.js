// * PubSub class for GS Test
class MessageQueue {
  constructor() {
    // * Init subscribers before we call any methods
    this.subscribers = {};
  }

  // * Methods

  // * Private utility function for subscribe()
  #addReceiver(type, callback) {
    // * Create receivers for type if type did not exist before
    if (!this.subscribers[type]) {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(callback);
  }

  /**
   * @description Receiver is called when an event of this type is received
   * @param {*} messageTypes A string or array of string of message types
   * @param {function} callback function
   */
  subscribe(messageTypes, callback) {
    // * Loop over if array
    if (Array.isArray(messageTypes)) {
      messageTypes.forEach((type) => {
        this.#addReceiver(type, callback);
      });
    } else {
      this.#addReceiver(messageTypes, callback);
    }
    return 200;
  }

  /**
   * @description sends a notification to all registered listeners for the given type
   * @param {string} type message type
   * @param {*} data data to pass to parameter of callback
   */
  publish(type, data = null) {
    const receivers = this.subscribers?.[type] || [];
    return receivers.map((receiver) => {
      // * Call the callback function with the data if it exists
      // * Explicitly check for null and undefined so 0 and '' will work
      if (data !== null || data !== undefined) {
        // * try catch to allow other instances to run without stopping for an error
        try {
          return receiver(data);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      }
      return null;
    });
  }
}

module.exports = MessageQueue;

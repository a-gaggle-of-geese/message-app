'use strict';

class MessageQueue {

  constructor() {
    this.data = {};
  }

  store(key, value){
    this.data[key] = value;
    return key;
  }

  read(key){
    return this.data[key]
  }

  remove(key){
    let deleted = this.data[key];
    delete this.data[key];
    return deleted
  }
}

module.exports = MessageQueue;
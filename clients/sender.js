'use strict';

const io = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001/message'
const Chance = require('chance');
const chance = new Chance();
const rg = require('random-greetings')

const socket = io(SERVER_URL);

let message = {
  class: 'liberal arts',
  name: chance.name(),
  recipientId: chance.name(),
  message: rg.greet(),
  role: 'student',
  timeStamp: Date.now(),
}
// senderId
// class
// name
//role
//message
// timestamp

socket.emit('join-room', message);
socket.emit('send', message)
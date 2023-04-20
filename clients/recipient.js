'use strict';

const io = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001/message'
const socket = io(SERVER_URL);
const Chance = require('chance');
const chance = new Chance();

socket.on('join-room', console.log)
socket.emit('getAllMessages', {class: 'liberal arts'})

socket.on('getAllMessages', (payload)=>{
  socket.emit('join-room', payload)
  console.log(payload);
  // let text = `Sorry, today is my ${chance.animal()}\'s birthday. All the best, ${payload.recipientId}`

  socket.emit('writing', payload);
  socket.emit('received', payload)
})
'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;
const io = new Server(PORT);
const MessageQueue = require('./lib/messageQueue')
const Chance = require('chance');
const chance = new Chance();

let messageServer = io.of('/message');

let studentMessage = new MessageQueue();

messageServer.on('connection', (socket)=>{
  console.log('CONNECTED TO THE MESSENGING APP', socket.id)

  socket.on('join-room', (payload)=>{
    console.log(`${payload.name} joined the room`)
    socket.join(payload['class']);
    messageServer.to(payload['class']).emit('join-room', `${payload.name} joined the room`)
  })


  socket.on('send', (payload)=>{
    console.log('SENDING ', payload)
    //log in queue
    let classMessage = studentMessage.read(payload['class']);
    if(classMessage) {
      classMessage.store(payload['recipientId'], payload);
    } else {
      let newMessageQueue = new MessageQueue();
      newMessageQueue.store(payload['recipientId'], payload);
      studentMessage.store(payload['class'], newMessageQueue);
    }
    console.log('SAVING TO QUEUE ', studentMessage)
  })

  socket.on('getAllMessages', (payload)=>{
    // console.log(payload)
    // console.log(studentMessage)
    let messages = studentMessage.read(payload['class']);
    console.log(`UNREAD MESSAGES FOUND for ${Object.keys(messages.data)}`)
    Object.values(messages.data).forEach(message =>{
      socket.emit('getAllMessages', message)
    })
  })

  socket.on('writing', (payload)=>{
    setTimeout(() => {
      console.log(`${payload['recipientId']} is typing...`);
    }, "3000");
  })

  socket.on('received', (payload)=>{
    setTimeout(()=>{
    let message = studentMessage.read(payload['class']);
    // console.log(message);
    let toBeDeleted = message.remove(payload['recipientId']);
    console.log('MESSAGE: ', toBeDeleted.message);
    let text = `Sorry, today is my ${chance.animal()}\'s birthday. All the best, ${payload.recipientId}.`
    console.log(`${text} \n YOUR MESSAGE IS DELETED`)
    }, '5000')


  })


  


})
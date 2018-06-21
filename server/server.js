const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('Server says: new user connected');

  socket.on('disconnect', () => {
    console.log('Server says: client disconnected');
  });

  socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined'));

  socket.on('createMessage', (message) => { // emits to a single connection
    console.log('create message', message);

    // emits a message to all connections on the site
    io.emit('newMessage', generateMessage(message.from, message.text));

    // socket.broadcast.emit('newMessage', { // emits a message to all OTHER connections on the site
    //   from: message.from,
    //   text: message.text,
    //   createAt: new Date().getTime()
    // });
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});


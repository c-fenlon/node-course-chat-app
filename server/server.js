const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

  socket.on('createMessage', (newMessage) => {
    console.log('create message', newMessage);
  });

  socket.emit('newMessage', {
    from: 'Caroline', 
    text: 'hello',
    createdAt: 123
  })

});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});


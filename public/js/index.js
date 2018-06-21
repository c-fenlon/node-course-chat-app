var socket = io();
socket.on('connect', function () {
  console.log('Client: Connected to server');

  socket.emit('createMessage', {
    from: 'Andrew',
    text: 'that works'
  })
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('New email', message);
});

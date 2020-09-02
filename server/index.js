const express = require('express'),
  app = express(),
  PORT = 3769,
  socketio = require('socket.io'),
  http = require('http'),
  router = require('./router'),
  { addUser, removeUser, getUser, getUserInRoom } = require('./user');

const server = http.createServer(app);
const io = socketio(server);

//io.on connects a user to a socket instance
io.on('connection', (socket) => {
  console.log('we have a new connection')

  //targets the same event 'join'. It takes a callback function with the parameters sent as an object 
  //from the frontend and that data can be given functionality.
  socket.on('join', ({ name, room }, callback) => {
    //addUser() can only return 1 of 2 things... user or error as an object
    const { error, user } = addUser({ id: socket.id, name, room });

    console.log(user)

    if (error) {
      // this callback is used for triggering response immeditaly after this socket.on event is emitted.
      // this error is dynamically being filled from the error in the addUser function.
      return callback(error)
    }

    //This tells the new user in the room a message of choice like welcome to the chat
    socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room ${user.room}` })

    //socket.broadcast sends a message to everyone except the specific user who just joined.
    socket.broadcast.to(room).emit('message', { user: 'admin', text: `${user.name} has joined.` })

    //if there is no errors we are simply joining the user into the room.
    socket.join(user.room);

    callback();
  });

  //takes in an event and a callback that runs after event is emitted.
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    //message is coming from the frontend when the socket with the same event is emitted.
    io.to(user.room).emit('message', { user: user.name, text: message })

    callback();
  });

  //this socket.on is disconnecting a user from the socket
  socket.on('disconnect', () => {
    console.log('user has left')
  });
});

app.use(router);

server.listen(PORT, () => console.log(`SHIT YEAH inter-dimensional galaxy ${PORT}`));
















// //This runs a server. Takes in a port number to activate server.
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

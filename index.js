const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

// https://socket.io/docs/#Using-with-Express
const app = express();
const server = http.Server(app);
const io = socketIo(server);  // '/socket.io/socket.io.js' でクライアント用の JavaScript ファイルが取得できるようになる

app.get('/', (req, res) => {
  console.log('[/]');
  res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT, () => {
  console.log(`Server Started : [${process.env.PORT}]`);
});

io.on('connection', (socket) => {
  console.log('A User Connected');
  
  socket.on('message', (message) => {
    console.log('On Message', message); 
    socket.broadcast.emit('message', message);
  });
  
  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });
});

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const PORT = 3001;

io.listen(PORT);
io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('disconnect', (reason) => {
    console.log('Usuário desconectado ' + reason);
  });

  socket.on('message', (text: string) => {
    io.emit('receive_message', {
      text,
      authorId: socket.id,
      author: socket.data.username,
    });
  });

  socket.on('set_username', (username: string) => {
    socket.data.username = username;
    console.log(socket.data.username);
  });
});

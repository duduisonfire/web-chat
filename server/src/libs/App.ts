import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

export default class App {
  private app = express();
  private http = http.createServer(this.app);
  private io = new Server(this.http, { cors: { origin: 'http//localhost:5172' } });

  constructor() {
    this.ListenServer();
    this.ListenSocket();
  }

  ListenServer() {
    this.http.listen(5237, () => console.log('server is run!'));
  }

  ListenSocket() {
    this.io.on('connection', (socket) => console.log('User connected =>' + socket.id));
  }
}

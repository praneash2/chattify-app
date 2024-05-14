import express from "express";
import { createServer } from 'node:http';
import cors from "cors";
import { Server } from 'socket.io';

const app=express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",  // replace with your origin
      methods: ["GET", "POST"],
      credentials: true
    }
  });

app.get('/', (req, res) => {
    res.json("hello there");
  });
  
io.on('connection', (socket) => {
console.log('a user connected');
});
  
server.listen(5000, () => {
console.log('server running at http://localhost:5000');
});
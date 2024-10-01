import express from "express";
import { createServer } from 'node:http';
import cors from "cors";

import { messagesRouter } from "./routes/messages.js";
import { Socket } from "./socket/Socket.js";
import { SocketWs } from "./socket/SocketWs.js";
import { createClient } from 'redis';
import {WebSocket} from 'ws';
const app=express();

app.use(cors());
app.use(express.json())
const server = createServer(app);

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

client.connect().then(()=>{
console.log("Redis client connected successfully")
}).catch((e)=>{
  console.log(e);
});

app.use("/",messagesRouter);  

let onlineUsers:Map<string, Array<any>> = new Map<string, Array<any>>(); // userId:socketId
export let socketInstance:any=new Socket(onlineUsers,server,client);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Listen for messages from clients
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Echo the received message back to the client
    ws.send(`Server received: ${message}`);
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(5000, async() => {
  console.log('server running at http://localhost:5000');
  socketInstance.initSocket();
});


import express from "express";
import { createServer } from 'node:http';
import cors from "cors";

import { messagesRouter } from "./routes/messages.js";
import { Socket } from "./socket/Socket.js";
import { SocketWs } from "./socket/SocketWs.js";
import { createClient } from 'redis';

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

const wsInstance= new SocketWs(server);



server.listen(5000, async() => {
  console.log('server running at http://localhost:5000');
  wsInstance.init();
  wsInstance.initSubscriber();
  socketInstance.initSocket();

});


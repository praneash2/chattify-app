import express from "express";
import { createServer } from 'node:http';
import cors from "cors";
import { Server } from 'socket.io';
import { messagesRouter } from "./routes/messages.js";
import { Socket } from "./socket/Socket.js";

const app=express();

app.use(cors());
app.use(express.json())
const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"], 
    }
  });

app.use("/",messagesRouter);  
export let socketInstance:any;
let onlineUsers:Map<string, Array<any>> = new Map<string, Array<any>>(); // userId:socketId
io.on('connection', (socket) => {
  
    socketInstance=new Socket(onlineUsers);
    const userId=(socket.handshake.query?.userId);
    socket.on("send-message",(message,room)=>{
        console.log(message);
        socket.to(room).emit("send-message",message,room);
    });
    socket.on("join-group",(room)=>{
        console.log("room",room);
        socket.join("a");
    });
    console.log(socket.id);
    socket.on("disconnect", () => {
      socketInstance.removeOnlineUsers(userId);
      console.log(socket.id,"disconnected");
      // console.log(onlineUsers);
    });
    socketInstance.setOnlineUsers(userId,socket);
    console.log()
});
  
server.listen(5000, async() => {
  console.log('server running at http://localhost:5000');
//   console.log(await pool.query('CREATE TABLE Users (ID int NOT NULL PRIMARY KEY,UserId varchar(30),Password varchar(100))'))
});


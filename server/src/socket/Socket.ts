import { RedisClientType } from "@redis/client";
import { Server } from 'socket.io';
import { createClient } from 'redis';
const subscriber =createClient()
const publisher = createClient()
export class Socket{
    private onlineUsers:Map<string, Array<any>>;
    private io:Server;
    private client:RedisClientType;
    constructor(onlineUsers:Map<string, Array<any>>,server:any,client:any){
        this.onlineUsers=onlineUsers;
        this.io = new Server(server, {
            cors: {
              origin: ["http://localhost:3000"], 
            }
          });
          this.client=client;
          
    }
    async initSocket(){
        await subscriber.connect();
        await publisher.connect();
        subscriber.subscribe("MESSAGES", (message) => {
             
            let data=JSON.parse(message);
            console.log(data,"subs");
            this.io.to(data.toUserSocketId).emit("send-message",data.message);
          });
        this.io.on('connection', (socket) => {
  
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
                if(typeof userId==="string"){
                    this.removeOnlineUsers(userId,socket.id,this.client);
                    console.log(socket.id,"disconnected");
                }
            });
            socket.on("page-reload",()=>{
                if(typeof userId==="string"){
                    this.removeOnlineUsers(userId,socket.id,this.client);
                    console.log(socket.id,"disconnected");
                }
            })
            if(typeof userId==="string"){
                this.setOnlineUsers(userId,socket.id,this.client);
            }
            console.log()
        });
    }
    async sendMessage(toUserSocketId:string,message:string){
        let data={message,toUserSocketId};
        await publisher.publish("MESSAGES",JSON.stringify(data));
        
    }

    async setOnlineUsers(userId:string,socketId:string,client:RedisClientType){
        try{
            let onlineUsers:string[]=await client.hKeys('onlineUsers');
            if(onlineUsers.includes(userId)){
                let previousInstanceValueFromCache=await client.hGet('onlineUsers',userId);
                if(previousInstanceValueFromCache){
                    let previousInstance:string[]=JSON.parse(previousInstanceValueFromCache);
                    if(previousInstance){
                        previousInstance.push(socketId);
                        console.log(previousInstance,userId)
                        await client.hSet('onlineUsers',userId,JSON.stringify(previousInstance));
                    } 
                    } 
            }
            else{
                this.onlineUsers.set(userId,[socketId]);
                await client.hSet('onlineUsers',userId,JSON.stringify([socketId]));
            }
        }catch(e:any){
            console.log(e.message);
        }
        
    }
    async getOnlineUsers(){
        return await this.client.hKeys('onlineUsers'); 
    }
    async getUserSocketIds(userId:string){
        let previousInstanceValueFromCache=await this.client.hGet('onlineUsers',userId);
                if(previousInstanceValueFromCache){
                    let previousInstance:string[]=JSON.parse(previousInstanceValueFromCache);
                    return previousInstance;
                }
            
    }
    async removeOnlineUsers(userId:string,socketId:string,client:RedisClientType){
        try{
            let onlineUsers:string[]=await client.hKeys('onlineUsers');
            if(onlineUsers.includes(userId)){
                let previousInstanceValueFromCache=await client.hGet('onlineUsers',userId);
                if(previousInstanceValueFromCache){
                    let previousInstance:string[]=JSON.parse(previousInstanceValueFromCache);
                    if(previousInstance.length>1){
                        let updatedInstance=previousInstance.filter((closedSocketId)=>closedSocketId!==socketId);
                        await client.hSet('onlineUsers',userId,JSON.stringify(updatedInstance));
                    }
                    else{
                        await client.hDel('onlineUsers',userId);
                    }
                }
            }
            this.onlineUsers.delete(userId);
            
        }catch(e:any){
            console.log(e.message);
        }
       
    }
}
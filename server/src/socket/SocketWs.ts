import { Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { wsMessageSchema, wsStatusSchema } from "../validators/message";
import { createClient, RedisClientType } from "redis";
import cookie from "cookie";
interface onlineUser {
    [key: string]: CustomWebSocket[];
}

interface CustomWebSocket extends WebSocket{
    id?:string;
}

enum MessageType {
    MESSAGE = "message",
    STATUS = "status",
    DISCONNECT ="disconnect"
}

export class SocketWs {

    private onlineUsers: onlineUser;
    private wss: WebSocketServer;
    private inMemory: RedisClientType;
    private subscriber: RedisClientType;
    private publisher: RedisClientType;

    constructor(protected server: Server) {
        this.onlineUsers = {};
        this.wss = new WebSocketServer({ server });
        this.inMemory = createClient();
        this.subscriber = this.inMemory.duplicate();
        this.publisher = this.inMemory.duplicate();
    }

    async init() {

        await this.subscriber.connect();
        await this.publisher.connect();

        this.wss.on("connection", async (ws: CustomWebSocket, req) => {
            try {
                const cookies = cookie.parse(req.headers.cookie || '');
                console.log("cookie", cookies);
                
                if (typeof cookies.userid === "string") {

                    // const onlineUser = { userId: , WebSocket: ws };
                    let userId = cookies.userid;
                    //TODO: this will work for single instance for multiple instace for a single user also append something 
                    ws.id=userId;
                    if (userId in this.onlineUsers) {

                        this.onlineUsers[userId].push(ws);

                    }
                    else {
                        this.onlineUsers[userId] = [ws];
                    }

                }



                //TODO: upgrade this with the jwt token and to remove the from user id
               

                ws.on("message", (message) => {

                    const data = JSON.parse(message.toString());

                    const messageData = wsMessageSchema.safeParse(data);
                    const statusData = wsStatusSchema.safeParse(data);

                    // this is for the message data
                    
                    if (
                        messageData.success 
                    ) {
                        if(messageData.success &&
                            messageData.data.type === MessageType.MESSAGE
                        ){
                            this.publisher.publish(MessageType.MESSAGE, JSON.stringify(messageData.data));
                        }
                        else{
                            console.error("validation error", messageData?.error);
                        }     

                    }
                    else {
                        if(
                            statusData.success &&
                            statusData.data.type === MessageType.STATUS
                        ){
                            this.publisher.publish(MessageType.STATUS, JSON.stringify(statusData.data));
                        }
                        else{
                            console.error("validation error", statusData?.error);
                        }
                    }
                
                    // This is for the status data
                   
                });
                
                ws.on("close", (code,result)=>{
                    try {
                         
                        console.log('disconnected',cookies.userid);
                        
                        const data={userId:cookies.userid,wsInstance:ws};
                        console.log(ws.url);
                        this.publisher.publish(MessageType.DISCONNECT, JSON.stringify(data));
                        
                        
                    } catch (error:any) {
                        console.log(error.message);   
                    }
                   
                  });
            }
            catch (e) {
                console.error(e);
            }

        });

       
          
    }

    async initSubscriber() {
        await this.subscriber.subscribe(MessageType.MESSAGE, message => {

            let data = JSON.parse(message);
            const messageData = wsMessageSchema.safeParse(data);

            if (messageData.success) {

                let socketInstances = this.onlineUsers[messageData.data.data.toUserId];
                
                if (socketInstances && socketInstances.length >= 1) {

                    socketInstances.forEach((socketInstance) => {

                        socketInstance.send(`${message}`);

                    });

                }
            }
        });

        await this.subscriber.subscribe(MessageType.STATUS, message => {

            let data = JSON.parse(message);
            const statusData = wsStatusSchema.safeParse(data);

            if (statusData.success) {

                const socketInstances = this.onlineUsers[statusData.data.data.userId];
                const result=this.findOnlineUsers(Number(statusData.data.data.friendUserId));
                
                if (socketInstances && socketInstances.length >= 1) {
                    
                    socketInstances.forEach((socketInstance) => {

                        
                        socketInstance.send(JSON.stringify({onlineUserId:statusData.data.data.friendUserId,result}));

                    });

                }
            }
        });

        await this.subscriber.subscribe(MessageType.DISCONNECT, message => {
            let data = JSON.parse(message);
            //TODO: validated this useing zod in future
            if(data?.userId in this.onlineUsers){
                console.log("disconnected"); 
                let socketInstances=this.onlineUsers[data?.userId];
                
                console.log("before",socketInstances.length);
                socketInstances=socketInstances?.filter((instance)=>instance.id!==data?.wsInstance.id);
                console.log("after",socketInstances.length);

                if(socketInstances.length===0){     
                    delete this.onlineUsers[data?.userId];
                }
                console.log(Object.keys(this.onlineUsers));
            }
            
        });

    }
   
    findOnlineUsers(userId:number):boolean{
        if(userId in this.onlineUsers){
            return true;
        }
        else{
            return false;
        }
    }
}

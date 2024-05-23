
export class Socket{
    private onlineUsers:Map<string, Array<any>>;
    
    constructor(onlineUsers:Map<string, Array<any>>){
        this.onlineUsers=onlineUsers;
        
    }
    sendMessage(toUserSocketId:string,message:string,socket:any){
        console.log("ddddd",toUserSocketId,message,socket.id);
        socket.to(toUserSocketId).emit("send-message",message);
    }

    setOnlineUsers(userId:string,socket:any){
        if(this.onlineUsers.has(userId)){
            // console.log(this.onlineUsers.get(userId));
            let temp=this.onlineUsers.get(userId);
            temp?.push(socket);
            this.onlineUsers.set(userId,temp||[socket])
            
        }
        else{
            this.onlineUsers.set(userId,[socket]);
        }
    }
    getOnlineUsers(){
        return this.onlineUsers;
    }
    removeOnlineUsers(userId:string){
        this.onlineUsers.delete(userId);
    }
}
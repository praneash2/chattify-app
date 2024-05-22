import { MessageService } from "../services/MessagesService";

export class MessagesController{
     messageService:MessageService;
    constructor(){
        this.messageService=new MessageService();
        this.getAllMessages = this.getAllMessages.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.putMessage = this.putMessage.bind(this);
    }
    async getAllMessages(req:any,res:any){
        const userId:number=req.query.userId;
        let data=await this.messageService.getAllMessages(userId); 
        res.json(data);
    }

    async addMessage(req:any,res:any){
        const fromUserId:number=req.query.fromUserId;
        const toUserId:number=req.query.toUserId;
        const message:string=req?.body?.message;
        
        let data=await this.messageService.addMessage(fromUserId,toUserId,message);
        console.log(data);
        res.json(data);
    }
    putMessage(req:any,res:any){

    }   
}
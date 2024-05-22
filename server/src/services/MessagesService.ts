import { shardConstants } from "../constants/generalConstants";
import { MessageRepository } from "../repositories/MessagesRepository";
import { hashFunction } from "../utils/hashFunction";

export class MessageService{
    private messagesRepository:MessageRepository;
    constructor(){
        this.messagesRepository=new MessageRepository();
    }
    async getAllMessages(userId:number){
        console.log("get all messages service is called");
        return await this.messagesRepository.getAllMessages(userId);
    }

    async addMessage(fromUserId:number,toUserId:number,message:string,){
        console.log("add messages service is called");
        let currentGMTDate:string = new Date().toUTCString();
        const shardId=hashFunction(fromUserId,shardConstants.messagesShard);
        return await this.messagesRepository.addMessage(fromUserId,toUserId,message,currentGMTDate,shardId);
    }
}
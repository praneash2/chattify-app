import { error } from "console";
import { shardConstants } from "../constants/generalConstants";
import { MessageRepository } from "../repositories/MessagesRepository";
import { hashFunction } from "../utils/hashFunction";
import { messageSchemaInfer } from "../validators/messages";
import { UsersRepository } from "../repositories/UsersRepository";

export class MessageService{
    private messagesRepository:MessageRepository;
    private usersRepository:UsersRepository;
    constructor(){
        this.messagesRepository=new MessageRepository();
        this.usersRepository=new UsersRepository();
    }
    async getAllMessages(fromUserId:number,toUserId:number){
        try{
        
            console.log("get all messages service is called");
            const shardId=hashFunction(fromUserId,shardConstants.messagesShard);
            if(await this.usersRepository.validUser(fromUserId)!==0 && await this.usersRepository.validUser(toUserId)!==0){
                return await this.messagesRepository.getAllMessages(fromUserId,toUserId,shardId);
            }
            else{
                throw Error("user not exists");
            }

        }catch(e:any){
            throw Error(e?.message);
        }
        
    }

    async addMessage(fromUserId:number,toUserId:number,message:messageSchemaInfer,){
        try{
            console.log("add messages service is called");
            let currentGMTDate:string = new Date().toUTCString();
            const shardId=hashFunction(fromUserId,shardConstants.messagesShard);
            if(await this.usersRepository.validUser(fromUserId)!==0 && await this.usersRepository.validUser(toUserId)!==0){
                return await this.messagesRepository.addMessage(fromUserId,toUserId,message,currentGMTDate,shardId);
            }
            else{
                throw Error("user not exists");
                
                
            }
        }catch(e:any){
            throw Error(e?.message);
        }   
    
    }
}
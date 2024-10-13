import { MessagesRepository } from "../../repositories/MessagesRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

interface Message{
    from:number; 
    to:number;
    message:string;
}

interface getMessagesResult{
    sentMessages?: Message[]; 
    receivedMessages?:Message[];
    result: string;
} 

interface addMessageResult{
    data?:Message;
    result:string;
}

export class MessagesService{
    private messagesRepository:MessagesRepository;
    private usersRepository:UsersRepository;
    constructor(){
        this.messagesRepository=new MessagesRepository();
        this.usersRepository=new UsersRepository();
    }

    getMessages=async(fromUserId:number,toUserId:number):Promise<getMessagesResult>=>{
        try {  
            const validUsers=await this.validateFromAndToUser(fromUserId,toUserId);
            if(validUsers.result===""){
                const sentMessages=await this.messagesRepository.getMessages(fromUserId,toUserId);
                const receivedMessages=await this.messagesRepository.getMessages(toUserId,fromUserId);
            
                return {sentMessages,receivedMessages,result:"messages fetched successfully"};
            }
            return validUsers;
            
        } catch (error) {
            throw(error);
        }
    }   

    addMessage=async(message:Message):Promise<addMessageResult>=>{
        try {
            const validUsers=await this.validateFromAndToUser(message.from,message.to);
            if(validUsers.result===""){
                let data=await this.messagesRepository.addMessage(message);
                return {data,result:"message sent successfully"};
            }
            return validUsers;
        } catch (error) {
            throw(error);
        }
    }

    validateFromAndToUser=async(fromUserId:number,toUserId:number)=>{
        try {
            const fromUserExits=await this.usersRepository.getUser(fromUserId);
            const toUserExists=await this.usersRepository.getUser(toUserId);
            if(!fromUserExits){
                return {result:"from user not exists"};
            }
            if(!toUserExists){
                return {result:"to user not exits"}
            }
            return {result:""};
        } catch (error) {
            throw(error);
        }
    }
}
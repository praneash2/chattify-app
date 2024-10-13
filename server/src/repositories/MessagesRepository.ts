import {  PrismaClient } from '@prisma/client';



interface Message{
    from:number; 
    to:number;
    message:string;
}

export class MessagesRepository{

    private prisma:PrismaClient;
    
    constructor(){
        this.prisma=new PrismaClient();
    }

    getMessages=async(fromUserId:number,toUserId:number):Promise<Message[]>=>{
        try {   
            return await this.prisma.message.findMany(
                { where: {
                from: fromUserId,
                to: toUserId
              },
            })
        } catch (error) {
            throw(error);
        }
    }

    addMessage=async(messageData:Message):Promise<Message>=>{
        try {
            
            return await this.prisma.message.create({
                data:{
                    from:messageData.from,
                    to:messageData.to,
                    message:messageData.message
                }
            });
        
        } catch (error) {
            throw(error);
        }
    }
   
}
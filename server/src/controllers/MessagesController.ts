import {Request, Response } from "express";
import { errorResponseObject, successResponseObject } from "../utils/responseObject";
import { MessagesService } from "../services/MessagesService/MessagesService";

export class MessagesController{
    
    private messagesService:MessagesService;
    
    constructor(){
        this.messagesService=new MessagesService();
    }

    getMessages=async(req:Request,res:Response)=>{
        try {
            const fromUserId:number=Number(req?.query?.fromUserId);
            const toUserId:number=Number(req?.query?.toUserId);
            const data=await this.messagesService.getMessages(fromUserId,toUserId);
            if(data.result!=="messages fetched successfully"){
                successResponseObject(res,{},200,data.result);
                return ;
            }
            successResponseObject(res,{data},200,data.result);
        }
         catch (error:any) {
            errorResponseObject(res,error,500,error.message);
        }
    }

    addMessage=async(req:Request,res:Response)=>{
        try {
            const message=req?.body;
            let data=await this.messagesService.addMessage(message);
            if(data.result!=="message sent successfully"){
                successResponseObject(res,{data},200,data.result);
                return ;
            }
            successResponseObject(res,{data:data.data},200,"added the message successfully");
        } catch (error:any) {
            errorResponseObject(res,error,500,error.message);
        }
    }
}
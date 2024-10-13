import {Request, Response } from "express";
import { FriendsService } from "../services/FriendsService.ts/FriendsService";
import { errorResponseObject, successResponseObject } from "../utils/responseObject";

export class FriendsController{
    protected friendsService:FriendsService;
    constructor(){
        this.friendsService=new FriendsService();
    }
    getAllFriends=async (req:Request,res:Response)=>{
        try {
            
            let userid=Number(req?.cookies?.userid);
            let data=await this.friendsService.getAllFriends(userid);
            successResponseObject(res,data,200,"friends fetched successfully");
        } catch (error:any) {
            errorResponseObject(res,error,500,error.message);
        }
    }

    addFriend=async (req:Request,res:Response)=>{
        try{
            let data=await this.friendsService.addFriend(req?.body);
            successResponseObject(res,data,200,data.result);
        }
        catch(err:any){
            errorResponseObject(res,err,500,err.message);
        }
    }
}
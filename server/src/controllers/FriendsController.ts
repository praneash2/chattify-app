import {Request, Response } from "express";
import { FriendsService } from "../services/FriendsService.ts/FriendsService";
import { errorResponseObject, successResponseObject } from "../utils/responseObject";

export class FriendsController{
    protected friendsService:FriendsService;
    constructor(){
        this.friendsService=new FriendsService();
    }
    getAllFriends=(req:Request,res:Response)=>{
        
        res.send("friends");
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
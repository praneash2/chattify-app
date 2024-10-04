import {Request, Response } from "express";
import { FriendsService } from "../services/FriendsService.ts/FriendsService";

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
            const friend=req?.body;
            await this.friendsService.addFriend(friend);
        }
        catch(e){
            console.error(e);
        }
    }
}
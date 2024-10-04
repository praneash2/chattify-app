import {Request, Response } from "express";
import { FriendsRepository } from "../../repositories/FriendsRepository";
interface addFriend{
    userid:number,
}

export class FriendsService{
    
    private friendRepositoy:FriendsRepository;
    constructor(){
        this.friendRepositoy = new FriendsRepository();
    }

    getAllFriends=(req:Request,res:Response):void=>{
        this.friendRepositoy.getAllFriends();
        res.send("friends");
    }

    addFriend=async(friend:addFriend)=>{
        await this.friendRepositoy.addFriend(friend);
    }

}
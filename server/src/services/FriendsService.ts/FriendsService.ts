import {Request, Response } from "express";
import { FriendsRepository } from "../../repositories/FriendsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
interface addFriend{
    userid:number,
    friendid:number
}

interface addFriendResult{
    id?: number;
    userid?: number;
    friendid?: number;
}

interface result{
    result:string
}

export class FriendsService{
    
    private friendRepository:FriendsRepository;
    private usersRepository:UsersRepository;
    constructor(){
        this.friendRepository = new FriendsRepository();
        this.usersRepository =  new UsersRepository();
    }

    getAllFriends=(req:Request,res:Response):void=>{
        this.friendRepository.getAllFriends();
        res.send("friends");
    }

    addFriend=async(data:addFriend):Promise<addFriendResult & result>=>{
        try {
            const userExists=await this.usersRepository.getUser(data.userid);
            const friendExists=await this.usersRepository.getUser(data.friendid);
            if(!(userExists && friendExists)){
                return {result:"user not exits"};
            }

            let friendResult=await this.friendRepository.addFriend(data);
            return {...friendResult,result:"friend added"};
            
        } catch (error) {
            throw(error)
        }
    }

}
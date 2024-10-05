import {Request, Response } from "express";
import {  PrismaClient } from '@prisma/client';
interface addFriend{
    userid:number,
    friendid:number
}

interface addFriendResult{
        id: number;
        userid: number;
        friendid: number;
}

export class FriendsRepository{

    private prisma:PrismaClient;
    
    constructor(){
        this.prisma=new PrismaClient();
    }

     getAllFriends=async()=>{
        const value=await this.prisma.user.findMany(); 
        console.log(value);
    }

     addFriend=async(data:addFriend):Promise<addFriendResult>=>{
        try{
            const friendResult=await this.prisma.friend.create({
                data:{
                    userid:data.userid,
                    friendid:data.friendid
            }});
            return friendResult;
        }
        catch(err){
            throw(err);
        }
    }
}
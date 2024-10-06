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

     getAllFriends=async(userid:number):Promise<addFriendResult[]>=>{
        const friendsResult=await this.prisma.friend.findMany({
            where:{
                userid:userid
            }
        }); 
        return friendsResult;
    }

    getAlreadyExistingFriend=async(data:addFriend):Promise<addFriendResult|null>=>{
        const friendResult=await this.prisma.friend.findFirst({
            where:{
                userid:data.userid,
                friendid:data.friendid
            }
        }
        )
        return friendResult;
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
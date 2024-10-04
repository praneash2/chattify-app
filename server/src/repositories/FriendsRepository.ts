import {Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client';
interface addFriend{
    userid:number,
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

     addFriend=async(friend:addFriend)=>{
        await this.prisma.friend.create({
            data:{
                userid:friend.userid
        }});
    }
}
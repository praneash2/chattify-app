import {Request, Response } from "express";
import { UsersService } from "../services/UsersService/UserService";

export class UsersController{
    protected usersService:UsersService;
    
    constructor(){
        this.usersService=new UsersService();
    }
    
    getUsers=async(req:Request,res:Response)=>{
        try {
            const userId:number=Number(req?.query?.userId);
            
            let result=await this.usersService.getUser(userId);
            console.log();
            res.send(result);
        }
         catch (error) {
            res.send(error);
        }
    }

    createUser=async(req:Request,res:Response)=>{
        try {
            const result=await this.usersService.createUser(req.body)
            res.send(result);
        } catch (error) {
            res.send(error);
        }
    }
}
import {Request, Response } from "express";
import { UsersService } from "../services/UsersService/UserService";
import { successResponseObject } from "../utils/responseObject";

export class UsersController{
    protected usersService:UsersService;
    
    constructor(){
        this.usersService=new UsersService();
    }
    
    getUsers=async(req:Request,res:Response)=>{
        try {
            const userId:number=Number(req?.query?.userId);
            
            let data=await this.usersService.getUser(userId);
            successResponseObject(res,data,200,"fetched user successfully");
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
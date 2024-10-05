import { Response } from "express";

export const successResponseObject=(res:Response,data:object|undefined|null,statusCode:number,message:string)=>{
    res.status(statusCode).json({data:data,error:{},message:message});
}

export const errorResponseObject=(res:Response,error:object={},statusCode:number,message:string)=>{
    res.status(statusCode).json({data:{},error:error,message:message});
}
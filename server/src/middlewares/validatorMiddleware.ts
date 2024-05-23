import { NextFunction } from "express";
import { errorResponseObject } from "../utils/responseObject"

export const validatorMiddleware=(res:any,schema:any,data:object,next:NextFunction)=>{
    try{

        console.log(data)
        schema.parse(data);
        
        next();
    }
    catch(e:any){
        errorResponseObject(res,JSON.parse(e.message),400,"not valid input");
    }
}
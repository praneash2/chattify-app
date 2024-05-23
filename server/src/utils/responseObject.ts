export const successResponseObject=(res:any,data:object|undefined,statusCode:number,message:string)=>{
    res.status(statusCode).json({data:data,error:{},message:message});
}

export const errorResponseObject=(res:any,error:object={},statusCode:number,message:string)=>{
    res.status(statusCode).json({data:{},error:error,message:message});
}
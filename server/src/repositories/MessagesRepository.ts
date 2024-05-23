import pool from "../db/db"
import { messageSchemaInfer } from "../validators/messages";
export class MessageRepository{

    async getAllMessages(fromUserId:number,toUserId:number,shardId:number){
        try{
            console.log("get all messages repository is called");
            const tableName:string='MESSAGES'+shardId.toString();
            let messages=await pool.query(`SELECT * FROM ${tableName} WHERE fromuserid = $1 and touserid = $2`,[fromUserId,toUserId]);
            return messages?.rows;
        }
        catch(e:any){
            const tableName:string='MESSAGES'+shardId.toString();
            if(e.message===`relation "${tableName.toLowerCase()}" does not exist`){
                await pool.query(`CREATE TABLE  ${tableName} (MessageID SERIAL NOT NULL PRIMARY KEY,FromUserId int references USERS(UserID),ToUserId int references USERS(UserID),messages varchar(255), createdAt varchar(40) )`);
                new Error(e.message);
            }
            console.log(e.message)
            throw Error(e?.message);
           
        }   
    }

    async addMessage(fromUserId:number,toUserId:number,message:messageSchemaInfer,currentGMTDate:string,shardId:number){
        try{
            console.log("add messages repository is called",message,currentGMTDate);
            const tableName:string='MESSAGES'+shardId.toString();
            await pool.query(`INSERT INTO ${tableName} (fromuserid,touserid,messages,createdAt) VALUES ($1,$2,$3,$4)`,[fromUserId,toUserId,message,currentGMTDate]);
            return {fromUserId,toUserId,message,currentGMTDate};
            
        }catch(e:any){
            const tableName:string='MESSAGES'+shardId.toString();
            if(e.message===`relation "${tableName.toLowerCase()}" does not exist`){
                await pool.query(`CREATE TABLE  ${tableName} (MessageID SERIAL NOT NULL PRIMARY KEY,FromUserId int references USERS(UserID),ToUserId int references USERS(UserID),messages varchar(255), createdAt varchar(40) )`);
                new Error(e.message);
            }
            console.log(e.message)
        }
    }
}
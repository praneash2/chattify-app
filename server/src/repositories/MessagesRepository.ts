import pool from "../db/db"
export class MessageRepository{

    async getAllMessages(userId:number){
        try{
            console.log("get all messages repository is called");
            let messages=await pool.query("SELECT * FROM MESSAGES WHERE UserID = $1",[userId]);
            return messages;
        }
        catch(e:any){
            if(e.message==='relation "messages" does not exist'){
                await pool.query("CREATE TABLE MESSAGES(MessageID SERIAL NOT NULL PRIMARY KEY,FromUserId int references USERS(UserID),ToUserId int references USERS(UserID),messages varchar(255), createdAt varchar(40) )");
                new Error(e.message);
            }
            console.log(e.message);
        }   
    }

    async addMessage(fromUserId:number,toUserId:number,message:string,currentGMTDate:string,shardId:number){
        try{
            console.log("add messages repository is called",message,currentGMTDate);
            const tableName:string='MESSAGES'+shardId.toString();
            console.log(tableName,"table name");
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
import pool from "../db/db"
export class UsersRepository{
    
    async validUser(userId:number){
        try{
            let user=await pool.query("SELECT * FROM USERS WHERE USERID = $1",[userId]);
            if(user){
                return user.rows.length;
            }
        }catch(e:any){  
            throw Error(e.message);
        }
       
    }
}
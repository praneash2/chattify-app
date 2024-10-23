import { UsersRepository } from "../../repositories/UsersRepository";
import jwt from 'jsonwebtoken';
interface User{
    name:string,
    email:string,
    password:string
}

interface userResult {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
}


interface result{
    result:string
}

export class UsersService{
    
    private usersRepository:UsersRepository;
    constructor(){
        this.usersRepository = new UsersRepository();
    }

    getUser=async(userId:number):Promise<userResult|null>=>{
        try {
            const data= await this.usersRepository.getUser(userId);
            jwt.sign({
                data: userId
              }, 'secret', { expiresIn: '1h' });
            return data;
        } catch (error) {
            throw(error)
        }
    
    }

    createUser=async(user:User):Promise<userResult&result>=>{
        try {
            let userResultByEmail=await this.usersRepository.getUserByEmail(user.email);
            if(userResultByEmail){
                return {result:"Already Exists"}
            }
            const data=await this.usersRepository.createUser(user);
            return {...data,result:"user created"};
        } catch (error) {
            throw(error);
        }
        
    }


}
import { UsersRepository } from "../../repositories/UsersRepository";
interface User{
    name:string,
    email:string,
    password:string
}
export class UsersService{
    
    private usersRepository:UsersRepository;
    constructor(){
        this.usersRepository = new UsersRepository();
    }

    getUser=async(userId:number)=>{
        try {
            const data= await this.usersRepository.getUser(userId);
            return data;
        } catch (error) {
            throw(error)
        }
    
    }

    createUser=async(user:User)=>{
        try {
            const data=await this.usersRepository.createUser(user);
            return data;
        } catch (error) {
            throw(error);
        }
        
    }


}
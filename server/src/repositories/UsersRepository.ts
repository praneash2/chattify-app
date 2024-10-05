import { PrismaClient } from "@prisma/client";


interface User{
    name:string,
    email:string,
    password:string
}

interface userResult {
    id: number;
    name: string;
    email: string;
    password: string;
}

export class UsersRepository{
    
    private prisma:PrismaClient;
    
    constructor(){
        this.prisma=new PrismaClient();
    }

    getUser=async(userId:number)=>{
        try {
        
            const userData=await this.prisma.user.findUnique({
                where: {
                  id: 1,
                },
              });
              console.log(userData);
              return userData;
        } catch (error) {
            throw(error)
        }
          
    }

    createUser=async(user:User):Promise<userResult>=>{
        try {
            let userResult=await this.prisma.user.create({
                data:user
            })
            return userResult 
        } catch (error) {
            throw(error)
        }   
     
    }   
}
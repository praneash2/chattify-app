import { FriendsRepository } from "../../repositories/FriendsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
interface addFriend{
    userid:number,
    friendid:number
}

interface addFriendResult{
    id?: number;
    userid?: number;
    friendid?: number;
}

interface getAllFriendsResult{
    friends?:addFriendResult[]
    result:string
}

interface result{
    result:string
}

export class FriendsService{
    
    private friendRepository:FriendsRepository;
    private usersRepository:UsersRepository;
    constructor(){
        this.friendRepository = new FriendsRepository();
        this.usersRepository =  new UsersRepository();
    }

    getAllFriends=async (userid:number):Promise<getAllFriendsResult>=>{
        const userExists=await this.usersRepository.getUser(userid);
        if(!userExists){
            return {result:"user not exists"}
        }
        const data=await this.friendRepository.getAllFriends(userid);

        return {...data,result:"friends fetched successfullt"};
    }

    addFriend=async(data:addFriend):Promise<addFriendResult & result>=>{
        try {
            const userExists=await this.usersRepository.getUser(data.userid);
            const friendExists=await this.usersRepository.getUser(data.friendid);
            console.log("e");
            if(!(userExists && friendExists)){
                return {result:"user not exits"};
            }

            const alreadyExistingFriend= await this.friendRepository.getAlreadyExistingFriend(data);
            
            if(alreadyExistingFriend){
                return {result:"already a friend"}    
            }
            let friendResult=await this.friendRepository.addFriend(data);
            return {...friendResult,result:"friend added"};
            
        } catch (error) {
            throw(error)
        }
    }

}
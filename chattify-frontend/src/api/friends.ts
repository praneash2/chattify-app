import axios from "axios";

interface friend{
    userId:number;
    friendId:number;
    friendName:string;
}

export const getAllFriends=async(userId:number)=>{
    try{    
        let friends=await axios.get(`http://localhost:5000/friends?userid=${userId}`,{withCredentials: true});
        
        let values:friend[] =Object.values(friends.data.data)
        return values||[];
    }
    catch(err){ 
        console.error(err);
    }

}
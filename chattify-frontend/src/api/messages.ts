import axios from "axios";

interface Message{
    from:number;
    to:number;
    message:string;
}

export const getAllMessages=async(fromUserId:number,toUserId:number)=>{
    try{    
        const messages=await axios.get(`http://localhost:5000/message?fromUserId=${fromUserId}&toUserId=${toUserId}`,{withCredentials: true});
        return messages.data?.data?.data?.messages||[];
    }
    catch(err){ 
        console.error(err);
    }

}


export const sendMessagePost=async(data:Message)=>{
    try {
        const message= await axios.post('http://localhost:5000/message',data,{withCredentials: true});
        console.log(message);
    } catch (error) {
        console.error(error);
    }
}
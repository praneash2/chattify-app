"use client"
import { socketAtom } from '@/recoil/atoms/socketAtom';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserAtom } from '@/recoil/atoms/currentUserAtom';
import FriendsList from '../FriendsList/FriendsList';
import { CookieValueTypes, getCookie } from 'cookies-next';
import { getAllMessages, sendMessagePost } from '@/api/messages';

interface Message{
    from:number;
    to:number;
    message:string
}

export default function MessageBox() {
    const socket =useRecoilValue(socketAtom);
    const [inputMessage,setInputMessage] = useState("");
    const toUserId = useRecoilValue(currentUserAtom);
    const [messages,setMessages]= useState<Message[]>([
        {from:1,
            to:2,
        message:"hi"},
        {from:2,
            to:1,
            message:"hi there"}
    ]);
    const [currentUserId,setCurrentUserId]=useState<CookieValueTypes>(getCookie('userid'));
   
    useEffect(
        ()=>{
            
            socket.onopen=()=>{
                
                console.log("connected");
            }

            socket.onmessage=(event)=>{
                let messageReceived=JSON.parse(event.data).data.message;
                setMessages([...messages,{from:Number(currentUserId),to:toUserId, message:messageReceived}]);
            }
            socket.onclose = () => {
                
                console.log("WebSocket disconnected");
            };
          
            socket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
          
        }
    );

    useEffect(()=>{
        setMessages([]);
        
        (async()=>{
            const data=await getAllMessages(Number(currentUserId),toUserId);
            setMessages(data);
        })()
    },[toUserId,getCookie('userid')]);

    useEffect(()=>{
        //cookie fetch and set 
        setCurrentUserId(getCookie('userid'));
        
    },[getCookie('userid')]);

    const sendMessage=async (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setMessages([...messages,{from:Number(currentUserId),to:toUserId ,message:inputMessage}]);
        if(toUserId){
            socket.send(JSON.stringify({
                "type":"message",
                "data":{
                    "message":`${inputMessage}`,
                    "toUserId":`${toUserId}`  
                }
            }));
            await sendMessagePost({from:Number(currentUserId),to:toUserId ,message:inputMessage});
            setInputMessage('');
        }
        else{
            alert("select some one to message");
        }
    }
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputMessage(e.target.value);
    }
    return (
        <div className='flex flex-row'>
            <FriendsList></FriendsList>
            <div>
                <div className=' flex p-10 flex-col h-[90vh] bg-slate-950 w-[60vw]'>
                    {messages.map((message,index)=>(
                        (message.from===Number(currentUserId))?<div key={index} className='self-end'>{message.message}</div>:<div key={index} className='self-start'>{message.message}</div>
                    ))
                    }
                </div>
                <div className='flex'>
                    <input className='w-[100%]' onChange={handleChange} value={inputMessage}></input>
                <button onClick={sendMessage}>send</button>
                </div>
            </div>
        </div>
    )
}

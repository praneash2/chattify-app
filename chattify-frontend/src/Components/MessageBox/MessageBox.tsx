"use client"
import { socketAtom } from '@/recoil/atoms/socketAtom';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { currentUserAtom } from '@/recoil/atoms/currentUserAtom';
import FriendsList from '../FriendsList/FriendsList';

interface message{
    from:boolean,
    data:string
}

export default function MessageBox() {
    const socket =useRecoilValue(socketAtom);
    const [inputMessage,setInputMessage] = useState("");
    const toUserId = useRecoilValue(currentUserAtom);
    const [messages,setMessages]= useState<message[]>([
        {from:true,
        data:"hi"},
        {from:false,
            data:"hi"}
    ]);
   
    useEffect(
        ()=>{
            
            socket.onopen=()=>{
                
                console.log("connected");
            }

            socket.onmessage=(event)=>{
                let messageReceived=JSON.parse(event.data).data.message;
                setMessages([...messages,{from:true, data:messageReceived}]);
            }
            socket.onclose = () => {
                
                console.log("WebSocket disconnected");
            };
          
            socket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
          
        }
    );

    const sendMessage=(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setMessages([...messages,{from:false, data:inputMessage}]);
        if(toUserId){
            socket.send(JSON.stringify({
                "type":"message",
                "data":{
                    "message":`${inputMessage}`,
                    "toUserId":`${toUserId}`  
                }
            }));
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
                        (message.from===true)?<div key={index} className='self-start'>{message.data}</div>:<div key={index} className='self-end'>{message.data}</div>
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

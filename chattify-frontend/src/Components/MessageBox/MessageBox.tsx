"use client"
import { socketAtom } from '@/recoil/atoms/socketAtom';
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserAtom } from '@/recoil/atoms/currentUserAtom';
import FriendsList from '../FriendsList/FriendsList';
import { CookieValueTypes, getCookie } from 'cookies-next';
import { getAllMessages, sendMessagePost } from '@/api/messages';
import Navbar from '../Navbar/Navbar';
import { currentUserIdAtom } from '@/recoil/atoms/currentUserIdAtom';
import MessageHeader from '../MessageHeader/MessageHeader';

interface Message{
    from:number;
    to:number;
    message:string
}

export default function MessageBox() {
    const socket =useRecoilValue(socketAtom);
    const [inputMessage,setInputMessage] = useState("");
    const toUserId = useRecoilValue(currentUserAtom);
    const scrollElement =useRef<HTMLDivElement>(null);
    const [messages,setMessages]= useState<Message[]>([]);
    const [currentUserId,setCurrentUserId]=useRecoilState<CookieValueTypes>(currentUserIdAtom);
    
    useEffect(
        ()=>{
            
            socket.onopen=()=>{
                
                console.log("connected");
            }

            socket.onmessage=(event)=>{
                // console.log(event.data);
                if(toUserId){
                    let messageReceived=JSON.parse(event.data).data?.message;
                    //TODO: refactor this from and to in future
                    setMessages([...messages,{from:toUserId,to:Number(currentUserId), message:messageReceived}]);
                }
            }
            socket.onclose = () => {
                
                console.log("WebSocket disconnected");
            };
          
            socket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
            
            if (scrollElement.current ) {
                scrollElement.current.scrollTop = scrollElement.current.scrollHeight;
              }

          

        }
    );
   
   
    useEffect(()=>{
        setMessages([]);
        
        (async()=>{
            if(socket){
                socket.send(JSON.stringify({
                    "type":"status",
                    "data":{
                        "userId":`${currentUserId}`,
                        "friendUserId":`${Number(toUserId)}`
                    }
                }));

                const data=await getAllMessages(Number(currentUserId),toUserId);
                setMessages(data);
            }   
        })()
        
    },[toUserId,getCookie('userid')]);

    useEffect(()=>{
        //cookie fetch and set 
        setCurrentUserId(getCookie('userid'));
        
    },[getCookie('userid')]);

    
    const sendMessage=async (e:React.MouseEvent<HTMLButtonElement>|React.KeyboardEvent<HTMLInputElement>)=>{
        if (e.type === 'click' || ((e.type === 'keydown' )&&((e as React.KeyboardEvent).key==="Enter"))) {
            setMessages([...messages,{from:Number(currentUserId),to:toUserId ,message:inputMessage}]);
            if(toUserId && socket){
                socket.send(JSON.stringify({
                    "type":"message",
                    "data":{
                        "message":`${inputMessage}`,
                        "toUserId":`${toUserId}` ,
                         "fromUserId":`${Number(currentUserId)}`
                    }
                }));
                const sendedMessageResult=await sendMessagePost({from:Number(currentUserId),to:toUserId ,message:inputMessage});
                if(sendedMessageResult?.status===200){
                    //TODO: handle this in the future for message not saved
                    console.log("message not saved");
                }
                setInputMessage('');
            }
            else{
                alert("select some one to message");
            }
        }   
    }
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputMessage(e.target.value);
    }
    return (
        <div className='flex'>
            <Navbar></Navbar>
            <FriendsList></FriendsList>
            <div className='h-[100vh] w-[80vw]'>
                <MessageHeader ></MessageHeader>
                <div ref={scrollElement} className=' flex p-10 flex-col gap-2 h-[85%] border-[1px] border-gray-200  overflow-y-scroll'>
                    {messages?.map((message,index)=>(
                        (message.from===Number(currentUserId))?<div key={index} className='self-end px-4 py-1 bg-violet-600 rounded-md'>{message.message}</div>:<div key={index} className='self-start px-4 py-1 bg-slate-100 rounded-md'>{message.message}</div>
                    ))
                    }
                </div>
                <div className='flex h-[5%]'>
                    <input onKeyDown={sendMessage} className='w-[100%] px-4 bg-slate-100 rounded-lg' placeholder='Type your message here' onChange={handleChange} value={inputMessage}></input>
                    <button  onClick={sendMessage} >send</button>
                </div>
            </div>
        </div>
    )
}

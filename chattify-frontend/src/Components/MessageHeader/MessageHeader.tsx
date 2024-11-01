"use client"
import React, { useEffect, useState } from 'react'
import StatusIndicator from '../StatusIndicator/StatusIndicator'
import { socketAtom } from '@/recoil/atoms/socketAtom';
import { useRecoilValue } from 'recoil';
import { currentUserAtom } from '@/recoil/atoms/currentUserAtom';
import isAuth from '@/CustomHooks/isAuth';

interface MessageHeaderProps{
    changeFlag: boolean;
}

const MessageHeader=({changeFlag}:MessageHeaderProps) =>{
    const socket =useRecoilValue(socketAtom);
    const toUserId = useRecoilValue(currentUserAtom);
    const [isOnline,setIsOnline] = useState(false);

    useEffect(()=>{
        const messageHandler = (event:MessageEvent<any>) => {
            const statusData=JSON.parse(event.data);
            console.log("statusData");
            // alert();
            if(Number(statusData?.onlineUserId)===toUserId && statusData.result===true){
                setIsOnline(true);
            }else{
                setIsOnline(false);
            }   
            
        };
    
        if (socket) {
            socket.addEventListener('message', messageHandler);
        }
    
        return () => {
            if (socket) {
                socket.removeEventListener('message', messageHandler);
            }
        };
    },[toUserId,changeFlag]);
    //TODO: change the online state if the friends online state is changed
  return (
    <div className='border-l-[1px] border-gray-200 h-[10%]'>
        <StatusIndicator online={isOnline}>
            
        </StatusIndicator>
    </div>
  )
}

export default  MessageHeader;
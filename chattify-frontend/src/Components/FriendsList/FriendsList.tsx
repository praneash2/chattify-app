"use client"
import { getAllFriends } from '@/api/friends';
import { currentUserAtom } from '@/recoil/atoms/currentUserAtom';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';

interface friend{
    userId:number;
    friendId:number;
    friendName:string;
}



export default function FriendsList() {
    const [friendsList,setFriendsList] = useState<friend[]>([]);
    const [toUserId,setToUserId] = useRecoilState(currentUserAtom);
    
    useEffect(()=>{
        (async()=>{
            // console.log(toUserId);
            const friend=await getAllFriends(toUserId);
            if(friend){
                setFriendsList(friend);
            }
        })();
        
    },[]);

    const selectFriend=(e:React.MouseEvent<HTMLDivElement>)=>{
        const target = e.target as HTMLButtonElement;
        const value = target.getAttribute('data-user-id');
        if(value && value!=='' ){
            setToUserId(Number(value));
        }
    }

    return (
        <div className='flex flex-col gap-2 w-[15vw]'>
            <h6 className='border-[1px] border-x-[0] border-gray-200 p-[10px]'>messages</h6>
            <div>
                {
                    friendsList.map((friend,index)=>(
                        <div className={(friend.friendId===toUserId)?'bg-slate-50 p-[10px]':'p-[10px]'} key={index} data-user-id={friend.friendId} onClick={selectFriend} >{friend.friendName}</div>
                    ))
                }
            </div>
        </div>
    )
}

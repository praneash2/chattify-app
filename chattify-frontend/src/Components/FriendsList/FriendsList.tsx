import { currentUserAtom } from '@/recoil/atoms/currentUserAtom';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';

export default function FriendsList() {
    const [friendsList,setFriendsList] = useState([{name:"praneash",userId:1},{name:"kumar",userId:2}]);
    const [toUserId,setToUserId] = useRecoilState(currentUserAtom);
    
    const selectFriend=(e:React.MouseEvent<HTMLDivElement>)=>{
        const target = e.target as HTMLButtonElement;
        const value = target.getAttribute('data-user-id');
        if(value && value!=='' ){
            setToUserId(value);
        }
    }

    return (
        <div>
            FriendsList
            <div>
                {
                    friendsList.map((friend,index)=>(
                        <div key={index} data-user-id={friend.userId} onClick={selectFriend} >{friend.name}</div>
                    ))
                }
            </div>
        </div>
    )
}

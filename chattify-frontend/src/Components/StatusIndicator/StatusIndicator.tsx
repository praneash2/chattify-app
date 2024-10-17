import React from 'react'

interface StatusIndicatorProps{
    online:boolean;
}

export default function StatusIndicator({online}:StatusIndicatorProps) {
  return (
    <div>
        {
            (online===true)?<div>
                <div className='w-[10px] h-[10px] bg-green-700 rounded-full'></div>
                <p>online</p>
            </div>:<div>
                <div className='w-[10px] h-[10px] bg-red-800 rounded-full'></div>
                <p>offline</p>
            </div>  
        }
    </div>
  )
}

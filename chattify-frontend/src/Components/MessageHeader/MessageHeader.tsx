import React from 'react'
import StatusIndicator from '../StatusIndicator/StatusIndicator'

export default function MessageHeader() {
    
  return (
    <div className='border-l-[1px] border-gray-200 h-[10%]'>
        <StatusIndicator online={true}>
            
        </StatusIndicator>
    </div>
  )
}

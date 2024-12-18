import React from 'react'
import Logo from '../Logo/Logo'

export default function Navbar() {
  return (
    <div className='flex flex-col gap-2 items-center w-[5vw] border-[1px] border-slate-200'>
        <Logo></Logo>
        <div className='flex  flex-col gap-2'>
            <div className='w-[20px] h-[20px] bg-red-300'>
            </div>
            <div className='w-[20px] h-[20px] bg-red-300'>
            </div>
        </div>
    </div>
  )
}

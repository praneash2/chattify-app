"use client"
import React from 'react'

export default function Login() {
  return (
    <div className='flex gap-3 flex-col justify-center items-center'>
        <h6 className="">Login</h6>
        <input className='h-[50px] w-[70%] rounded-md p-2' placeholder='email'/>
        <input className='h-[50px] w-[70%] rounded-md p-2' placeholder='password'/>
        <button className='text-white bg-yellow-800 py-2 px-4 rounded-md'>Login</button>
    </div>
  )
}

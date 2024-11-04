"use client"
import Login from '@/Components/Login/Login';
import Signup from '@/Components/Signup/Signup';
import Image from 'next/image';
import React, { useState } from 'react'
interface Credentials {
  email: string;
  password: string;
}

export default function AuthPage() {
    const [login,setLogin]=useState<boolean>(true);
    const [credentials,setCredentials] = useState<Credentials>({email:"",password:""});
    console.log(credentials);
    return (
    <div className='flex p-10 gap-5 rounded-lg bg-slate-500 m-auto w-[80%] h-[70%]'>
        <div className="w-[50%] h-[100%] rounded-md overflow-hidden">
            <Image  src="/assets/images/backgroundAuthImg.jpg" alt="login image" loading='lazy' height={100} width={100} objectFit='cover' className="object-cover w-full h-full" ></Image>
        </div>
        <div className='w-[50%] flex flex-col justify-center'>
            {
            (login)?<Login setLogin={setLogin} credentials={credentials} setCredentials={setCredentials}></Login>:<Signup setLogin={setLogin} credentials={credentials} setCredentials={setCredentials}></Signup>
            }
        </div>
    </div>
  )
}

"use client"
import {RecoilRoot} from 'recoil';
import React from 'react'
import MessageBox from '@/Components/MessageBox/MessageBox';
import isAuth from "@/CustomHooks/isAuth";

const HomeContainer = () => {

  return (
    <RecoilRoot>
        <div>
            <MessageBox>
                
            </MessageBox>
        </div>  
    </RecoilRoot>
    
  )
}

export default (HomeContainer);
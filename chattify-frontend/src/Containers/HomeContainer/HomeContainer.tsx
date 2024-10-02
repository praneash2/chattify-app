"use client"
import {RecoilRoot} from 'recoil';
import React from 'react'
import MessageBox from '@/Components/MessageBox/MessageBox';

export default function HomeContainer() {
  return (
    <RecoilRoot>
        <div>
            <MessageBox>
                
            </MessageBox>
        </div>  
    </RecoilRoot>
    
  )
}

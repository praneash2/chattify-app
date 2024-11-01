import {  getCookie } from 'cookies-next';
export const isAuthenticated =()=>{

    const cookie=getCookie('userid');
    if(cookie){
        return true;
    }

    return false;   
}


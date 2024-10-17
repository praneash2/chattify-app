import { getCookie } from 'cookies-next';
import { atom } from 'recoil';


export const currentUserIdAtom = atom({
    key: 'currentUserIdAtom',
    default: getCookie('userid')
  });
  
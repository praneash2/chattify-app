import { atom } from 'recoil';


export const socketAtom = atom({
    key: 'socketAtom',
    default: new WebSocket('ws://localhost:5000'),
  });
  
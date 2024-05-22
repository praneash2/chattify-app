import { Router } from "express";
import { MessagesController } from "../controllers/MessagesContorller";
const messagesRouter=Router();
let messages=new MessagesController();
messagesRouter.get('/messages',messages.getAllMessages);
messagesRouter.post('/messages',messages.addMessage);

export {messagesRouter};

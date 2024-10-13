import { Router } from "express";
import { MessagesController } from "../controllers/MessagesController";

export const messagesRouter = Router();

const messagesController = new MessagesController();

messagesRouter.get('/',messagesController.getMessages);
messagesRouter.post('/',messagesController.addMessage);

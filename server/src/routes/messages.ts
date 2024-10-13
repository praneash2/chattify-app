import { Router } from "express";
import { MessagesController } from "../controllers/MessagesController";
import { validatorMiddleware } from "../middlewares/validatorMiddleware";
import { addMessageSchema, getAllMessagesSchema } from "../validators/message";

export const messagesRouter = Router();

const messagesController = new MessagesController();

messagesRouter.get('/',(req,res,next)=>{validatorMiddleware(res,getAllMessagesSchema,req?.query,next)},messagesController.getMessages);
messagesRouter.post('/',(req,res,next)=>{validatorMiddleware(res,addMessageSchema,req?.body,next)},messagesController.addMessage);

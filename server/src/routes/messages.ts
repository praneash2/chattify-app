import { Router } from "express";
import { MessagesController } from "../controllers/MessagesContorller";
import { validatorMiddleware } from "../middlewares/validatorMiddleware";
import { getMessageSchema, messageSchema } from "../validators/messages";
const messagesRouter = Router();
let messages = new MessagesController();
messagesRouter.get(
	"/messages",
	(req, res, next) => {
		validatorMiddleware(res, getMessageSchema, req.query, next);
	},
	messages.getAllMessages
);
messagesRouter.post(
	"/messages",
	(req, res, next) => {
		validatorMiddleware(res, getMessageSchema, req.query, next);
	},
	(req, res, next) => {
		validatorMiddleware(res, messageSchema, req.body, next);
	},
	messages.addMessage
);

export { messagesRouter };

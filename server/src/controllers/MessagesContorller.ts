import { MessageService } from "../services/MessagesService";
import {
	errorResponseObject,
	successResponseObject,
} from "../utils/responseObject";
import { messageSchema, messageSchemaInfer } from "../validators/messages";
type Message = {
	fromUserId: number;
	toUserId: number;
	message: object;
	currentGMTDate: string;
};

export class MessagesController {
	messageService: MessageService;
	constructor() {
		this.messageService = new MessageService();
		this.getAllMessages = this.getAllMessages.bind(this);
		this.addMessage = this.addMessage.bind(this);
		this.putMessage = this.putMessage.bind(this);
	}
	async getAllMessages(req: any, res: any) {
		try {
			const fromUserId: number = req.query.fromUserId;
			const toUserId: number = req.query.toUserId;
			let messgaesSent: Message[] = await this.messageService.getAllMessages(
				fromUserId,
				toUserId
			);
			let messagesReceived: Message[] =
				await this.messageService.getAllMessages(toUserId, fromUserId);
			let data: Object = { messgaesSent, messagesReceived };
			successResponseObject(res, data, 200, "get all messages successfully");
		} catch (e: any) {
			if (e.message === "user not exists") {
				errorResponseObject(res, e?.message, 404, "cannot get the messages");
				return;
			}
			errorResponseObject(res, e?.message, 500, "cannot get the messages");
		}
	}

	async addMessage(req: any, res: any) {
		try {
			const fromUserId: number = req.query.fromUserId;
			const toUserId: number = req.query.toUserId;
			const message: messageSchemaInfer = req?.body?.message;
			let data: Message | undefined = await this.messageService.addMessage(
				fromUserId,
				toUserId,
				message
			);
			successResponseObject(res, data, 200, "get all messages successfully");
		} catch (e: any) {
			if (e.message === "user not exists") {
				errorResponseObject(res, e?.message, 404, "cannot get the messages");
				return;
			}
			res.json({ error: JSON.parse(e.message) });
		}
	}
	putMessage(req: any, res: any) {}
}

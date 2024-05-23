"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesController = void 0;
const MessagesService_1 = require("../services/MessagesService");
const responseObject_1 = require("../utils/responseObject");
class MessagesController {
    constructor() {
        this.messageService = new MessagesService_1.MessageService();
        this.getAllMessages = this.getAllMessages.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.putMessage = this.putMessage.bind(this);
    }
    getAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fromUserId = req.query.fromUserId;
                const toUserId = req.query.toUserId;
                let messgaesSent = yield this.messageService.getAllMessages(fromUserId, toUserId);
                let messagesReceived = yield this.messageService.getAllMessages(toUserId, fromUserId);
                let data = { messgaesSent, messagesReceived };
                (0, responseObject_1.successResponseObject)(res, data, 200, "get all messages successfully");
            }
            catch (e) {
                if (e.message === "user not exists") {
                    (0, responseObject_1.errorResponseObject)(res, e === null || e === void 0 ? void 0 : e.message, 404, "cannot get the messages");
                    return;
                }
                (0, responseObject_1.errorResponseObject)(res, e === null || e === void 0 ? void 0 : e.message, 500, "cannot get the messages");
            }
        });
    }
    addMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const fromUserId = req.query.fromUserId;
                const toUserId = req.query.toUserId;
                const message = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.message;
                let data = yield this.messageService.addMessage(fromUserId, toUserId, message);
                (0, responseObject_1.successResponseObject)(res, data, 200, "get all messages successfully");
            }
            catch (e) {
                if (e.message === "user not exists") {
                    (0, responseObject_1.errorResponseObject)(res, e === null || e === void 0 ? void 0 : e.message, 404, "cannot get the messages");
                    return;
                }
                res.json({ error: JSON.parse(e.message) });
            }
        });
    }
    putMessage(req, res) { }
}
exports.MessagesController = MessagesController;

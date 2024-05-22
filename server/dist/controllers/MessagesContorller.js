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
class MessagesController {
    constructor() {
        this.messageService = new MessagesService_1.MessageService();
        this.getAllMessages = this.getAllMessages.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.putMessage = this.putMessage.bind(this);
    }
    getAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.query.userId;
            let data = yield this.messageService.getAllMessages(userId);
            res.json(data);
        });
    }
    addMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const fromUserId = req.query.fromUserId;
            const toUserId = req.query.toUserId;
            const message = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.message;
            let data = yield this.messageService.addMessage(fromUserId, toUserId, message);
            console.log(data);
            res.json(data);
        });
    }
    putMessage(req, res) {
    }
}
exports.MessagesController = MessagesController;

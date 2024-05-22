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
exports.MessageService = void 0;
const generalConstants_1 = require("../constants/generalConstants");
const MessagesRepository_1 = require("../repositories/MessagesRepository");
const hashFunction_1 = require("../utils/hashFunction");
class MessageService {
    constructor() {
        this.messagesRepository = new MessagesRepository_1.MessageRepository();
    }
    getAllMessages(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get all messages service is called");
            return yield this.messagesRepository.getAllMessages(userId);
        });
    }
    addMessage(fromUserId, toUserId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("add messages service is called");
            let currentGMTDate = new Date().toUTCString();
            const shardId = (0, hashFunction_1.hashFunction)(fromUserId, generalConstants_1.shardConstants.messagesShard);
            return yield this.messagesRepository.addMessage(fromUserId, toUserId, message, currentGMTDate, shardId);
        });
    }
}
exports.MessageService = MessageService;

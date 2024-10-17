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
exports.MessagesService = void 0;
const MessagesRepository_1 = require("../../repositories/MessagesRepository");
const UsersRepository_1 = require("../../repositories/UsersRepository");
class MessagesService {
    constructor() {
        this.getMessages = (fromUserId, toUserId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validUsers = yield this.validateFromAndToUser(fromUserId, toUserId);
                if (validUsers.result === "") {
                    const sentMessages = yield this.messagesRepository.getMessages(fromUserId, toUserId);
                    const receivedMessages = yield this.messagesRepository.getMessages(toUserId, fromUserId);
                    let messages = [...sentMessages, ...receivedMessages];
                    messages.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
                    return { messages: messages, result: "messages fetched successfully" };
                }
                return validUsers;
            }
            catch (error) {
                throw (error);
            }
        });
        this.addMessage = (message) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validUsers = yield this.validateFromAndToUser(message.from, message.to);
                if (validUsers.result === "") {
                    let data = yield this.messagesRepository.addMessage(message);
                    return { data, result: "message sent successfully" };
                }
                return validUsers;
            }
            catch (error) {
                throw (error);
            }
        });
        this.validateFromAndToUser = (fromUserId, toUserId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const fromUserExits = yield this.usersRepository.getUser(fromUserId);
                const toUserExists = yield this.usersRepository.getUser(toUserId);
                if (!fromUserExits) {
                    return { result: "from user not exists" };
                }
                if (!toUserExists) {
                    return { result: "to user not exits" };
                }
                return { result: "" };
            }
            catch (error) {
                throw (error);
            }
        });
        this.messagesRepository = new MessagesRepository_1.MessagesRepository();
        this.usersRepository = new UsersRepository_1.UsersRepository();
    }
}
exports.MessagesService = MessagesService;

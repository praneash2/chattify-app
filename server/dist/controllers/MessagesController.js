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
const responseObject_1 = require("../utils/responseObject");
const MessagesService_1 = require("../services/MessagesService/MessagesService");
class MessagesController {
    constructor() {
        this.getMessages = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const fromUserId = Number((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.fromUserId);
                const toUserId = Number((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.toUserId);
                const data = yield this.messagesService.getMessages(fromUserId, toUserId);
                if (data.result !== "messages fetched successfully") {
                    (0, responseObject_1.successResponseObject)(res, {}, 200, data.result);
                    return;
                }
                (0, responseObject_1.successResponseObject)(res, { data }, 200, data.result);
            }
            catch (error) {
                (0, responseObject_1.errorResponseObject)(res, error, 500, error.message);
            }
        });
        this.addMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const message = req === null || req === void 0 ? void 0 : req.body;
                let data = yield this.messagesService.addMessage(message);
                if (data.result !== "message sent successfully") {
                    (0, responseObject_1.successResponseObject)(res, { data }, 200, data.result);
                    return;
                }
                (0, responseObject_1.successResponseObject)(res, { data: data.data }, 200, "added the message successfully");
            }
            catch (error) {
                (0, responseObject_1.errorResponseObject)(res, error, 500, error.message);
            }
        });
        this.messagesService = new MessagesService_1.MessagesService();
    }
}
exports.MessagesController = MessagesController;

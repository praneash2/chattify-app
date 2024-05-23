"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesRouter = void 0;
const express_1 = require("express");
const MessagesContorller_1 = require("../controllers/MessagesContorller");
const validatorMiddleware_1 = require("../middlewares/validatorMiddleware");
const messages_1 = require("../validators/messages");
const messagesRouter = (0, express_1.Router)();
exports.messagesRouter = messagesRouter;
let messages = new MessagesContorller_1.MessagesController();
messagesRouter.get("/messages", (req, res, next) => {
    (0, validatorMiddleware_1.validatorMiddleware)(res, messages_1.getMessageSchema, req.query, next);
}, messages.getAllMessages);
messagesRouter.post("/messages", (req, res, next) => {
    (0, validatorMiddleware_1.validatorMiddleware)(res, messages_1.getMessageSchema, req.query, next);
}, (req, res, next) => {
    (0, validatorMiddleware_1.validatorMiddleware)(res, messages_1.messageSchema, req.body, next);
}, messages.addMessage);

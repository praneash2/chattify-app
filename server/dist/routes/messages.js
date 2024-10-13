"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesRouter = void 0;
const express_1 = require("express");
const MessagesController_1 = require("../controllers/MessagesController");
exports.messagesRouter = (0, express_1.Router)();
const messagesController = new MessagesController_1.MessagesController();
exports.messagesRouter.get('/', messagesController.getMessages);
exports.messagesRouter.post('/', messagesController.addMessage);

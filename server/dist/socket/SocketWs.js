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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketWs = void 0;
const ws_1 = require("ws");
const message_1 = require("../validators/message");
const redis_1 = require("redis");
const cookie_1 = __importDefault(require("cookie"));
var MessageType;
(function (MessageType) {
    MessageType["MESSAGE"] = "message";
    MessageType["STATUS"] = "status";
})(MessageType || (MessageType = {}));
class SocketWs {
    constructor(server) {
        this.server = server;
        this.onlineUsers = {};
        this.wss = new ws_1.WebSocketServer({ server });
        this.inMemory = (0, redis_1.createClient)();
        this.subscriber = this.inMemory.duplicate();
        this.publisher = this.inMemory.duplicate();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.subscriber.connect();
            yield this.publisher.connect();
            this.wss.on("connection", (ws, req) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const cookies = cookie_1.default.parse(req.headers.cookie || '');
                    console.log("cookie", cookies);
                    if (typeof cookies.userid === "string") {
                        // const onlineUser = { userId: , WebSocket: ws };
                        let userId = cookies.userid;
                        if (userId in this.onlineUsers) {
                            this.onlineUsers[userId].push(ws);
                        }
                        else {
                            this.onlineUsers[userId] = [ws];
                        }
                    }
                    //TODO: upgrade this with the jwt token and to remove the from user id
                    ws.on("message", (message) => {
                        var _a, _b;
                        const data = JSON.parse(message.toString());
                        const messageData = message_1.wsMessageSchema.safeParse(data);
                        const statusData = message_1.wsStatusSchema.safeParse(data);
                        // this is for the message data
                        if (messageData.success &&
                            messageData.data.type === MessageType.MESSAGE) {
                            this.publisher.publish(MessageType.MESSAGE, JSON.stringify(messageData.data));
                        }
                        else {
                            console.error("validation error", (_a = messageData === null || messageData === void 0 ? void 0 : messageData.error) === null || _a === void 0 ? void 0 : _a.format());
                        }
                        // This is for the status data
                        if (statusData.success &&
                            statusData.data.type === MessageType.STATUS) {
                            this.publisher.publish(MessageType.STATUS, JSON.stringify(statusData.data));
                        }
                        else {
                            console.error("validation error", (_b = messageData === null || messageData === void 0 ? void 0 : messageData.error) === null || _b === void 0 ? void 0 : _b.format());
                        }
                    });
                }
                catch (e) {
                    console.error(e);
                }
            }));
        });
    }
    initSubscriber() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.subscriber.subscribe(MessageType.MESSAGE, message => {
                let data = JSON.parse(message);
                const messageData = message_1.wsMessageSchema.safeParse(data);
                if (messageData.success) {
                    let socketInstances = this.onlineUsers[messageData.data.data.toUserId];
                    if (socketInstances && socketInstances.length >= 1) {
                        socketInstances.forEach((socketInstance) => {
                            socketInstance.send(`${message}`);
                        });
                    }
                }
            });
            yield this.subscriber.subscribe(MessageType.STATUS, message => {
                let data = JSON.parse(message);
                const statusData = message_1.wsStatusSchema.safeParse(data);
                if (statusData.success) {
                    const socketInstances = this.onlineUsers[statusData.data.data.userId];
                    const result = this.findOnlineUsers(Number(statusData.data.data.friendUserId));
                    if (socketInstances && socketInstances.length >= 1) {
                        socketInstances.forEach((socketInstance) => {
                            socketInstance.send(JSON.stringify({ onlineUserId: statusData.data.data.friendUserId, result }));
                        });
                    }
                }
            });
        });
    }
    findOnlineUsers(userId) {
        if (userId in this.onlineUsers) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.SocketWs = SocketWs;

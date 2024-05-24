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
exports.Socket = void 0;
const socket_io_1 = require("socket.io");
class Socket {
    constructor(onlineUsers, server, client) {
        this.onlineUsers = onlineUsers;
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: ["http://localhost:3000"],
            }
        });
        this.client = client;
    }
    initSocket() {
        this.io.on('connection', (socket) => {
            var _a;
            const userId = ((_a = socket.handshake.query) === null || _a === void 0 ? void 0 : _a.userId);
            socket.on("send-message", (message, room) => {
                console.log(message);
                socket.to(room).emit("send-message", message, room);
            });
            socket.on("join-group", (room) => {
                console.log("room", room);
                socket.join("a");
            });
            console.log(socket.id);
            socket.on("disconnect", () => {
                if (typeof userId === "string") {
                    this.removeOnlineUsers(userId, socket.id, this.client);
                    console.log(socket.id, "disconnected");
                }
            });
            socket.on("page-reload", () => {
                if (typeof userId === "string") {
                    this.removeOnlineUsers(userId, socket.id, this.client);
                    console.log(socket.id, "disconnected");
                }
            });
            if (typeof userId === "string") {
                this.setOnlineUsers(userId, socket.id, this.client);
            }
            console.log();
        });
    }
    sendMessage(toUserSocketId, message) {
        this.io.to(toUserSocketId).emit("send-message", message);
    }
    setOnlineUsers(userId, socketId, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let onlineUsers = yield client.hKeys('onlineUsers');
                if (onlineUsers.includes(userId)) {
                    let previousInstanceValueFromCache = yield client.hGet('onlineUsers', userId);
                    if (previousInstanceValueFromCache) {
                        let previousInstance = JSON.parse(previousInstanceValueFromCache);
                        if (previousInstance) {
                            previousInstance.push(socketId);
                            console.log(previousInstance, userId);
                            yield client.hSet('onlineUsers', userId, JSON.stringify(previousInstance));
                        }
                    }
                }
                else {
                    this.onlineUsers.set(userId, [socketId]);
                    yield client.hSet('onlineUsers', userId, JSON.stringify([socketId]));
                }
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
    getOnlineUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.hKeys('onlineUsers');
        });
    }
    getUserSocketIds(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let previousInstanceValueFromCache = yield this.client.hGet('onlineUsers', userId);
            if (previousInstanceValueFromCache) {
                let previousInstance = JSON.parse(previousInstanceValueFromCache);
                return previousInstance;
            }
        });
    }
    removeOnlineUsers(userId, socketId, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let onlineUsers = yield client.hKeys('onlineUsers');
                if (onlineUsers.includes(userId)) {
                    let previousInstanceValueFromCache = yield client.hGet('onlineUsers', userId);
                    if (previousInstanceValueFromCache) {
                        let previousInstance = JSON.parse(previousInstanceValueFromCache);
                        if (previousInstance.length > 1) {
                            let updatedInstance = previousInstance.filter((closedSocketId) => closedSocketId !== socketId);
                            yield client.hSet('onlineUsers', userId, JSON.stringify(updatedInstance));
                        }
                        else {
                            yield client.hDel('onlineUsers', userId);
                        }
                    }
                }
                this.onlineUsers.delete(userId);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
}
exports.Socket = Socket;

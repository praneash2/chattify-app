"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
class Socket {
    constructor(onlineUsers) {
        this.onlineUsers = onlineUsers;
    }
    sendMessage(toUserSocketId, message, socket) {
        console.log("ddddd", toUserSocketId, message, socket.id);
        socket.to(toUserSocketId).emit("send-message", message);
    }
    setOnlineUsers(userId, socket) {
        if (this.onlineUsers.has(userId)) {
            // console.log(this.onlineUsers.get(userId));
            let temp = this.onlineUsers.get(userId);
            temp === null || temp === void 0 ? void 0 : temp.push(socket);
            this.onlineUsers.set(userId, temp || [socket]);
        }
        else {
            this.onlineUsers.set(userId, [socket]);
        }
    }
    getOnlineUsers() {
        return this.onlineUsers;
    }
    removeOnlineUsers(userId) {
        this.onlineUsers.delete(userId);
    }
}
exports.Socket = Socket;

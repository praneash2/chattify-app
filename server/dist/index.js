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
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const cors_1 = __importDefault(require("cors"));
const SocketWs_js_1 = require("./socket/SocketWs.js");
const redis_1 = require("redis");
const friends_js_1 = require("./routes/friends.js");
const users_js_1 = require("./routes/users.js");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const server = (0, node_http_1.createServer)(app);
const client = (0, redis_1.createClient)();
client.on('error', err => console.log('Redis Client Error', err));
client.connect().then(() => {
    console.log("Redis client connected successfully");
}).catch((e) => {
    console.log(e);
});
app.use("/friends", friends_js_1.friendsRouter);
app.use("/users", users_js_1.usersRouter);
let onlineUsers = new Map(); // userId:socketId
const wsInstance = new SocketWs_js_1.SocketWs(server);
server.listen(5000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('server running at http://localhost:5000');
    wsInstance.init();
    wsInstance.initSubscriber();
}));

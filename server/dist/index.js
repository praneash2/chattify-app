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
const socket_io_1 = require("socket.io");
const messages_js_1 = require("./routes/messages.js");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
    }
});
app.use("/", messages_js_1.messagesRouter);
io.on('connection', (socket) => {
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
        console.log(socket.id); // undefined
    });
});
server.listen(5000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('server running at http://localhost:5000');
    //   console.log(await pool.query('CREATE TABLE Users (ID int NOT NULL PRIMARY KEY,UserId varchar(30),Password varchar(100))'))
}));

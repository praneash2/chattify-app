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
exports.MessageRepository = void 0;
const db_1 = __importDefault(require("../db/db"));
class MessageRepository {
    getAllMessages(fromUserId, toUserId, shardId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("get all messages repository is called");
                const tableName = 'MESSAGES' + shardId.toString();
                let messages = yield db_1.default.query(`SELECT * FROM ${tableName} WHERE fromuserid = $1 and touserid = $2`, [fromUserId, toUserId]);
                return messages === null || messages === void 0 ? void 0 : messages.rows;
            }
            catch (e) {
                const tableName = 'MESSAGES' + shardId.toString();
                if (e.message === `relation "${tableName.toLowerCase()}" does not exist`) {
                    yield db_1.default.query(`CREATE TABLE  ${tableName} (MessageID SERIAL NOT NULL PRIMARY KEY,FromUserId int references USERS(UserID),ToUserId int references USERS(UserID),messages varchar(255), createdAt varchar(40) )`);
                    new Error(e.message);
                }
                console.log(e.message);
                throw Error(e === null || e === void 0 ? void 0 : e.message);
            }
        });
    }
    addMessage(fromUserId, toUserId, message, currentGMTDate, shardId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("add messages repository is called", message, currentGMTDate);
                const tableName = 'MESSAGES' + shardId.toString();
                yield db_1.default.query(`INSERT INTO ${tableName} (fromuserid,touserid,messages,createdAt) VALUES ($1,$2,$3,$4)`, [fromUserId, toUserId, message, currentGMTDate]);
                return { fromUserId, toUserId, message, currentGMTDate };
            }
            catch (e) {
                const tableName = 'MESSAGES' + shardId.toString();
                if (e.message === `relation "${tableName.toLowerCase()}" does not exist`) {
                    yield db_1.default.query(`CREATE TABLE  ${tableName} (MessageID SERIAL NOT NULL PRIMARY KEY,FromUserId int references USERS(UserID),ToUserId int references USERS(UserID),messages varchar(255), createdAt varchar(40) )`);
                    new Error(e.message);
                }
                console.log(e.message);
            }
        });
    }
}
exports.MessageRepository = MessageRepository;

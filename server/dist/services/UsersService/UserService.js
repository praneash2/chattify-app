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
exports.UsersService = void 0;
const UsersRepository_1 = require("../../repositories/UsersRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UsersService {
    constructor() {
        this.getUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.usersRepository.getUser(userId);
                jsonwebtoken_1.default.sign({
                    data: userId
                }, 'secret', { expiresIn: '1h' });
                return data;
            }
            catch (error) {
                throw (error);
            }
        });
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                let userResultByEmail = yield this.usersRepository.getUserByEmail(user.email);
                if (userResultByEmail) {
                    return { result: "Already Exists" };
                }
                const data = yield this.usersRepository.createUser(user);
                return Object.assign(Object.assign({}, data), { result: "user created" });
            }
            catch (error) {
                throw (error);
            }
        });
        this.usersRepository = new UsersRepository_1.UsersRepository();
    }
}
exports.UsersService = UsersService;

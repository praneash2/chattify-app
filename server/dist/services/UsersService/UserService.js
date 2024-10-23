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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
class UsersService {
    constructor() {
        this.getUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.usersRepository.getUser(userId);
                const jwtToken = this.generateJwtToken(userId);
                return Object.assign(Object.assign({}, data), { jwtToken: jwtToken });
            }
            catch (error) {
                throw error;
            }
        });
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                let userResultByEmail = yield this.usersRepository.getUserByEmail(user.email);
                if (userResultByEmail) {
                    return { result: "Already Exists" };
                }
                const data = yield this.usersRepository.createUser(user);
                const jwtToken = this.generateJwtToken(data.id);
                return Object.assign(Object.assign({}, data), { result: "user created", jwtToken: jwtToken });
            }
            catch (error) {
                throw error;
            }
        });
        this.generateJwtToken = (userId) => {
            const jwtSecret = process.env.JWT_SECRET;
            if (jwtSecret) {
                const signedData = jsonwebtoken_1.default.sign({
                    data: userId,
                }, jwtSecret, { expiresIn: "15d" });
                return signedData;
            }
            else {
                throw "internal error";
            }
            // return "";
        };
        this.usersRepository = new UsersRepository_1.UsersRepository();
    }
}
exports.UsersService = UsersService;

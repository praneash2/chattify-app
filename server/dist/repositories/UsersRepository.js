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
exports.UsersRepository = void 0;
const client_1 = require("@prisma/client");
class UsersRepository {
    constructor() {
        this.getUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this.prisma.user.findUnique({
                    where: {
                        id: 1,
                    },
                });
                return userData;
            }
            catch (error) {
                throw (error);
            }
        });
        this.getUserByEmail = (userEmail) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this.prisma.user.findUnique({
                    where: {
                        email: userEmail,
                    },
                });
                return userData;
            }
            catch (error) {
                throw (error);
            }
        });
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                let userResult = yield this.prisma.user.create({
                    data: user
                });
                return userResult;
            }
            catch (error) {
                throw (error);
            }
        });
        this.prisma = new client_1.PrismaClient();
    }
}
exports.UsersRepository = UsersRepository;

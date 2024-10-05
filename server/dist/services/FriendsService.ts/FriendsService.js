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
exports.FriendsService = void 0;
const FriendsRepository_1 = require("../../repositories/FriendsRepository");
const UsersRepository_1 = require("../../repositories/UsersRepository");
class FriendsService {
    constructor() {
        this.getAllFriends = (req, res) => {
            this.friendRepository.getAllFriends();
            res.send("friends");
        };
        this.addFriend = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield this.usersRepository.getUser(data.userid);
                const friendExists = yield this.usersRepository.getUser(data.friendid);
                if (!(userExists && friendExists)) {
                    return { result: "user not exits" };
                }
                let friendResult = yield this.friendRepository.addFriend(data);
                return Object.assign(Object.assign({}, friendResult), { result: "friend added" });
            }
            catch (error) {
                throw (error);
            }
        });
        this.friendRepository = new FriendsRepository_1.FriendsRepository();
        this.usersRepository = new UsersRepository_1.UsersRepository();
    }
}
exports.FriendsService = FriendsService;

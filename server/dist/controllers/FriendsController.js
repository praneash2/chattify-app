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
exports.FriendsController = void 0;
const FriendsService_1 = require("../services/FriendsService.ts/FriendsService");
class FriendsController {
    constructor() {
        this.getAllFriends = (req, res) => {
            res.send("friends");
        };
        this.addFriend = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const friend = req === null || req === void 0 ? void 0 : req.body;
                yield this.friendsService.addFriend(friend);
            }
            catch (e) {
                console.error(e);
            }
        });
        this.friendsService = new FriendsService_1.FriendsService();
    }
}
exports.FriendsController = FriendsController;

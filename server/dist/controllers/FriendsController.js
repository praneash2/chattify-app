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
const responseObject_1 = require("../utils/responseObject");
class FriendsController {
    constructor() {
        this.getAllFriends = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let userid = Number((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.userid);
                let data = yield this.friendsService.getAllFriends(userid);
                (0, responseObject_1.successResponseObject)(res, data, 200, "friends fetched successfully");
            }
            catch (error) {
                (0, responseObject_1.errorResponseObject)(res, error, 500, error.message);
            }
        });
        this.addFriend = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.friendsService.addFriend(req === null || req === void 0 ? void 0 : req.body);
                (0, responseObject_1.successResponseObject)(res, data, 200, data.result);
            }
            catch (err) {
                (0, responseObject_1.errorResponseObject)(res, err, 500, err.message);
            }
        });
        this.friendsService = new FriendsService_1.FriendsService();
    }
}
exports.FriendsController = FriendsController;

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
exports.FriendsRepository = void 0;
const client_1 = require("@prisma/client");
class FriendsRepository {
    constructor() {
        this.getAllFriends = (userid) => __awaiter(this, void 0, void 0, function* () {
            try {
                const friendsResult = yield this.prisma.friend.findMany({
                    where: {
                        userid: userid,
                    },
                    select: {
                        userid: true,
                        friendid: true,
                        frienduser: {
                            select: {
                                name: true,
                            },
                        },
                    },
                });
                return friendsResult.map(({ userid, friendid, frienduser }) => ({
                    userId: userid,
                    friendId: friendid,
                    friendName: frienduser.name,
                }));
            }
            catch (error) {
                throw error;
            }
        });
        this.getAlreadyExistingFriend = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const friendResult = yield this.prisma.friend.findFirst({
                    where: {
                        userid: data.userid,
                        friendid: data.friendid,
                    },
                });
                return friendResult;
            }
            catch (error) {
                throw error;
            }
        });
        this.addFriend = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const friendResult = yield this.prisma.friend.create({
                    data: {
                        userid: data.userid,
                        friendid: data.friendid,
                    },
                });
                return friendResult;
            }
            catch (err) {
                throw err;
            }
        });
        this.prisma = new client_1.PrismaClient();
    }
}
exports.FriendsRepository = FriendsRepository;

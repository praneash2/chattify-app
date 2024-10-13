"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFriendSchema = exports.getAllFriendsSchema = void 0;
const zod_1 = require("zod");
exports.getAllFriendsSchema = zod_1.z.object({
    userid: zod_1.z.string().regex(/^[0-9]+$/, { message: 'Please enter valid  user id ' }).min(1, { message: "user id must have minimum lenght of 1" })
});
exports.addFriendSchema = zod_1.z.object({
    userid: zod_1.z.number().min(1, { message: "user id must have minimum lenght of 1" }),
    friendid: zod_1.z.number().min(1, { message: "friend id must have minimum lenght of 1" })
});

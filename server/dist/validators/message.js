"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessageSchema = exports.getAllMessagesSchema = exports.wsStatusSchema = exports.wsMessageSchema = void 0;
const zod_1 = require("zod");
exports.wsMessageSchema = zod_1.z.object({
    type: zod_1.z.string(),
    data: zod_1.z.object({
        message: zod_1.z.string(),
        toUserId: zod_1.z.string().regex(/^[0-9]+$/, { message: 'Please enter valid  user id ' }).min(1, { message: "user id must have minimum lenght of 1" }),
        fromUserId: zod_1.z.string().regex(/^[0-9]+$/, { message: 'Please enter valid  user id ' }).min(1, { message: "user id must have minimum lenght of 1" }),
    })
});
exports.wsStatusSchema = zod_1.z.object({
    type: zod_1.z.string(),
    data: zod_1.z.object({
        userId: zod_1.z.string().regex(/^[0-9]+$/, { message: 'Please enter valid  user id ' }).min(1, { message: "user id must have minimum lenght of 1" }),
        friendUserId: zod_1.z.string().regex(/^[0-9]+$/, { message: 'Please enter valid  user id ' }).min(1, { message: "user id must have minimum lenght of 1" })
    })
});
exports.getAllMessagesSchema = zod_1.z.object({
    fromUserId: zod_1.z.string().regex(/^[0-9]+$/, { message: 'Please enter valid from user id ' }).min(1, { message: "from user id must have minimum lenght of 1" }),
    toUserId: zod_1.z.string().regex(/^[0-9]+$/, { message: 'Please enter valid to user id ' }).min(1, { message: "to user id must have minimum lenght of 1" })
});
exports.addMessageSchema = zod_1.z.object({
    from: zod_1.z.number().min(1, { message: "from user id  must have minimum lenght of 1" }),
    to: zod_1.z.number().min(1, { message: "to user id  must have minimum lenght of 1" }),
    message: zod_1.z.string().min(1, { message: "message  must have minimum lenght of 1" })
});

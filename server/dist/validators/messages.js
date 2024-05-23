"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageSchema = exports.messageSchema = void 0;
const zod_1 = require("zod");
exports.messageSchema = zod_1.z.object({
    message: zod_1.z.string().min(1, { message: "String must have at least 1 character" }).max(255, { message: "String must have at most 255 characters" }).nonempty({ message: "String cannot be empty" })
});
exports.getMessageSchema = zod_1.z.object({
    fromUserId: zod_1.z.string().refine((val) => /^\d+$/.test(val), 'Invalid fromUserId'),
    toUserId: zod_1.z.string().refine((val) => /^\d+$/.test(val), 'Invalid toUserId'),
});

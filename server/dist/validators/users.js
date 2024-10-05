"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersSchema = exports.addUsersSchema = void 0;
const zod_1 = require("zod");
exports.addUsersSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.getUsersSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, { message: "Input must have at least 1 character" }).max(255, { message: "Input must have at most 255 characters" })
});

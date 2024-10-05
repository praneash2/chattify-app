"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersSchema = exports.addUsersSchema = void 0;
const zod_1 = require("zod");
exports.addUsersSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, { message: "name must have at least 1 character" }).max(30, { message: "name must be within 30 characters" }),
    email: zod_1.z.string().email("This is not a valid email"),
    password: zod_1.z.string().min(8, { message: "password must have at least 1 character" }).max(30, { message: "password must be within 30 characters" })
});
exports.getUsersSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, { message: "Input must have at least 1 character" })
});

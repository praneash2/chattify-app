"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsMessageSchema = void 0;
const zod_1 = require("zod");
exports.wsMessageSchema = zod_1.z.object({
    type: zod_1.z.string(),
    data: zod_1.z.object({
        message: zod_1.z.string(),
        toUserId: zod_1.z.string()
    })
});

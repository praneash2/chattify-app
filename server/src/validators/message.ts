import {z} from "zod";

export const wsMessageSchema=z.object({
    type:z.string(),
    data:z.object({
        message:z.string(),
        toUserId:z.string()
    })
});
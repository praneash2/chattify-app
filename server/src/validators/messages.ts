import {z} from "zod";
export const messageSchema=z.object({
    message:z.string().min(1, { message: "String must have at least 1 character" }).max(255, { message: "String must have at most 255 characters" }).nonempty({ message: "String cannot be empty" })
});

export type messageSchemaInfer=z.infer<typeof messageSchema>;

export const getMessageSchema=z.object({
    fromUserId: z.string().refine((val) => /^\d+$/.test(val), 'Invalid fromUserId'),
    toUserId: z.string().refine((val) => /^\d+$/.test(val), 'Invalid toUserId'),
})
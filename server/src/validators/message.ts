import {number, z} from "zod";

export const wsMessageSchema=z.object({
    type:z.string(),
    data:z.object({
        message:z.string(),
        toUserId:z.string().regex(/^[0-9]+$/,{message: 'Please enter valid  user id '}).min(1,{message:"user id must have minimum lenght of 1"}),
        fromUserId:z.string().regex(/^[0-9]+$/,{message: 'Please enter valid  user id '}).min(1,{message:"user id must have minimum lenght of 1"}),
    })
});

export const wsStatusSchema=z.object({
    type:z.string(),
    data:z.object({
        userId:z.string().regex(/^[0-9]+$/,{message: 'Please enter valid  user id '}).min(1,{message:"user id must have minimum lenght of 1"}),
        friendUserId:z.string().regex(/^[0-9]+$/,{message: 'Please enter valid  user id '}).min(1,{message:"user id must have minimum lenght of 1"})
    })
});

export const getAllMessagesSchema=z.object({
    fromUserId:z.string().regex(/^[0-9]+$/,{message: 'Please enter valid from user id '}).min(1,{message:"from user id must have minimum lenght of 1"}),
    toUserId:z.string().regex(/^[0-9]+$/,{message: 'Please enter valid to user id '}).min(1,{message:"to user id must have minimum lenght of 1"})
})

export const addMessageSchema=z.object({
    from:z.number().min(1,{message:"from user id  must have minimum lenght of 1"}),
    to:z.number().min(1,{message:"to user id  must have minimum lenght of 1"}),
    message:z.string().min(1,{message:"message  must have minimum lenght of 1"})
});
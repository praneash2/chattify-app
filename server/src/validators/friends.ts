import {z} from "zod";

export const getAllFriendsSchema=z.object({
    userid:z.string().regex(/^[0-9]+$/,{message: 'Please enter valid  user id '}).min(1,{message:"user id must have minimum lenght of 1"})
})

export const addFriendSchema=z.object({
   userid:z.number().min(1,{message:"user id must have minimum lenght of 1"}),
   friendid:z.number().min(1,{message:"friend id must have minimum lenght of 1"})
})
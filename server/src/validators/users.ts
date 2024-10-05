import {z} from "zod";

export const addUsersSchema=z.object({
    name:z.string().min(8,{ message: "name must have at least 1 character" }).max(30,{message:"name must be within 30 characters"}),
    email:z.string().email("This is not a valid email"),
    password:z.string().min(8,{ message: "password must have at least 1 character" }).max(30,{message:"password must be within 30 characters"})
})

export const getUsersSchema=z.object({
    userId:z.string().min(1, { message: "Input must have at least 1 character" })
});

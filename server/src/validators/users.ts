import {z} from "zod";

export const addUsersSchema=z.object({
    name:z.string(),
    email:z.string(),
    password:z.string()
})

export const getUsersSchema=z.object({
    userId:z.string().min(1, { message: "Input must have at least 1 character" }).max(255, { message: "Input must have at most 255 characters" })
});

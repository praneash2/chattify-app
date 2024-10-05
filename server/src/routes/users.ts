import express from 'express';
import { UsersController } from '../controllers/UsersController';
import { validatorMiddleware } from '../middlewares/validatorMiddleware';
import { addUsersSchema, getUsersSchema } from '../validators/users';

export const usersRouter = express.Router();

const usersController = new UsersController();

usersRouter.get('/', (req,res,next)=>{validatorMiddleware(res,getUsersSchema,req?.query,next)},usersController.getUsers);
usersRouter.post('/',(req,res,next)=>{validatorMiddleware(res,addUsersSchema,req?.body,next)}, usersController.createUser);

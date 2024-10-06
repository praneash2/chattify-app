import express from 'express';
import { FriendsController } from '../controllers/FriendsController';
import { validatorMiddleware } from '../middlewares/validatorMiddleware';
import { addFriendSchema, getAllFriendsSchema } from '../validators/friends';

export const friendsRouter = express.Router();

const friendsController = new FriendsController();

friendsRouter.get('/', (req,res,next)=>{validatorMiddleware(res,getAllFriendsSchema,req?.query,next)},friendsController.getAllFriends);
friendsRouter.post('/', (req,res,next)=>{validatorMiddleware(res,addFriendSchema,req?.body,next)},friendsController.addFriend);
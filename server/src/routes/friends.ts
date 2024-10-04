import express from 'express';
import { FriendsController } from '../controllers/FriendsController';

export const friendsRouter = express.Router();

const friendsController = new FriendsController();

friendsRouter.get('/', friendsController.getAllFriends);
friendsRouter.post('/', friendsController.addFriend);
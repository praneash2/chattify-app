import express from 'express';
import { UsersController } from '../controllers/UsersController';

export const usersRouter = express.Router();

const usersController = new UsersController();

usersRouter.get('/', usersController.getUsers);
usersRouter.post('/', usersController.createUser);
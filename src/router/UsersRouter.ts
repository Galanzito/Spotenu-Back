import express from 'express';
import { UsersController } from '../controller/UsersController';

export const usersRouter = express.Router();

usersRouter.post('/signup', new UsersController().signUp);
usersRouter.post('/login', new UsersController().login);
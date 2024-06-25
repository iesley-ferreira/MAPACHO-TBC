import { Router } from 'express';
import loginController from '../controllers/login.controller';
import userController from '../controllers/user.controller';
import userMiddlewares from '../middlewares/user.middleware';

const userRouter = Router();

userRouter.route('/login').post(loginController.signIn);
userRouter.route('/signUp').post(userMiddlewares.validateSignUp, userController.signUp);

export default userRouter;

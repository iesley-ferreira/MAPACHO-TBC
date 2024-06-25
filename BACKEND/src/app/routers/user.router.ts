import { Router } from 'express';
import loginController from '../controllers/login.controller';
import userController from '../controllers/user.controller';

const userRouter = Router();

userRouter.route('/login').post(loginController.signIn);
userRouter.route('/signUp').post(userController.signUp);

export default userRouter;

import { Router } from 'express';
import authController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.route('/signUp').post(authController.signUp);
authRouter.route('/verifyAuthCode').post(authController.verifyAuthCode);

export default authRouter;

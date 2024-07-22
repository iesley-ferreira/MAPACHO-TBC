import express from 'express';
import passwordController from '../controllers/password.controller';

const passwordRouter = express.Router();

passwordRouter.route('/request/:email').post(passwordController.requestPasswordReset);
passwordRouter.route('/:token').post(passwordController.resetPassword);

export default passwordRouter;

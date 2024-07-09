import express from 'express';
import { check } from 'express-validator';
import passwordController from '../controllers/password.controller';
import validatePassword from '../middlewares/password.middleware';

const passwordRouter = express.Router();

passwordRouter.route('/request/:email').post(passwordController.requestPasswordReset);

// passwordRouter.post(
//   '/:token',
//   [
//     check('password', 'A senha é obrigatória').exists(),
//     check('password', 'A senha deve ter pelo menos 6 caracteres').isLength({ min: 6 }),
//   ],
//   validatePassword,
//   passwordController.resetPassword,
// );

export default passwordRouter;

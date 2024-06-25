import { Request, Response } from 'express';
import jwtProvider from '../../providers/jwt.provider';
import { UserLoginType } from '../../types/User.type';
import loginService from '../services/login.service';

const signIn = async (req: Request, res: Response) => {
  const { email, password }: UserLoginType = req.body;

  const result = await loginService.signIn(email, password);

  if (result.status !== 200) {
    return res.status(200).json({
      data: {
        message: 'Usuário ou senha inválidos',
        user: result.data.user,
      },
    });
  }

  const token = jwtProvider.sign(result.data);
  return res.status(200).json({
    data: {
      message: result.data.message,
      token,
      user: result.data,
    },
  });
};

const loginController = { signIn };

export default loginController;

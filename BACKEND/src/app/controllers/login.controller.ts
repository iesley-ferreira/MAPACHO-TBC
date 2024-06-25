import { Request, Response } from 'express';
import jwtProvider from '../../providers/jwt.provider';
import { UserLoginType } from '../../types/User.type';
import loginService from '../services/login.service';

const signIn = async (req: Request, res: Response) => {
  const { email, password }: UserLoginType = req.body;

  const result = await loginService.signIn(email, password);
  console.log('result', result);

  if (result.status !== 200) {
    return res.status(401).json({
      data: {
        message: 'Usuário ou senha inválidos',
      },
    });
  }

  const token = jwtProvider.sign(result.data);
  return res.status(200).json({
    data: {
      message: 'Usuário logado com sucesso',
      token,
      user: result.data,
    },
  });
};

const loginController = { signIn };

export default loginController;

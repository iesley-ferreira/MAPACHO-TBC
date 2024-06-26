import { Request, Response } from 'express';
import jwtProvider from '../../providers/jwt.provider';
import { UserLoginType } from '../../types/User.type';
import loginService from '../services/login.service';

const signIn = async (req: Request, res: Response) => {
  const { email, password }: UserLoginType = req.body;

  const result = await loginService.signIn(email, password);

  if (result.status !== 200) {
    console.log('RESULT !==200', result);

    return res.status(result.status).json({
      result,
    });
  }

  const token = jwtProvider.sign(result.data);
  return res.status(200).json({
    data: {
      token,
      user: result.data.user,
      message: result.data.message,
    },
    status: 200,
  });
};

const loginController = { signIn };

export default loginController;

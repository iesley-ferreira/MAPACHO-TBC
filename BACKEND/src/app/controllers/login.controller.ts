import { Request, Response } from 'express';
import jwtProvider from '../../providers/jwt.provider';
import { UserLoginType } from '../../types/User.type';
import loginService from '../services/login.service';

const signIn = async (req: Request, res: Response) => {
  const { email, password }: UserLoginType = req.body;

  const result = await loginService.signIn(email, password);

  if (result.status !== 200) {
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

const googleSignIn = async (req: Request, res: Response) => {
  const { email, name, img_profile, google_id } = req.body;

  const result = await loginService.googleSignIn({ email, name, img_profile, google_id });

  // if (result.status !== 200) {
  //   return res.status(result.status).json({
  //     data: {
  //       token,
  //       user: result.data.user,
  //       message: result.data.message,
  //     },
  //     status: 200,
  //   });
  // }

  return res.status(200).json({
    data: {
      token: result.data.token,
      user: result.data.user,
      message: result.data.message,
      status: result.status,
    },
    status: 200,
  });
};

const loginController = { signIn, googleSignIn };

export default loginController;

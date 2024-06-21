import { Request, Response } from 'express';
import { UserInputType } from '../../types/User.type';
import authService from '../services/authCode.service';

const signUp = async (req: Request, res: Response) => {
  const { email, name, password, google_id }: UserInputType = req.body;

  const { data, status } = await authService.signUp({ email, name, password, google_id });
  return res.status(status).json(data);
};

const verifyAuthCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  const result = await authService.verifyAuthCode(email, code);

  return res.status(result.status).json(result.data);
};

export default {
  signUp,
  verifyAuthCode,
};

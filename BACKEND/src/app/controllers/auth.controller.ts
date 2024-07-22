import { Request, Response } from 'express';
import authService from '../services/authCode.service';

const verifyAuthCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  const { data, status } = await authService.verifyAuthCode(email, code);
  return res.status(status).json(data);
};

const authController = {
  verifyAuthCode,
};

export default authController;

import { Request, Response } from 'express';
import authService from '../services/authCode.service';

const verifyAuthCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  console.log('email&codeCONTROLLER', email, code);

  const { data, status } = await authService.verifyAuthCode(email, code);
  console.log('resultCONTROLLER', data);

  return res.status(status).json(data);
};

const authController = {
  verifyAuthCode,
};

export default authController;

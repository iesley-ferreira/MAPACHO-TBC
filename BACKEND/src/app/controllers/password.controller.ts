import { Request, Response } from 'express';
import passwordService from '../services/password.service';

const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const result = await passwordService.requestPasswordReset(email);
    res.status(result.status).json(result.data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || typeof token !== 'string') {
    return res.status(400).send('Token é obrigatório');
  }

  try {
    const result = await passwordService.resetPassword(token, newPassword);
    res.status(result.status).json(result.data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

export default {
  requestPasswordReset,
  resetPassword,
};

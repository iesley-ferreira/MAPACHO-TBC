import passwordService from '../services/password.service';
import { Request, Response } from 'express';

const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.params;

  console.log('Password controller: ', email);

  try {
    const result = await passwordService.requestPasswordReset(email);

    console.log('Password controller result: ', result);

    res.status(result.status).json(result.data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

export default {
  requestPasswordReset,
};

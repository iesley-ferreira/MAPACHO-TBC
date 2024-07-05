import { validationResult } from 'express-validator';
import passwordService from '../services/password.service';
import { Request, Response } from 'express';
// import userService from '../services/user.service';

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

// const resetPassword = async (req: Request, res: Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const result = await passwordService.resetPassword(token, password);
//     res.status(result.status).json(result.data);
//   } catch (err: any) {
//     console.error(err.message);
//     res.status(500).send('Erro no servidor');
//   }
// };

export default {
  requestPasswordReset,
  // resetPassword,
};

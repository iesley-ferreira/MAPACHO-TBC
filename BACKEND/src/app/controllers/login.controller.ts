import { Request, Response } from 'express';
import { UserInputType } from '../../types/User.type';
import loginService from '../services/login.service';

const singUp = async (req: Request, res: Response) => {
  const { email, fullName, password, codeAccount }: UserInputType = req.body;

  const { data, status } = await loginService.singUp({ email, fullName, password, codeAccount });

  return res.status(status).json(data);
}


const loginController = {
  singUp,
}

export default loginController;

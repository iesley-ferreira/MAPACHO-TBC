import { Request, Response } from 'express';
import { UserInputType } from '../../types/User.type';
import userService from '../services/user.service';

const signUp = async (req: Request, res: Response) => {
  const { email, name, password, google_id }: UserInputType = req.body;

  const { data, status } = await userService.signUp({ email, name, password, google_id });
  return res.status(status).json(data);
};

const userController = {
  signUp,
};

export default userController;

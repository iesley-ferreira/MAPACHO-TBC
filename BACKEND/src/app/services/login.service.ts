import { ReturnServiceType } from '../../types/ReturnService.type';
import loginModel from '../models/login.model';

const signIn = async (email: string, password: string): Promise<ReturnServiceType> => {
  if (!email || !password) {
    return {
      data: {
        message: 'Email e senha são obrigatórios',
      },
      status: 400,
    };
  }

  const user = await loginModel.signIn.emailAndPassword(email, password);

  if (!user) {
    return {
      data: {
        message: 'Usuário ou senha inválidos',
      },
      status: 400,
    };
  }

  return {
    data: user,
    status: 200,
  };
};

const loginService = { signIn };

export default loginService;

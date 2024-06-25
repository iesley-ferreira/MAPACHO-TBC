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
  console.log('USER', user);

  if (!user) {
    return {
      data: {
        message: 'Usuário ou senha inválidos',
      },
      status: 400,
    };
  }

  if (user.isPending) {
    return {
      data: {
        message: 'Usuário não autenticado. Verifique seu email para completar o cadastro',
        user,
      },
      status: 401,
    };
  }

  return {
    data: user,
    status: 200,
  };
};

const loginService = { signIn };

export default loginService;

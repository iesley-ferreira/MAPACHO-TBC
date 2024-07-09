import jwtProvider from '../../providers/jwt.provider';
import authCodeModel from '../models/authCode.model';
import userModel from '../models/user.model';

const verifyAuthCode = async (email: string, code: string) => {
  const user = await userModel.findUserByEmail(email);
  console.log('user verifyAuthCodeSERVICE', user);

  if (!user) {
    return {
      data: {
        message: 'Usuário não encontrado',
      },
      status: 400,
    };
  }

  const authCode = await authCodeModel.findAuthCodeByUserId(user.id);

  if (authCode?.code !== code) {
    return {
      data: {
        message: 'Código de autenticação inválido',
      },
      status: 400,
    };
  }

  await userModel.updateUserStatus(user.id, false);

  const userWithOrders = { orders: [], ...user };

  const token = jwtProvider.sign(userWithOrders);

  return {
    data: {
      token,
    },
    status: 200,
  };
};

export default {
  verifyAuthCode,
};

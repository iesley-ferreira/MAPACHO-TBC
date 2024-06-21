import jwtProvider from '../../providers/jwt.provider';
import nodemailerProvider from '../../providers/nodemailer.provider';
import { UserInputType } from '../../types/User.type';
import { generateAuthCode } from '../../utils/generateAuthCode';
import authCodeModel from '../models/authCode.model';
import userModel from '../models/user.model';

const signUp = async ({ email, name, password, google_id }: UserInputType) => {
  const existingUser = await userModel.findUserByEmail(email);
  if (existingUser) {
    return {
      data: {
        message: 'Email já cadastrado',
      },
      status: 400,
    };
  }

  const newUser = await userModel.createUser({ email, name, password, google_id });

  const code = generateAuthCode();

  await authCodeModel.createAuthCode({ code, user_id: newUser.id });

  nodemailerProvider.sendAuthCode(email, code);

  return {
    data: {
      message:
        'Usuário cadastrado com sucesso. Verifique seu email para autenticar sua conta',
    },
    status: 201,
  };
};

const verifyAuthCode = async (email: string, code: string) => {
  const user = await userModel.findUserByEmail(email);
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
  const token = jwtProvider.sign(user);

  return {
    data: {
      token,
    },
    status: 200,
  };
};

export default {
  signUp,
  verifyAuthCode,
};

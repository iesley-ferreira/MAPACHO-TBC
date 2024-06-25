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

  const newUser = await userModel.createUser({
    email,
    name,
    password,
    google_id,
  });

  const code = generateAuthCode();

  await authCodeModel.createAuthCode({ code, user_id: newUser.id });

  nodemailerProvider.sendAuthCode(email, code);

  return {
    data: {
      message:
        'Usuário cadastrado com sucesso. Verifique seu email para autenticar sua conta',
      user: {
        id: newUser.id,
        name,
        email,
        created_at: newUser.created_at,
      },
    },
    status: 201,
  };
};

export default {
  signUp,
};

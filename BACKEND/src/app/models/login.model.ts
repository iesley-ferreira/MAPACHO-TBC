import prisma from '../../providers/prisma.provider';
import { UserInputType } from '../../types/User.type';

const singUp = async ({ email, fullName, password, codeAccount }: UserInputType) =>
  prisma.users.create({
    data: {
      email,
      fullName,
      password,
      codeAccount,
    },
  });

const singIn = {
  credentialsGoogleAccount: (email: string, codeAccount: string) =>
    prisma.users.findFirst({
      where: {
        email,
        codeAccount,
      },
    }),
  emailAndPassword: (email: string, password: string) =>
    prisma.users.findFirst({
      where: {
        email,
        password,
      },
    }),
};

const loginModel = {
  singIn,
  singUp,
};

export default loginModel;

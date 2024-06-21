import prisma from '../../providers/prisma.provider';
import { UserInputType } from '../../types/User.type';

const existingUser = async (email: string) =>
  prisma.user.findUnique({ where: { email } });

const signUp = async ({ email, name, password, google_id }: UserInputType) => {
  return prisma.user.create({
    data: {
      email,
      name,
      password,
      google_id,
    },
  });
};

const signIn = {
  credentialsGoogleAccount: (email: string, google_id: string) =>
    prisma.user.findFirst({
      where: {
        email,
        google_id,
      },
    }),

  emailAndPassword: (email: string, password: string) =>
    prisma.user.findFirst({
      where: {
        email,
        password,
      },
    }),
};

const loginModel = {
  signIn,
  signUp,
  existingUser,
};

export default loginModel;

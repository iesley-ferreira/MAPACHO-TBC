import bcrypt from 'bcryptjs';
import prisma from '../../providers/prisma.provider';
import { UserInputType } from '../../types/User.type';

const createUser = async ({ email, name, password, google_id }: UserInputType) => {
  const SALT_ROUNDS = 10;
  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
  return prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      google_id,
    },
  });
};

const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  console.log('user findUserByEmailSERVICE', user);
  return user;
};

const updateUserStatus = async (userId: string, isPending: boolean) => {
  return prisma.user.update({
    where: { id: userId },
    data: { isPending },
  });
};

export default {
  createUser,
  findUserByEmail,
  updateUserStatus,
};

import prisma from '../../providers/prisma.provider';
import { UserInputType } from '../../types/User.type';

const createUser = async ({ email, name, password, google_id }: UserInputType) => {
  return prisma.user.create({
    data: {
      email,
      name,
      password,
      google_id,
    },
  });
};

const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
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
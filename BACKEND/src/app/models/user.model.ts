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
  const user = await prisma.user.findUnique({ where: { email } });

  console.log('findUserByEmail: ', user?.email);

  return user;
};

const updateUserStatus = async (userId: string, isPending: boolean) => {
  return prisma.user.update({
    where: { id: userId },
    data: { isPending },
  });
};

const findUserByResetToken = async (resetPasswordToken: any) => {
  return await prisma.user.findFirst({
    where: {
      resetPasswordToken,
      resetPasswordExpires: { gt: new Date() },
    },
  });
};

const updateResetPasswordFields = async (
  userId: any,
  resetToken: any,
  resetPasswordExpires: any,
) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      resetPasswordToken: resetToken,
      resetPasswordExpires,
    },
  });
};

const updateUser = async (
  userId: string,
  data: {
    password?: string;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: Date | null;
  },
) => {
  return await prisma.user.update({
    where: { id: userId },
    data,
  });
};

const getOrdersByUser = async (userId: string) => {
  return prisma.order.findMany({
    where: {
      user_id: userId,
    },
  });
};

export default {
  createUser,
  findUserByEmail,
  updateUserStatus,
  findUserByResetToken,
  updateResetPasswordFields,
  updateUser,
  getOrdersByUser,
};

import prisma from '../../providers/prisma.provider';

const createNewUserResetPassword = async (
  userId: string,
  resetToken: string,
  resetPasswordExpires: Date,
) => {
  return await prisma.password.create({
    data: {
      user_id: userId,
      resetPasswordToken: resetToken,
      resetPasswordExpires,
    },
  });
};

const deleteUserResetPassword = async (userId: string) => {
  return await prisma.password.delete({
    where: {
      user_id: userId,
    },
  });
};

export default {
  createNewUserResetPassword,
  deleteUserResetPassword,
};

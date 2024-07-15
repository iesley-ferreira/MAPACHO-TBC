import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import userModel from '../models/user.model';
import nodemailerProvider from '../../providers/nodemailer.provider';
import passwordModel from '../models/password.model';

const requestPasswordReset = async (email: string) => {
  const user = await userModel.findUserByEmail(email);

  if (!user) {
    return {
      data: { message: 'Usuário não encontrado' },
      status: 404,
    };
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  const resetPasswordExpires = new Date(Date.now() + 3600000);

  await passwordModel.createNewUserResetPassword(
    user.id,
    resetToken,
    resetPasswordExpires,
  );

  await nodemailerProvider.sendResetPasswordEmail(email, resetToken);

  return {
    data: { message: 'Email de redefinição de senha enviado' },
    status: 200,
  };
};

const resetPassword = async (token: string, newPassword: string) => {
  const user = await userModel.findUserByResetToken(token);

  if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
    return {
      data: { message: 'Token inválido ou expirado' },
      status: 400,
    };
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  const updatePasswordSuccess = await userModel.updateUser(user.user_id, hashedPassword);
  if (updatePasswordSuccess) {
    await passwordModel.deleteUserResetPassword(user.user_id);
  }

  return {
    data: { message: 'Senha redefinida com sucesso' },
    status: 200,
  };
};

export default {
  requestPasswordReset,
  resetPassword,
};

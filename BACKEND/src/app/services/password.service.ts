import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import userModel from '../models/user.model';
import nodemailerProvider from '../../providers/nodemailer.provider';

const requestPasswordReset = async (email: string) => {
  const user = await userModel.findUserByEmail(email);

  console.log('Password service: ', user);

  if (!user) {
    return {
      data: { message: 'Usuário não encontrado' },
      status: 404,
    };
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

  await userModel.updateResetPasswordFields(user.id, resetToken, resetPasswordExpires);

  console.log('Password service resetToken: ', resetToken);

  await nodemailerProvider.sendResetPasswordEmail(email, resetToken);

  return {
    data: { message: 'Email de redefinição de senha enviado' },
    status: 200,
  };
};

const resetPassword = async (token: string, newPassword: string) => {
  const user = await userModel.findUserByResetToken(token);
  if (!user) {
    return {
      data: { message: 'Token inválido ou expirado' },
      status: 400,
    };
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  await userModel.updateUser(user.id, {
    password: hashedPassword,
    resetPasswordToken: null,
    resetPasswordExpires: null,
  });

  return {
    data: { message: 'Senha redefinida com sucesso' },
    status: 200,
  };
};

export default {
  requestPasswordReset,
  resetPassword,
};

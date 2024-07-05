import nodemailer from 'nodemailer';
import { env } from '../env';

const transporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
});

const sendAuthCode = async (email: string, code: string) => {
  const mailOptions = {
    from: env.MAIL_USER,
    to: email,
    subject: 'Seu Código de Autenticação',
    text: `Seu código de autenticação é: ${code}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
};

const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${token}`;
  const mailOptions = {
    from: env.MAIL_USER,
    to: email,
    subject: 'Recuperação de Senha',
    html: `<p>Você solicitou uma recuperação de senha. Clique no link abaixo para redefinir sua senha:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>Este link expira em 1 hora.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de recuperação de senha enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar email de recuperação de senha:', error);
  }
};

const nodemailerProvider = {
  sendAuthCode,
  sendResetPasswordEmail,
};

export default nodemailerProvider;

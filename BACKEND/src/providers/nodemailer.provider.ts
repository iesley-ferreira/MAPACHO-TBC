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

const nodemailerProvider = {
  sendAuthCode,
};

export default nodemailerProvider;

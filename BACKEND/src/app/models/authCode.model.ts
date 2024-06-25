import prisma from '../../providers/prisma.provider';
import { AuthCodeInputType } from '../../types/AuthCode.type';

const createAuthCode = async (data: AuthCodeInputType) => {
  return prisma.authCode.create({
    data,
  });
};

const getAuthCode = async (code: string) => {
  return prisma.authCode.findUnique({ where: { code } });
};

const getUserAuthCode = async (user_id: string) => {
  return prisma.authCode.findUnique({ where: { user_id } });
};

const findAuthCodeByUserId = async (user_id: string) => {
  return await prisma.authCode.findUnique({ where: { user_id } });
};

const authCodeModel = {
  createAuthCode,
  getAuthCode,
  getUserAuthCode,
  findAuthCodeByUserId,
};

export default authCodeModel;

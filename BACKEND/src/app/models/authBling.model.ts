import prisma from "../../providers/prisma.provider";
import { AuthBlingUpdateType } from "../../types/AuthBling.type";

const getAuthBling = async () => prisma.authBling.findFirst();

const createAuthBling = async (data: AuthBlingUpdateType) => prisma.authBling.create({
  data
})

const updateAuthBling = async (id: string, data: AuthBlingUpdateType) => prisma.authBling.update({
  where: {
    id,
  }, data
});

const authBlingModel = {
  getAuthBling,
  updateAuthBling,
  createAuthBling,
}

export default authBlingModel;

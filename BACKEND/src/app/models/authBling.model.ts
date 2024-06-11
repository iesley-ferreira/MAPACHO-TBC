import prisma from "../../providers/prisma.provider";
import { AuthBlingUpdateType } from "../../types/AuthBling.type";

const getAuthBling = async () => prisma.authBling.findFirst();

const createAuthBling = async (data: AuthBlingUpdateType) => prisma.authBling.create({
  data
})

const updateAuthBling = async (id: string, data: AuthBlingUpdateType) => prisma.authBling.update({
  where: {
    id,
  },
  data: {
    access_token: data.access_token,
    expires_in: data.expires_in,
    refresh_token: data.refresh_token,
    scope: data.scope,
    token_type: data.token_type
  }
});

const authBlingModel = {
  getAuthBling,
  updateAuthBling,
  createAuthBling,
}

export default authBlingModel;

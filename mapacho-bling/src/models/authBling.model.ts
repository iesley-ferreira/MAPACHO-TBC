import { IReturnToken } from "../interfaces/bling.interface";
import prisma from "../providers/prisma.provider";

export class AuthBlingModel {
  public async getAuthBling() {
    return await prisma.authBling.findFirst().then((res) => {
      return res
    })
  }

  public async updateAuthBling(data: IReturnToken) {
    const token = await this.getAuthBling()

    return await prisma.authBling.update({
      where: {
        id: token?.id
      },
      data,
    })
  }

  public async createAuthBling(data: IReturnToken) {
    return await prisma.authBling.create({
      data,
    })
  }
}

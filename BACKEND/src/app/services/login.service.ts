import jwtProvider from "../../providers/jwt.provider";
import { UserInputType } from "../../types/User.type"
import loginModel from "../models/login.model"

import { ReturnServiceType } from '../../types/ReturnService.type'

const singUp = async ({ email, fullName, password, codeAccount }: UserInputType): Promise<ReturnServiceType> => {
  const newUser = loginModel.singUp({ email, fullName, password, codeAccount });

  const token = jwtProvider.sing(newUser);

  return {
    data: {
      token,
    },
    status: 201,
  }
}

const loginService = {
  singUp,
}

export default loginService;

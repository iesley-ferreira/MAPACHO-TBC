import { Router } from "express";
import loginController from "../controllers/login.controller";

const loginRouter = Router();

loginRouter.route('/singUp')
.post(
  loginController.singUp,
)

export default loginRouter;
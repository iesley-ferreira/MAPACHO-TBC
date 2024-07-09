import { NextFunction, Request, Response } from 'express';

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).*$/;

  if (password && password.length >= 6 && passwordRegex.test(password)) {
    next();
  } else {
    return res.status(400).json({
      message:
        'Senha inválida. Deve ter pelo menos 6 caracteres, incluindo pelo menos um caractere especial e um número.',
    });
  }
};

export default validatePassword;

import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
  google_id: z.string().optional(),
});

const validateSignUp = (req: Request, res: Response, next: NextFunction) => {
  try {
    signUpSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json({ message: 'Invalid sign up data', errors: error.errors });
    }
    next(error);
  }
};

const userMiddlewares = {
  validateSignUp,
};

export default userMiddlewares;

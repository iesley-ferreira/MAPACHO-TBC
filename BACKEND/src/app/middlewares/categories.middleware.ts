import { NextFunction, Request, Response } from "express";
import { z } from 'zod';

const validate_querys = (req: Request, res: Response, next: NextFunction) => {
  const querySchema = z.object({
    id: z.string().optional(),
    descricao: z.string().optional(),
   categoriaPai: z.object({
      id: z.number().optional()
    }).optional()
  }).strict();


  try {
    querySchema.parse(req.query);
    next()

  } catch (e) {
    return res.status(400).json({ message: 'Invalid categories query parameters' })
  }
}


const categoriesMiddlewares = {
  validate_querys,
}

export default categoriesMiddlewares;

import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';

const orderSchema = z.object({
  userId: z.string(),
  products: z.array(
    z.object({
      nome: z.string(),
      codigo: z.string(),
      preco: z.number(),
      tipo: z.string(),
      situacao: z.string(),
      formato: z.string(),
      descricaoCurta: z.string(),
      imagemURL: z.string().url(),
      variacao: z.string(),
      quantidade: z.number().int().positive(),
    }),
  ),
  total: z.number().positive(),
});

const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  try {
    orderSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json({ message: 'Invalid order data', errors: error.errors });
    }
    next(error);
  }
};

const orderMiddlewares = {
  validateOrder,
};

export default orderMiddlewares;

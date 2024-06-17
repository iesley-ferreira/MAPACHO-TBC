import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const validate_querys = (req: Request, res: Response, next: NextFunction) => {
  const querySchema = z
    .object({
      idProduto: z.string().optional(),
      idCategoria: z.string().optional(),
      pagina: z
        .string()
        .transform((val) => {
          const num = parseInt(val, 10);
          return isNaN(num) || num <= 0 ? 1 : num;
        })
        .optional()
        .default('1'),
      limite: z
        .string()
        .transform((val) => {
          const num = parseInt(val, 10);
          return isNaN(num) || num <= 0 ? 100 : num;
        })
        .optional()
        .default('100'),
      criterio: z.string().optional().default('1'),
      tipo: z.string().optional().default('P'),
      nome: z.string().optional(),
    })
    .strict();

  try {
    querySchema.parse(req.query);
    next();
  } catch (e) {
    return res.status(400).json({ message: 'Invalid query parameters' });
  }
};

const productsMiddlewares = {
  validate_querys,
};

export default productsMiddlewares;

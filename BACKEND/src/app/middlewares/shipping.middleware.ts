import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const validate_queries = (req: Request, res: Response, next: NextFunction) => {
  const querySchema = z
    .object({
      zipCode: z.string().length(8).optional(),
      address: z.string().optional(),
    })
    .strict();

  try {
    querySchema.parse(req.query);
    next();
  } catch (e) {
    return res.status(400).json({ message: 'Invalid address query parameters' });
  }
};

const shippingMiddlewares = {
  validate_queries,
};

export default shippingMiddlewares;

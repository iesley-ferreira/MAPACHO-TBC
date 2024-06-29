import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";
import { PaymentGenerateType, PaymentMethodsType } from "../../types/Payment.type";



const verificationGeneratePayment = (req: Request, res: Response, next: NextFunction) => {
  const paymentSchema = z.object({
    payMethod: z.enum(['visa', 'pix']).refine((val) => ['visa', 'pix'].includes(val), {
      message: "Método de pagamento inválido",
    }),
    price: z.number().positive().refine((val) => val > 0, {
      message: "Preço deve ser um número positivo",
    }),
    description: z.string().optional(),
    payer: z.object({
      paymentEmail: z.string().email({ message: "Email inválido" }).optional(),
      paymentName: z.string().min(1, { message: "Nome do pagador não pode ser vazio" }).optional(),
      address: z.object({
        neighborhood: z.string().optional(),
        city: z.string().optional(),
        federal_unit: z.string().optional(),
      }).optional(),
    }).optional(),
  });

  try {
    paymentSchema.parse(req.body)
    next()
  } catch(error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message
      }));

      return res.status(400).json({ errors: formattedErrors });
    }

    return res.status(400).json({ message: 'Erro ao processar dados' })
  }
}

const paymentMiddleware = {
  verificationGeneratePayment,
}

export default paymentMiddleware;

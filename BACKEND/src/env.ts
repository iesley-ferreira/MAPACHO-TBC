import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  HOST: z.string(),
  DATABASE_URL: z.string().url(),
  AUTHORIZATION_CODE: z.string(),
  CLIENT_ID: z.string(),
  STATE: z.string(),
  CLIENT_SECRET: z.string(),
  REDIRECT_URI: z.string().url(),
  SECRET_KEY_JWT: z.string(),
  DIRECTIONS_API_KEY: z.string(),
  MELHOR_ENVIO_API_KEY: z.string(),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.string(),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  MAIL_FROM: z.string(),
  FRONTEND_URL: z.string().url(),
  MERCADO_PAGO_ACCESS_TOKEN_02: z.string(),
});

export const env = envSchema.parse(process.env);

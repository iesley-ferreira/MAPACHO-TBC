import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTHORIZATION_CODE: z.string(),
  CLIENT_ID: z.string(),
  STATE: z.string(),
  CLIENT_SECRET: z.string(),
  REDIRECT_URI: z.string().url(),
  SECRET_KEY_JWT: z.string(),
  DIRECTIONS_API_KEY: z.string(),
  MELHOR_ENVIO_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);

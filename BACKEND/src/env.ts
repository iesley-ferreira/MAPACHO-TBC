import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTHORIZATION_CODE: z.string(),
  CLIENT_ID: z.string(),
  STATE: z.string(),
  CLIENT_SECRET: z.string(),
  REDIRECT_URI: z.string().url(),
});

export const env = envSchema.parse(process.env)
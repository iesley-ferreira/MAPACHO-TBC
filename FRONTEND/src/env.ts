import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  API_KEY_META: z.string(),
  API_URL_META: z.string().url(),
});

export const env = envSchema.parse(process.env);

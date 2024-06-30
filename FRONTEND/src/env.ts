import { z } from 'zod';

const envSchema = z.object({
  VITE_API_KEY_META: z.string(),
  VITE_API_URL_META: z.string().url(),
  VITE_MERCADO_PAGO_PUBLIC_KEY: z.string(),
  VITE_MERCADO_PAGO_ACCESS_TOKEN: z.string(),
});

const envVars = {
  VITE_API_KEY_META: import.meta.env.VITE_API_KEY_META,
  VITE_API_URL_META: import.meta.env.VITE_API_URL_META,
  VITE_MERCADO_PAGO_PUBLIC_KEY: import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY,
  VITE_MERCADO_PAGO_ACCESS_TOKEN: import.meta.env.VITE_MERCADO_PAGO_ACCESS_TOKEN,
};

try {
  envSchema.parse(envVars);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('Erro ao validar variáveis de ambiente:', error.errors);
  } else {
    console.error('Erro ao validar variáveis de ambiente:', error);
  }
}

export const env = envVars;

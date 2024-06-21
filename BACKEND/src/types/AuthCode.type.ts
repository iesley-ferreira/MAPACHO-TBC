import { Omit } from '@prisma/client/runtime/library';

export type AuthCodeType = {
  id: string;
  user_id: string;
  code: string;
  created_at: Date;
};

export type AuthCodeInputType = Omit<AuthCodeType, 'id' | 'created_at'>;

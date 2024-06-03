export type AuthBlingType = {
  id: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  updated_at: Date;
  created_at: Date;
}

export type AuthBlingUpdateType = Omit<AuthBlingType, 'id' | 'created_at' | 'updated_at'>
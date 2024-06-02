export type AuthBlingType = {
  id: string
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  scope: string
  created_at: Date
}

export type AuthBlingUpdateType = Omit<AuthBlingType, 'id' | 'created_at'>
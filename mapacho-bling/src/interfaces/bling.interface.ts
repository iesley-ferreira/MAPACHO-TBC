export interface IReturnToken {
  access_token: string;
  expires_in: number;
  token_type: string
  scope: string
  refresh_token: string;
}

export interface ITokenDataBase extends IReturnToken {
  id: number;
  updatedAt: Date;
  createdAt: Date;
}

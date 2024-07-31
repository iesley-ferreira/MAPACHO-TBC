export interface Iinstance extends IGetFistToken {}

export interface IGetFistToken {
  authCode: string;
  clientId: string;
  clientSecret: string;
  redirectUri?: string;
  directionsApiKey?: string;
}

export interface IRefreshToken {
  refreshToken: string;
  clientId: string;
  clientSecret: string;
}

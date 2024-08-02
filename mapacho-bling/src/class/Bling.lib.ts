import path from 'node:path';
import { Iinstance } from '../interfaces/instance.interface';
import RequestBling from './RequestBling.lib';
import { AuthBlingModel } from '../models/authBling.model';
import { pathConfigJson } from '../conf/index.conf';
import scheduleUtils from '../utils/schedules.utils';
import { ITokenDataBase } from '../interfaces/bling.interface';

export class BlingLib {
  private requestBling: RequestBling = new RequestBling()
  private authBlingModel: AuthBlingModel = new AuthBlingModel()
  private dataToken: ITokenDataBase | null = null;
  private clientId: string = '';
  private clientSecret: string = '';
  private authCode: string = '';
  private redirectUri: string | undefined = undefined;
  private directionsApiKey: string | undefined = undefined;

  public async initializer(data: Iinstance) {
    const tokenDataBase = await this.authBlingModel.getAuthBling();

    this.dataToken = tokenDataBase;
    this.clientId = data.clientId;
    this.clientSecret = data.clientSecret;
    this.authCode = data.authCode;

    return await this.tokenProcess();
  }

  private async tokenProcess() {
    const isExpiredTime = await this.verifyTokenTimeExpiration();

    console.log(isExpiredTime);


    if (isExpiredTime && this.dataToken) {
      const newToken = await this.requestBling.refreshToken({
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        refreshToken: this.dataToken?.refresh_token,
      });

      this.dataToken = newToken;
    } else if (!this.dataToken) {
      const newToken = await this.requestBling.getFistToken({
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        authCode: this.authCode,
        directionsApiKey: this.directionsApiKey,
        redirectUri: this.redirectUri
      });

      const tokenCreated = await this.authBlingModel.createAuthBling(newToken);

      this.dataToken = tokenCreated;
    }

    if (this.dataToken) {
      this.loopRefreshToken(this.dataToken.expires_in, this.dataToken.updatedAt);
    }

    return this.dataToken;
  }

  private async loopRefreshToken(expires_in: number, updateAt: Date) {
    const time = scheduleUtils.timeSchedule(expires_in, updateAt);

    scheduleUtils.scheduleTime(time, async () => {
      const newToken = await this.requestBling.refreshToken({
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        refreshToken: this.dataToken?.refresh_token!,
      });

      await this.authBlingModel.updateAuthBling(newToken);
    });
  }

  private async verifyTokenTimeExpiration() {
    if (this.dataToken) {
      console.log(scheduleUtils.timeSchedule(this.dataToken.expires_in, this.dataToken.updatedAt));

      return scheduleUtils.timeSchedule(this.dataToken.expires_in, this.dataToken.updatedAt) <= 0;
    }

    return false;
  }
}

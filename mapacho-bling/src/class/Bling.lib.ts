import path from 'node:path';
import { Iinstance } from '../interfaces/instance.interface';
import RequestBling from './RequestBling.lib';
import { AuthBlingModel } from '../models/authBling.model';
import { pathConfigJson } from '../conf/index.conf';
import scheduleUtils from '../utils/schedules.utils';
import { ITokenDataBase } from '../interfaces/bling.interface';
import cacheControll from '../cache/cache.controll';
import { FormatData } from './FormatData.lib';

export class BlingLib {
  private requestBling: RequestBling = new RequestBling()
  private authBlingModel: AuthBlingModel = new AuthBlingModel()
  private formatData = new FormatData();
  private dataToken: ITokenDataBase | null = null;
  private clientId: string = '';
  private clientSecret: string = '';
  private authCode: string = '';
  private redirectUri: string | undefined = undefined;
  private directionsApiKey: string | undefined = undefined;

  public async initializer(data: Iinstance) {
    this.dataToken = await this.authBlingModel.getAuthBling();
    this.clientId = data.clientId;
    this.clientSecret = data.clientSecret;
    this.authCode = data.authCode;

    return await this.tokenProcess();
  }

  private async tokenProcess() {
    const isExpiredTime = await this.verifyTokenTimeExpiration();

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
      await this.loopRefreshToken(this.dataToken.expires_in, this.dataToken.updatedAt);
      cacheControll.token.set(this.dataToken?.access_token);
    }


    await this.formatData.initiFormatData();
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

    // console.log('Token atualizado com sucesso');

  }

  private async verifyTokenTimeExpiration() {
    if (this.dataToken) {
      // console.log(scheduleUtils.timeSchedule(this.dataToken.expires_in, this.dataToken.updatedAt));

      return scheduleUtils.timeSchedule(this.dataToken.expires_in, this.dataToken.updatedAt) <= 0;
    }

    return false;
  }
}

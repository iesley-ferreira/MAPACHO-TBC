import path from 'node:path';
import { Iinstance } from '../interfaces/instance.interface';
import RequestBling from './RequestBling.lib';

export class BlingLib {
  private pathBase: string = path.resolve(__dirname, '..', 'data', 'bling')
  private requestBling: RequestBling = new RequestBling()

  public async initializer(data: Iinstance) {
    const newToken = await this.requestBling.getFistToken({
      clientId: data.clientId,
      clientSecret: data.clientSecret,
      authCode: data.authCode,
      directionsApiKey: data.directionsApiKey,
      redirectUri: data.redirectUri
    });

    console.log(newToken);

    return newToken;
  }

  public async createPathBase() {

  }
}

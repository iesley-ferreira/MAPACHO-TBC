import bling_request from '../api/bling.request';
import authBlingModel from '../app/models/authBling.model';
import cache from '../cache';
import { env } from '../env';
import { AuthBlingUpdateType } from '../types/AuthBling.type';
import scheduleUtils from '../utils/scheduler.utils';

const now = new Date();

const credentials = Buffer.from(`${env.CLIENT_ID}:${env.CLIENT_SECRET}`).toString(
  'base64',
);

const refresh_token_init = async () => {
  const authBling = await authBlingModel.getAuthBling();

  if (!authBling) {
    const newToken = await set_token(credentials);
    const timeScheduleMs = scheduleUtils.timeSchedule(
      newToken.expires_in,
      newToken.updated_at,
    );

    cache.blingToken.set(newToken.access_token);

    return scheduleUtils.scheduleTime(timeScheduleMs, () =>
      refresh_token(newToken.id, credentials, newToken.refresh_token),
    );
  }

  cache.blingToken.set(authBling.access_token);

  const timeScheduleMs = scheduleUtils.timeSchedule(
    authBling.expires_in,
    authBling.updated_at,
  );
  scheduleUtils.scheduleTime(timeScheduleMs, () =>
    refresh_token(authBling.id, credentials, authBling.refresh_token),
  );
};

const set_token = async (credentials: string) => {
  const { data: token_data }: { data: AuthBlingUpdateType } =
    await bling_request.getToken(credentials, env.AUTHORIZATION_CODE);

  const newAuth = await authBlingModel.createAuthBling({
    access_token: token_data.access_token,
    expires_in: token_data.expires_in,
    refresh_token: token_data.refresh_token,
    scope: token_data.scope,
    token_type: token_data.token_type,
  });

  return newAuth;
};

const refresh_token = async (
  id: string,
  credentials: string,
  refresh_token_value: string,
) => {
  const { data: newTokenData }: { data: AuthBlingUpdateType } =
    await bling_request.refreshToken(credentials, refresh_token_value);

  const authBlingUpdated = await authBlingModel.updateAuthBling(id, {
    ...newTokenData,
  });

  cache.blingToken.set(authBlingUpdated.access_token);

  const timeScheduleMs = scheduleUtils.timeSchedule(
    authBlingUpdated.expires_in,
    authBlingUpdated.created_at,
  );
  scheduleUtils.scheduleTime(timeScheduleMs, () =>
    refresh_token(authBlingUpdated.id, credentials, authBlingUpdated.refresh_token),
  );
};

export { refresh_token_init };

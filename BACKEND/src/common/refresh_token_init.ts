import bling_request from "../api/bling.request";
import authBlingModel from "../app/models/authBling.model";
import scheduleUtils from "../utils/scheduler.utils";
import { AuthBlingUpdateType } from "../types/AuthBling.type";
import { env } from "../env";
import blingCache from "../cache/bling.cache";

const credentials = Buffer.from(
  `${env.CLIENT_ID}:${env.CLIENT_SECRET}`,
).toString("base64");

let isRefreshing = false;

const refresh_token_init = async (callback?: (token?: string) => void | Promise<void>) => {
  const authBling = await authBlingModel.getAuthBling();

  if (!authBling) {
    const newToken = await set_token(credentials);
    const timeScheduleMs = scheduleUtils.timeSchedule(
      newToken.expires_in,
      newToken.updated_at,
    );

    blingCache.blingToken.set(newToken.access_token);

    return scheduleUtils.scheduleTime(timeScheduleMs, async () =>
      await refresh_token(newToken.id, credentials, newToken.refresh_token, callback),
    );
  }

  blingCache.blingToken.set(authBling.access_token);

  const timeScheduleMs = scheduleUtils.timeSchedule(
    authBling.expires_in,
    authBling.updated_at,
  );

  scheduleUtils.scheduleTime(timeScheduleMs, async () =>
    await refresh_token(authBling.id, credentials, authBling.refresh_token, callback),
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
  callback?: (token?: string) => void | Promise<void>,
) => {
  if (isRefreshing) {
    console.log("Refresh token já está em execução, aguardando...");
    return;
  }

  isRefreshing = true;
  console.log("Refreshing token started...");

  try {
    const { data: newTokenData }: { data: AuthBlingUpdateType } =
      await bling_request.refreshToken(credentials, refresh_token_value);

    console.log(newTokenData);


    const authBlingUpdated = await authBlingModel.updateAuthBling(id, {
      ...newTokenData,
    });

    blingCache.blingToken.set(authBlingUpdated.access_token);

    const timeScheduleMs = scheduleUtils.timeSchedule(
      authBlingUpdated.expires_in,
      authBlingUpdated.created_at,
    );

    scheduleUtils.scheduleTime(timeScheduleMs, async () =>
      await refresh_token(
        authBlingUpdated.id,
        credentials,
        authBlingUpdated.refresh_token,
        callback,
      ),
    );

    callback && await callback(authBlingUpdated.access_token);
  } catch (error) {
    console.error("Erro ao executar refresh token:", error);
  } finally {
    isRefreshing = false;
  }
};

export { refresh_token_init };

import bling_request from "../api/bling.request";
import authBlingModel from "../app/model/authBling.model"
import dotnev from 'dotenv';
import { AuthBlingUpdateType } from "../types/AuthBling.type";

dotnev.config();

const { CLIENT_ID, CLIENT_SECRET, AUTHORIZATION_CODE } = process.env;

const now = new Date();

const refresh_token_init = async () => {
  const authBling = await authBlingModel.getAuthBling();

  if (!authBling) {
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
    

    const { data: token_data }: { data: AuthBlingUpdateType } = await bling_request.refreshToken(credentials, AUTHORIZATION_CODE);

    const newAuth = await authBlingModel.createAuthBling({
      access_token: token_data.access_token,
      expires_in: token_data.expires_in,
      refresh_token: token_data.refresh_token,
      scope: token_data.scope,
      token_type: token_data.token_type,
    });

    return newAuth
  }

  console.log(authBling);

  

  const expiresInMs = authBling?.expires_in * 1000;
  const timeElapsed = now.getTime() - authBling?.created_at.getTime();
  const timeRemaining = expiresInMs - timeElapsed;
  const scheduleTime = timeRemaining * 0.91; // Agenda para 91% do tempo, executando em 9% restantes


  console.log(scheduleTime);
  
  
}


export {
  refresh_token_init,
}

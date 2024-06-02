// import dotenv from 'dotenv';

import { app } from "./app";
import { refresh_token_init } from "./common/refresh_token_init";

// dotenv.config();

const { PORT_SERVER } = process.env;

const PORT = PORT_SERVER || '3333';


app.listen(PORT, async () => {
  await refresh_token_init()
  console.log(`Server Listner ${PORT}`);
})

import { app } from "../app";
import { refresh_token_init } from "../common/refresh_token_init";

const { PORT_SERVER } = process.env;

const PORT = PORT_SERVER || '3333';

app.listen(PORT, async () => {
  await refresh_token_init()
  console.log(`Server Listener on port: ${PORT}`);
});

import { app } from '../app';
import { refresh_token_init } from '../common/refresh_token_init';
import { env } from '../env';

const { PORT_SERVER } = env;

const PORT = PORT_SERVER || '3333';

app.listen(PORT, async () => {
  await refresh_token_init();
  console.log(`Server Listener on port: ${PORT}`);
});

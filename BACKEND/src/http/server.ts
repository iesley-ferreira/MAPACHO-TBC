import { app } from '../app';
import { refresh_token_init } from '../common/refresh_token_init';
import request_products_cache from '../common/request_products_cache';
import { env } from '../env';

const { PORT_SERVER } = env;

const PORT = PORT_SERVER || '3333';

app.listen(PORT, async () => {
  await refresh_token_init(async (token) => {
    if (!token) return;
    // await request_products_cache(token)
  });
  console.log(`Server Listener on port: ${PORT}`);
});

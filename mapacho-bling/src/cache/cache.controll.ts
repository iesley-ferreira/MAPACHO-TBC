import nodeCache from 'node-cache';

const cache = new nodeCache();

const token = {
  set: (token: string) => cache.set('token', token),
  get: () => cache.get('token') as string | undefined,
}

const cacheControll = {
  token,
}

export default cacheControll;

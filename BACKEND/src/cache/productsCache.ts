import NodeCache from 'node-cache';

const productsCacheInstance = new NodeCache({ stdTTL: 3600 }); // 1 hora de TTL padrão

const productsCache = {
  set: (key: string, value: any) => productsCacheInstance.set(key, value),
  get: (key: string) => productsCacheInstance.get(key),
  del: (key: string) => productsCacheInstance.del(key),
};

export default productsCache;

import NodeCache from 'node-cache';

const categoriesCacheInstance = new NodeCache({ stdTTL: 3600 }); // 1 hora de TTL padrão

const categoriesCache = {
  set: (key: string, value: any) => categoriesCacheInstance.set(key, value),
  get: (key: string) => categoriesCacheInstance.get(key),
  del: (key: string) => categoriesCacheInstance.del(key),
};

export default categoriesCache;

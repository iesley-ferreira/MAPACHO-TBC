import nodeCache from 'node-cache';

const cacheInstance = new nodeCache({ stdTTL: 0 }); // o parametro stdTTL com o valor 0 significa que o valor nunca vai espirar

type CacheOptionsType = {
  set: (value: string) => any,
  get: () => any
}

const blingToken = ({
  set: (value: string) => cacheInstance.set('blingToken', value),
  get: () => cacheInstance.get('blingToken')
}) as CacheOptionsType

const blingCache = {
  blingToken,
}

export default blingCache;

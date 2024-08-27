import bling_request from '../../api/bling.request';
import cache from '../../cache';
import productsCache from '../../cache/productsCache';
import { QueryType } from '../../types/Query.type';
import { ReturnServiceType } from '../../types/ReturnService.type';

const getAllProducts = async (
  bling_token: string,
  query: QueryType,
): Promise<ReturnServiceType> => {
  const cacheKey = `products:${JSON.stringify(query)}`;
  const cachedProducts = productsCache.get(cacheKey);

  if (cachedProducts) {
    return {
      data: cachedProducts,
      status: 200,
    };
  }

  try {
    const allProducts = await bling_request.getAllProducts(bling_token, query);

    productsCache.set(cacheKey, allProducts.data);
    return {
      data: allProducts.data,
      status: 200,
    };
  } catch (error) {
    console.error('Error Service fetching all products:', error);
    return {
      data: { error: 'An error occurred while fetching all products' },
      status: 500,
    };
  }
};

const getProductByVariation = async (
  bling_token: string,
  fatherProductId: string,
): Promise<ReturnServiceType> => {
  const cacheKey = `product:variation:${fatherProductId}`;
  const cachedProductsByVariation = productsCache.get(cacheKey);

  if (cachedProductsByVariation) {
    return {
      data: cachedProductsByVariation,
      status: 200,
    };
  }

  try {
    const productsByVariation = await bling_request.getProductsByVariation(
      bling_token,
      fatherProductId,
    );
    productsCache.set(cacheKey, productsByVariation.data);
    return {
      data: productsByVariation.data,
      status: productsByVariation.status,
    };
  } catch (error) {
    console.error('Error Service fetching product by variation:', error);
    return {
      data: { error: 'An error occurred while fetching product' },
      status: 500,
    };
  }
};

const checkProductsAvailability = async (products: any) => {
  const bling_token = cache.blingToken.get();
  const productsIds = products.map((product: any) => product.id);
  // verificar se a quantidade de produtos disponíveis é suficiente
  const productsAvailability = await Promise.all(
    productsIds.map((productId: string) => getProductByVariation(bling_token, productId)),
  );

  const allProductsAvailable = productsAvailability.every((product) => product.available);

  return allProductsAvailable;
};

const productsService = {
  getAllProducts,
  getProductByVariation,
  checkProductsAvailability,
};

export default productsService;

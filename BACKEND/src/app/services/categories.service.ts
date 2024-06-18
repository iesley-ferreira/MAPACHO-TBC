import bling_request from '../../api/bling.request';
import categoriesCache from '../../cache/categoriesCache';
import { QueryType } from '../../types/Query.type';
import { ReturnServiceType } from '../../types/ReturnService.type';

const getAllCategories = async (
  bling_token: string,
  query: QueryType,
): Promise<ReturnServiceType> => {
  const cacheKey = `categories:${JSON.stringify(query)}`;
  const cachedCategories = categoriesCache.get(cacheKey);

  if (cachedCategories) {
    return {
      data: cachedCategories,
      status: 200,
    };
  }

  try {
    const allCategories = await bling_request.getAllCategories(bling_token, query);
    categoriesCache.set(cacheKey, allCategories.data);
    return {
      data: allCategories.data,
      status: 200,
    };
  } catch (error) {
    console.error('Error Service fetching all categories:', error);
    return {
      data: { error: 'An error occurred while fetching categories' },
      status: 500,
    };
  }
};

const categoriesService = {
  getAllCategories,
};

export default categoriesService;

import bling_request from '../../api/bling.request';
import { QueryType } from '../../types/Query.type';
import { ReturnServiceType } from '../../types/ReturnService.type';

const getAllCategories = async (
  bling_token: string,
  query: QueryType,
): Promise<ReturnServiceType> => {
  try {
    const allCategories = await bling_request.getAllCategories(bling_token, query);
    return {
      data: allCategories.data,
      status: 200,
    };
  } catch (error) {
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

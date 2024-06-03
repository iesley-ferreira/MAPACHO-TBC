import bling_request from "../../api/bling.request";
import { QueryType } from "../../types/Query.type";
import { ReturnServiceType } from "../../types/ReturnService.type";


const getAllProducts = async (bling_token: string, query: QueryType): Promise<ReturnServiceType> => {

  const allProducts = await bling_request.getAllProducts(bling_token, query);

  return {
    data: allProducts.data,
    status: allProducts.status,
  }
}

const productsService = {
  getAllProducts,
}

export default productsService;

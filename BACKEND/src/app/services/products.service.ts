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

const getProductByVariation = async (bling_token: string, fatherProductId: string): Promise<ReturnServiceType> => {
  const productsByVariation = await bling_request.getProductsByVariation(bling_token, fatherProductId);


  return {
    data: productsByVariation.data,
    status: productsByVariation.status,
  }
}

const productsService = {
  getAllProducts,
  getProductByVariation,
}

export default productsService;

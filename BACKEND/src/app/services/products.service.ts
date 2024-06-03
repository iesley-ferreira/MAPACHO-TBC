import bling_request from "../../api/bling.request";
import cache from "../../cache";
import { ReturnServiceType } from "../../types/ReturnService.type";


const getAllProducts = async (): Promise<ReturnServiceType> => {
  const bling_acess_token = cache.blingToken.get();  
  const allProducts = await bling_request.getAllProducts(bling_acess_token);

  return {
    data: allProducts.data,
    status: allProducts.status,
  }
}

const productsService = {
  getAllProducts,
}

export default productsService;

import { Request, Response } from "express";
import productsService from "../services/products.service";
import cache from "../../cache";

const getAllProducts = async (req: Request, res: Response) => {
  const bling_token = cache.blingToken.get();
  const { data, status } = await productsService.getAllProducts(bling_token, req.query);
  return res.status(status).json(data)
}

const getProductByVariation = async (req: Request, res: Response) => {
  const bling_token = cache.blingToken.get();
  const { idProduct } = req.params;
  
  const { data, status } = await productsService.getProductByVariation(bling_token, idProduct);

  return res.status(status).json(data);
}

const productsController = {
  getAllProducts,
  getProductByVariation,
}

export default productsController;

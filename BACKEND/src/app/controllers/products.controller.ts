import { Request, Response } from "express";
import productsService from "../services/products.service";
import cache from "../../cache";

const getAllProducts = async (req: Request, res: Response) => {
  const bling_token = cache.blingToken.get();

  console.log(req.query);
  

  const { data, status } = await productsService.getAllProducts(bling_token, req.query);
  return res.status(status).json(data)
}

const productsController = {
  getAllProducts,
}

export default productsController;

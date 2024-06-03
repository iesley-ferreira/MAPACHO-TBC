import { Request, Response } from "express";
import productsService from "../services/products.service";

const getAllProducts = async (req: Request, res: Response) => {
  const { data, status } = await productsService.getAllProducts();
  console.log(data);
  
  return res.status(status).json(data)
}

const productsController = {
  getAllProducts,
}

export default productsController;

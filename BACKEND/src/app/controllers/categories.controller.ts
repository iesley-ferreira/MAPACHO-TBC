import { Request, Response } from "express";
import cache from "../../cache";
import categoriesService from "../services/categories.service";

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const bling_token = cache.blingToken.get();
    
    const { data, status } = await categoriesService.getAllCategories(bling_token, req.query);

    res.status(status).json(data)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
}


const categoriesController = {
  getAllCategories,
}

export default categoriesController;

import { Request, Response } from 'express';
import cache from '../../cache';
import productsService from '../services/products.service';

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const bling_token = cache.blingToken.get();

    const { data, status } = await productsService.getAllProducts(bling_token, req.query);

    res.status(status).json(data.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
};

const getProductByVariation = async (req: Request, res: Response) => {
  try {
    const bling_token = cache.blingToken.get();
    const { idProduct } = req.params;

    const { data, status } = await productsService.getProductByVariation(
      bling_token,
      idProduct,
    );

    res.status(status).json(data);
  } catch {
    res.status(500).json({ error: 'An error occurred while fetching product' });
  }
};

const productsController = {
  getAllProducts,
  getProductByVariation,
};

export default productsController;

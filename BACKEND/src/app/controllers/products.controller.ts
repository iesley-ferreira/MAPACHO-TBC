import { Request, Response } from 'express';
import productsService from '../services/products.service';
import blingCache from '../../cache/bling.cache';

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const bling_token = blingCache.blingToken.get();
    const { data, status } = await productsService.getAllProducts(bling_token, req.query);

    res.status(status).json(data.data);
  } catch (error) {
    console.error('Error in getAllProducts controller:', error);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
};

const getProductByVariation = async (req: Request, res: Response) => {
  try {
    const bling_token = blingCache.blingToken.get();
    const { idProduct } = req.params;

    const { data, status } = await productsService.getProductByVariation(
      bling_token,
      idProduct,
    );

    return res.status(status).json(data);
  } catch (error) {
    console.error('Error in getProductByVariation controller:', error);
    return res.status(500).json({ error: 'An error occurred while fetching product' });
  }
};

const productsController = {
  getAllProducts,
  getProductByVariation,
};

export default productsController;

import { Request, Response } from 'express';
import categoriesService from '../services/categories.service';
import blingCache from '../../cache/bling.cache';

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const bling_token = blingCache.blingToken.get();

    const { data, status } = await categoriesService.getAllCategories(
      bling_token,
      req.query,
    );

    res.status(status).json(data);
  } catch (error) {
    console.error('Error in getAllCategories controller:', error);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
};

const categoriesController = {
  getAllCategories,
};

export default categoriesController;

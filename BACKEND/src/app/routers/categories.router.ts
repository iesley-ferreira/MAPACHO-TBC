import { Router } from 'express';
import categoriesController from '../controllers/categories.controller';
import categoriesMiddlewares from '../middlewares/categories.middleware';

const categoriesRouter = Router();

categoriesRouter
  .route('/')
  .get(categoriesMiddlewares.validate_querys, categoriesController.getAllCategories);

export default categoriesRouter;

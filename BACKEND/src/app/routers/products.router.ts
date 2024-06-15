import { Router } from "express";
import productsController from "../controllers/products.controller";
import productsMiddlewares from "../middlewares/products.middleware";

const productsRouter = Router();

productsRouter
  .route("/")
  .get(productsMiddlewares.validate_querys, productsController.getAllProducts);

productsRouter
  .route("/category/:categoryId")
  .get(productsController.getProductsByCategoryId);

productsRouter
  .route("/:idProduct")
  .get(productsController.getProductByVariation);

export default productsRouter;

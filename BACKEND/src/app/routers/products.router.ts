import { Router } from "express";
import productsController from "../controllers/products.controller";

const productsRouter = Router();

productsRouter.route('/')
.get(
  productsController.getAllProducts,
)

export default productsRouter;
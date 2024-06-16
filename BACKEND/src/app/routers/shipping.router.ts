import { Router } from "express";
import shippingController from "../controllers/shipping.controller";
import shippingMiddlewares from "../middlewares/shipping.middleware";

const shippingRouter = Router();

shippingRouter.route('/address')
.get(
  shippingMiddlewares.validate_queries,
  shippingController.getAddressByZipCode,
)

shippingRouter.route('/distance')
.get(
  shippingMiddlewares.validate_queries,
  shippingController.calculateDistance,
)

export default shippingRouter;
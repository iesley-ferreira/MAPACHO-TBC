import { Router } from 'express';
import mercadoPagoController from '../controllers/mercadoPago.controller';

const mercadoPagoRouter = Router();

mercadoPagoRouter.route('/pix').post(mercadoPagoController.orderByPix);

export default mercadoPagoRouter;

import { Request, Response } from 'express';
import shippingService from '../services/shipping.service';

const getAddressByZipCode = async (req: Request, res: Response) => {
  const zipCode = req.query.zipCode as string | undefined;

  if (!zipCode || typeof zipCode !== 'string') {
    return res.status(400).json({ error: 'Invalid zipCode parameter' });
  }
  try {
    const { data, status } = await shippingService.getAddressByZipCode(zipCode);

    if (data.erro === true) {
      res.status(404).json({ error: 'Address not found' });
    }

    const formattedAddress = {
      postalCode: data.cep,
      address: data.logradouro,
      complement: data.complemento,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    };

    res.status(status).json(formattedAddress);
  } catch (error) {
    console.error('Error in getAddressByZipCode controller:', error);
    res.status(500).json({ error: 'An error occurred while fetching address' });
  }
};

const calculateDistance = async (req: Request, res: Response) => {
  const address = req.query.address as string | undefined;

  if (!address || typeof address !== 'string') {
    return res.status(400).json({ error: 'Invalid address parameter' });
  }

  try {
    const { data, status } = await shippingService.calculateDistance(address);

    res.status(status).json({ distance: data });
  } catch (error) {
    console.error('Error in calculateDistance controller:', error);
    res.status(500).json({ error: 'An error occurred while fetching distance' });
  }
};

const getDeliveryOptions = async (req: Request, res: Response) => {
  const zipCode = req.query.zipCode as string | undefined;

  if (!zipCode || typeof zipCode !== 'string') {
    return res.status(400).json({ error: 'Invalid zipCode parameter' });
  }

  try {
    const { data, status } = await shippingService.getDeliveryOptions(zipCode);

    res.status(status).json(data);
  } catch (error) {
    console.error('Error in getDeliveryOptions controller:', error);
    res.status(500).json({ error: 'An error occurred while fetching delivery options' });
  }
};

const shippingController = {
  getAddressByZipCode,
  calculateDistance,
  getDeliveryOptions,
};

export default shippingController;

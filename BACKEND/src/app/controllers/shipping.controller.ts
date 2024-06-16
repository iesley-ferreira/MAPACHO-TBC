import { Request, Response } from "express";
import shippingService from "../services/shipping.service";

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

    res.status(status).json(formattedAddress)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching address' });
  }
}

const calculateDistance = async (req: Request, res: Response) => {
  const address = req.query.address as string | undefined;
  console.log('ADDRESS CONTROLLER CHAMOU', address);
  

  if (!address || typeof address !== 'string') {
    return res.status(400).json({ error: 'Invalid address parameter' });
  }

  
  
  try {
    const { data, status } = await shippingService.calculateDistance(address);
    console.log('ADDRESS CONTROLLER RETORNOU', data);
    
    res.status(status).json({ distance: data});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching distance' });
  }
}


const shippingController = {
  getAddressByZipCode,
  calculateDistance,
}

export default shippingController;

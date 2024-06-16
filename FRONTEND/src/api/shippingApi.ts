import { IAddress, IDeliveryOptionPrice } from '../store/ducks/shipping/types';
import axios from './axiosConfig';

export const fetchAddress = async (zipCode: string): Promise<IAddress> => {
  const response = await axios.get<IAddress>(`shipping/address?zipCode=${zipCode}`);
  return response.data;
};

export const fetchDistance = async (
  fullAddress: string,
): Promise<{ distance: number }> => {
  const response = await axios.get<{ distance: number }>(
    `shipping/distance?address=${fullAddress}`,
  );
  return response.data;
};

export const fetchDeliveryOptions = async (
  zipCode: string,
): Promise<IDeliveryOptionPrice[]> => {
  console.log('fetchDeliveryOptionsAPI', zipCode);

  const response = await axios.get<IDeliveryOptionPrice[]>(
    `shipping/melhorEnvio?zipCode=${zipCode}`,
  );

  return response.data;
};

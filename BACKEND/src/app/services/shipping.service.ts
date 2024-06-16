import shipping_request from '../../api/shipping.request';
import { ShippingQueryType } from '../../types/Query.type';
import { ReturnServiceType } from '../../types/ReturnService.type';

const getAddressByZipCode = async (
  query: ShippingQueryType,
): Promise<ReturnServiceType> => {
  try {
    const fullAddress = await shipping_request.getAddressByZipCode(query);

    return {
      data: fullAddress.data,
      status: 200,
    };
  } catch (error) {
    return {
      data: { error: 'An error occurred while fetching address' },
      status: 500,
    };
  }
};

const calculateDistance = async (
  query: ShippingQueryType,
): Promise<ReturnServiceType> => {
  try {
    const distance = await shipping_request.calculateDistance(query);

    return {
      data: distance,
      status: 200,
    };
  } catch (error) {
    return {
      data: { error: 'An error occurred while fetching distance' },
      status: 500,
    };
  }
};

const getDeliveryOptions = async (
  query: ShippingQueryType,
): Promise<ReturnServiceType> => {
  try {
    const deliveryOptions = await shipping_request.getDeliveryOptions(query);

    return {
      data: deliveryOptions,
      status: 200,
    };
  } catch (error) {
    return {
      data: { error: 'An error occurred while fetching delivery options' },
      status: 500,
    };
  }
};

const shippingService = {
  getAddressByZipCode,
  calculateDistance,
  getDeliveryOptions,
};

export default shippingService;

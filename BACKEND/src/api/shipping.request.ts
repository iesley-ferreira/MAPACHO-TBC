import { env } from '../env';
import axiosRequest from './requests.axios';

type ShippingRequestTypes = {
  url: string;
  data?: {
    from: {
      postal_code: string;
    };
    to: {
      postal_code: string;
    };
    products: {
      id: string;
      width: number;
      height: number;
      length: number;
      weight: number;
      insurance_value: number;
      quantity: number;
    }[];
    services: string;
    options: {};
    coupon: string;
  };
  method: 'get' | 'post';
  headers?: object;
};

const shippingRequestAxios = async ({
  url,
  data,
  method,
  headers,
}: ShippingRequestTypes) =>
  axiosRequest({
    url,
    data,
    method,
    headers,
  });

const getAddressByZipCode = async (zipCode: string) => {
  try {
    const fullAddress = await shippingRequestAxios({
      url: `https://viacep.com.br/ws/${zipCode}/json/`,
      method: 'get',
    });

    return fullAddress;
  } catch (error) {
    return { error: 'An error occurred while fetching address' };
  }
};

const calculateDistance = async (address: string) => {
  const origin = 'R. Santa Maria, 251 - Rio Grande, RS, 96205-170';
  try {
    const response = await shippingRequestAxios({
      url: `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${address}&key=${env.DIRECTIONS_API_KEY}`,
      method: 'get',
    });

    if (response.data.status === 'OK') {
      const route = response.data.routes[0];
      const leg = route.legs[0];
      const distance = leg.distance.value / 1000;
      return distance;
    }

    return response.data;
  } catch (error) {
    return { error: 'An error occurred while fetching distance' };
  }
};

const getDeliveryOptions = async (zipCode: string) => {
  const data = {
    from: {
      postal_code: '96205170',
    },
    to: {
      postal_code: zipCode,
    },
    products: [
      {
        id: 'x',
        width: 11,
        height: 17,
        length: 11,
        weight: 0.3,
        insurance_value: 10.1,
        quantity: 1,
      },
    ],
    services: '1,2',
    options: {
      receipt: false,
      own_hand: false,
      collect: false,
    },
    coupon: 'MELHOR10EM10',
  };
  try {
    const response = await shippingRequestAxios({
      url: `https://www.melhorenvio.com.br/api/v2/me/shipment/calculate`,
      data,
      method: 'post',
      headers: {
        Authorization: `Bearer ${env.MELHOR_ENVIO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const deliveryOptions = response.data
      .filter((option: any) => !option.error)
      .map((option: any) => ({
        id: option.id,
        optionName: option.name,
        customPrice: option.custom_price,
        deliveryTime: option.delivery_time,
      }));

    return deliveryOptions;
  } catch (error) {
    return { error: 'An error occurred while fetching delivery options' };
  }
};

const shipping_request = {
  getAddressByZipCode,
  calculateDistance,
  getDeliveryOptions,
};

export default shipping_request;

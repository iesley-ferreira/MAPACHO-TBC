import { env } from "../env";
import axiosRequest from "./requests.axios";



type ShippingRequestTypes = {
  url: string
  method: 'get'
}

const shippingRequestAxios = async ({ url, method }: ShippingRequestTypes) => axiosRequest({
  url,
  method,
});

// ================== GET_ADDRESS =========================== //

const getAddressByZipCode = async (zipCode: string) => {

  try {
    const fullAddress = await shippingRequestAxios({ url: `https://viacep.com.br/ws/${zipCode}/json/`, method: "get" });
    
    return fullAddress;
  } catch (error) {
    return { error: 'An error occurred while fetching address' };
  }
}


// ================== GET_DISTANCE =========================== //

const calculateDistance = async (address: string) => {
  const origin = "R. Santa Maria, 251 - Rio Grande, RS, 96205-170";
  try {

    const response = await shippingRequestAxios({ url: `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${address}&key=${env.DIRECTIONS_API_KEY}`, method: "get" });
    
    if (response.data.status === "OK") {
      const route = response.data.routes[0];
      const leg = route.legs[0];
      const distance = leg.distance.value / 1000;
      return distance;
    } 
    
    return response.data;
  } catch (error) {
    return { error: 'An error occurred while fetching distance' };
  }
}
  





const shipping_request = {
  getAddressByZipCode,
  calculateDistance,
}


export default shipping_request;


import shipping_request from "../../api/shipping.request";
import { ShippingQueryType } from "../../types/Query.type";
import { ReturnServiceType } from "../../types/ReturnService.type";


const getAddressByZipCode = async (query: ShippingQueryType): Promise<ReturnServiceType> => {
  
  try {
    const fullAddress = await shipping_request.getAddressByZipCode(query);
    
    return {
      data: fullAddress.data,
      status: 200,
    }
  } catch (error) {
    return {
      data: { error: 'An error occurred while fetching address' },
      status: 500,
    }
  }
}

const calculateDistance = async (query: ShippingQueryType): Promise<ReturnServiceType> => {
    
  try {
      console.log('ADDRESS SERVICE CHAMOU', query);
      
    const distance = await shipping_request.calculateDistance(query);
      console.log('ADDRESS SERVICE RETORNOU', distance);
    
      return {
        data: distance,
        status: 200,
      }
    } catch (error) {
      return {
        data: { error: 'An error occurred while fetching distance' },
        status: 500,
      }
    }
  }

const shippingService = {
  getAddressByZipCode,
  calculateDistance,
}

export default shippingService;

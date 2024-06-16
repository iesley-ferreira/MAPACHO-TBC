import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/ducks/rootReducer';
import {
  fetchAddressRequest,
  fetchDeliveryDistanceRequest,
} from '../../../store/ducks/shipping/actions';
import { calculateMotorcycleDelivery } from './helpers';

const CalculateFreight: React.FC = () => {
  const dispatch = useDispatch();
  const [zipCode, setZipCode] = useState('');
  const [motorcycleValue, setMotorcycleValue] = useState(null);

  const { completeAddress, distance } = useSelector(
    (state: RootState) => state.shipping,
  );

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };

  const handleCalculateFreight = () => {
    dispatch(fetchAddressRequest({ zipCode }));
  };

  useEffect(() => {
    const fullAddress = `${completeAddress.address}, , ${completeAddress.city}, ${completeAddress.state}, ${completeAddress.postalCode}`;
    dispatch(fetchDeliveryDistanceRequest({ fullAddress }));
  }, [completeAddress]);

  useEffect(() => {
    if (distance < 25) {
      const motorcycleValue = calculateMotorcycleDelivery(distance);
      console.log('VALOR MOTO', motorcycleValue);
    } else {
      console.log('DISTANCIA CALCULADA MAIOR QUE 25KM', distance);
    }
  }, [distance]);

  return (
    <div className="pb-4 border-b border-coolGray-200 mb-4">
      <p className="text-rhino-800 mb-4">Calcular frete e prazo :</p>
      <div className="flex items-center space-x-2">
        <input
          className="flex-grow md:mb-0 px-2 py-2 text-sm placeholder-gray-800 font-bold font-heading border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
          type="text"
          placeholder="CEP"
          value={zipCode}
          onChange={handleZipCodeChange}
        />
        <button
          className="flex-shrink-0 w-auto px-4 py-2 text-sm text-white font-heading uppercase bg-gray-800 hover:bg-gray-700 rounded-md"
          onClick={() => handleCalculateFreight()}
        >
          Calcular
        </button>
      </div>
    </div>
  );
};

export default CalculateFreight;

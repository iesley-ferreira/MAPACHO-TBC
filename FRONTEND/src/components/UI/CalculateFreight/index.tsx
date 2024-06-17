import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/ducks/rootReducer';
import { fetchAddressRequest } from '../../../store/ducks/shipping/actions';
import DeliveryOptionsTable from '../DeliveryOptionsTable';

const CalculateFreight: React.FC = () => {
  const dispatch = useDispatch();
  const [zipCode, setZipCode] = useState('');

  const { deliveryOptions, loading } = useSelector((state: RootState) => state.shipping);

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };

  const handleCalculateFreight = () => {
    dispatch(fetchAddressRequest({ zipCode }));
  };

  return (
    <div className="pb-4 border-b border-coolGray-200 mb-4">
      <p className="text-rhino-800 mb-4">Calcular frete e prazo :</p>
      <div className="flex items-center space-x-2 mb-10">
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
          disabled={zipCode.length < 8 || loading}
        >
          {loading ? <CircularProgress size={15} color="info" /> : 'Calcular'}
        </button>
      </div>
      {!loading && deliveryOptions.length > 0 && (
        <div className="mt-4">
          <p className="text-rhino-800 mb-4">Opções de entrega :</p>
          <DeliveryOptionsTable />
        </div>
      )}
    </div>
  );
};

export default CalculateFreight;

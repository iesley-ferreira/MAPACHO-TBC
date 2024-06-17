import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/ducks/rootReducer';

interface ShippingOptionsProps {
  setShippingOption: (option: string) => void;
}

const ShippingOptions: React.FC<ShippingOptionsProps> = ({ setShippingOption }) => {
  const { deliveryOptions, completeAddress, motorcycleValue, scheduledValue, loading } =
    useSelector((state: RootState) => state.shipping);

  const [selectedOption, setSelectedOption] = useState('buscar-na-loja');

  const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    setShippingOption(selected);
  };

  return (
    <div className="max-w-4xl mx-auto rounded-lg  w-full">
      <div className="space-y-4 w-full">
        <div
          className={`p-2 border rounded-lg ${
            selectedOption === 'buscar-na-loja'
              ? 'border-blue-500 bg-blue-100'
              : 'border-gray-300'
          } cursor-pointer hover:border-blue-500 transition-all w-full`}
          onClick={() =>
            handleDeliveryChange({
              target: { value: 'buscar-na-loja' },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        >
          <label className="flex items-center space-x-4 w-full cursor-pointer">
            <input
              type="radio"
              onChange={handleDeliveryChange}
              name="shipping-option"
              checked={selectedOption === 'buscar-na-loja'}
              value="buscar-na-loja"
              className="form-radio h-5 w-5 text-blue-600"
            />
            <div className="flex flex-row w-full text-sm">
              <p className="py-1 px-3 whitespace-nowrap">R$ 0,00</p>
              <p className="py-1 px-3 whitespace-nowrap">Imediato</p>
              <p className="py-1 px-3">Retirada na Loja</p>
            </div>
          </label>
        </div>
        {loading === true ? (
          <div className="flex justify-center">
            <CircularProgress sx={{ color: 'darkgreen' }} />
          </div>
        ) : (
          completeAddress.postalCode.length === 9 && (
            <>
              {deliveryOptions.map((option, index) => (
                <div
                  key={index}
                  className={`p-2 border rounded-lg ${
                    selectedOption === option.id.toString()
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-300'
                  } cursor-pointer hover:border-blue-500 transition-all w-full`}
                  onClick={() =>
                    handleDeliveryChange({
                      target: { value: option.optionName },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  <label className="flex items-center space-x-4 w-full cursor-pointer">
                    <input
                      type="radio"
                      onChange={handleDeliveryChange}
                      name="shipping-option"
                      checked={selectedOption === option.optionName}
                      value={option.optionName}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <div className="flex flex-row w-full text-sm">
                      <p className="py-1 px-3 whitespace-nowrap">
                        R$ {option.customPrice}
                      </p>
                      <p className="py-1 px-3 whitespace-nowrap">
                        {option.deliveryTime} dias úteis
                      </p>
                      <p className="py-1 px-3">{option.optionName}</p>
                    </div>
                  </label>
                </div>
              ))}
              {motorcycleValue > 0 && (
                <div
                  className={`p-2 border rounded-lg ${
                    selectedOption === 'motoboy'
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-300'
                  } cursor-pointer hover:border-blue-500 transition-all w-full`}
                  onClick={() =>
                    handleDeliveryChange({
                      target: { value: 'motoboy' },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  <label className="flex items-center space-x-4 w-full cursor-pointer">
                    <input
                      type="radio"
                      onChange={handleDeliveryChange}
                      name="shipping-option"
                      checked={selectedOption === 'motoboy'}
                      value="motoboy"
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <div className="flex flex-row w-full text-sm">
                      <p className="py-1 px-3 whitespace-nowrap">
                        R$ {motorcycleValue.toFixed(2)}
                      </p>
                      <p className="py-1 px-3 whitespace-nowrap">1 dia util</p>
                      <p className="py-1 px-3">Motoboy</p>
                    </div>
                  </label>
                </div>
              )}
              {scheduledValue !== 0 && (
                <div
                  className={`p-2 border rounded-lg ${
                    selectedOption === 'entrega-programada'
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-300'
                  } cursor-pointer hover:border-blue-500 transition-all w-full`}
                  onClick={() =>
                    handleDeliveryChange({
                      target: { value: 'entrega-programada' },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  <label className="flex items-center space-x-4 w-full cursor-pointer">
                    <input
                      type="radio"
                      onChange={handleDeliveryChange}
                      name="shipping-option"
                      checked={selectedOption === 'entrega-programada'}
                      value="entrega-programada"
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <div className="flex flex-row w-full text-sm">
                      <p className="py-1 px-3 whitespace-nowrap">
                        R$ {scheduledValue.toFixed(2)}
                      </p>
                      <p className="py-1 px-3 whitespace-nowrap">1-3 dias úteis</p>
                      <p className="py-1 px-3">Entrega Programada</p>
                    </div>
                  </label>
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default ShippingOptions;

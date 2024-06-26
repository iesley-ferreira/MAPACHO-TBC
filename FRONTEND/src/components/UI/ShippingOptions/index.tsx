import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/ducks/rootReducer';
import { setShippingOption } from '../../../store/ducks/shipping/actions';
import { priceFormatter } from '../../../utils/priceFormatter';

const ShippingOptions: React.FC = () => {
  const dispatch = useDispatch();
  const {
    deliveryOptions,
    shippingOption,
    completeAddress,
    motorcycleValue,
    scheduledValue,
    loading,
  } = useSelector((state: RootState) => state.shipping);

  const [selectedOption, setSelectedOption] = useState('buscar-na-loja');

  const handleDeliveryChange = (option: any) => {
    setSelectedOption(option.optionName);
    dispatch(
      setShippingOption({
        selected: option.optionName,
        value: Number(option.customPrice) || 0,
      }),
    );
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
              optionName: 'buscar-na-loja',
              customPrice: 0,
            })
          }
        >
          <label className="flex items-center space-x-4 w-full cursor-pointer">
            <input
              type="radio"
              onChange={() =>
                handleDeliveryChange({
                  optionName: 'buscar-na-loja',
                  customPrice: 0,
                })
              }
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
                    selectedOption === option.optionName
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-300'
                  } cursor-pointer hover:border-blue-500 transition-all w-full`}
                  onClick={() => handleDeliveryChange(option)}
                >
                  <label className="flex items-center space-x-4 w-full cursor-pointer">
                    <input
                      type="radio"
                      onChange={() => handleDeliveryChange(option)}
                      name={option.optionName}
                      checked={selectedOption === option.optionName}
                      value={option.optionName}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <div className="flex flex-row w-full text-sm">
                      <p className="py-1 px-3 whitespace-nowrap">
                        {priceFormatter.format(option.customPrice)}
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
                      optionName: 'motoboy',
                      customPrice: motorcycleValue,
                    })
                  }
                >
                  <label className="flex items-center space-x-4 w-full cursor-pointer">
                    <input
                      type="radio"
                      onChange={() =>
                        handleDeliveryChange({
                          optionName: 'motoboy',
                          customPrice: motorcycleValue,
                        })
                      }
                      name="shipping-option"
                      checked={selectedOption === 'motoboy'}
                      value="motoboy"
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <div className="flex flex-row w-full text-sm">
                      <p className="py-1 px-3 whitespace-nowrap">
                        {priceFormatter.format(motorcycleValue)}
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
                      optionName: 'entrega-programada',
                      customPrice: scheduledValue,
                    })
                  }
                >
                  <label className="flex items-center space-x-4 w-full cursor-pointer">
                    <input
                      type="radio"
                      onChange={() =>
                        handleDeliveryChange({
                          optionName: 'entrega-programada',
                          customPrice: scheduledValue,
                        })
                      }
                      name="shipping-option"
                      checked={selectedOption === 'entrega-programada'}
                      value="entrega-programada"
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <div className="flex flex-row w-full text-sm">
                      <p className="py-1 px-3 whitespace-nowrap">
                        {priceFormatter.format(scheduledValue)}
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

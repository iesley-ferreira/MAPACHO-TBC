import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/ducks/rootReducer';

const DeliveryOptionsTable: React.FC = () => {
  const { deliveryOptions, scheduledValue, motorcycleValue } = useSelector(
    (state: RootState) => state.shipping,
  );

  return (
    <table className="min-w-full bg-white border text-sm">
      <tbody>
        <tr>
          <td className="py-2 px-4 border-b whitespace-nowrap">R$ 0.00</td>
          <td className="py-2 px-4 border-b whitespace-nowrap bold"> - - </td>
          <td className="py-2 px-4 border-b">Retirada na loja</td>
        </tr>
        {scheduledValue !== 0 && (
          <tr>
            <td className="py-2 px-4 border-b whitespace-nowrap">
              R$ {scheduledValue.toFixed(2)}
            </td>
            <td className="py-2 px-4 border-b whitespace-nowrap bol">1-3 dias úteis</td>
            <td className="py-2 px-4 border-b">Entrega Programada</td>
          </tr>
        )}
        {motorcycleValue !== 0 && (
          <tr>
            <td className="py-2 px-4 border-b whitespace-nowrap">
              R$ {motorcycleValue.toFixed(2)}
            </td>
            <td className="py-2 px-4 border-b whitespace-nowrap">1 dia util</td>
            <td className="py-2 px-4 border-b">Motoboy</td>
          </tr>
        )}
        {deliveryOptions.map((option, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border-b whitespace-nowrap">
              R$ {option.customPrice}
            </td>
            <td className="py-2 px-4 border-b whitespace-nowrap">
              {option.deliveryTime} dias úteis
            </td>
            <td className="py-2 px-4 border-b">{option.optionName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DeliveryOptionsTable;

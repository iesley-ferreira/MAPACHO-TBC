import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store/ducks/rootReducer';
import { priceFormatter } from '../../../utils/priceFormatter';
import ApplyCupom from '../ApplyCupom';
import InstallmentPlan from '../InstallmentPlan';

interface CartSummaryProps {
  totalPrice: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalPrice }) => {
  const navigate = useNavigate();

  const { code, value } = useSelector((state: RootState) => state.discount);

  const getTotalWithDiscount = () => {
    if (value === null) {
      return totalPrice;
    }
    return totalPrice - totalPrice * value;
  };

  const handleGoToCheckout = () => {
    navigate('/envio');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:mt-12 sticky top-20 lg:w-96">
      <h2 className="text-rhino-700 text-lg mb-4 font-semibold">Total do carrinho</h2>
      <div className="pb-4 border-b border-coolGray-200 flex flex-wrap gap-2 justify-between items-center mb-4">
        <p className="text-rhino-300">Subtotal</p>
        <p className="text-rhino-800">{priceFormatter.format(totalPrice)}</p>
      </div>
      {value && code ? (
        <div className="border-b border-coolGray-200 mb-4">
          <p className="text-rhino-800 mb-4">Desconto</p>

          <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
            <p className="text-lime-500 font-semibold">{code}</p>
            <p className="text-lime-500">- {priceFormatter.format(totalPrice * value)}</p>
          </div>
        </div>
      ) : (
        <ApplyCupom />
      )}

      <p className="text-rhino-800 mb-4">Frete</p>
      <div className="mb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-rhino-300">Retirada na loja</p>
          <p className="text-rhino-800">Grátis</p>
        </div>
      </div>

      <div className="pb-4 border-b border-coolGray-200 mb-4">
        <p className="text-sm text-violet-900">
          *selecione outra forma de envio após clicar em fechar pedido
        </p>
      </div>
      <></>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h2 className="text-rhino-700 font-semibold text-lg">Total da compra</h2>
        <h2 className="text-rhino-700 font-semibold text-lg">
          {priceFormatter.format(getTotalWithDiscount())}
        </h2>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <InstallmentPlan totalPrice={getTotalWithDiscount()} />
      </div>
      <button
        className="bg-green-500 py-3 px-4 rounded-md text-white text-center hover:bg-green-600 transition uppercase duration-200 w-full inline-block"
        onClick={() => handleGoToCheckout()}
      >
        Fechar pedido
      </button>
    </div>
  );
};

export default CartSummary;

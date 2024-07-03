import React, { useState } from 'react';
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
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative  bg-white rounded-xl lg:p-6 lg:mb-10 lg:sticky lg:top-20 ">
      <div className="absolute p-2 z-20 shadow-[0px_-9px_12px_-3px_#0000001a] rounded-[50%] bg-white -top-10 left-1/2 transform -translate-x-1/2 cursor-pointer">
        <button
          className="bg-white px-3 pt-2 rounded-full text-white"
          onClick={toggleCollapse}
        >
          {isCollapsed ? (
            <i className=" ri-arrow-up-s-fill text-2xl text-slate-900"></i>
          ) : (
            <i className="ri-arrow-down-s-fill text-2xl text-slate-900"></i>
          )}
        </button>
      </div>
      {!isCollapsed && (
        <>
          <div className="pb-4 border-b border-coolGray-200 flex flex-wrap gap-2 justify-between items-center mb-4">
            <p className="text-rhino-300 text-md lg:text-lg">Subtotal</p>
            <p className="text-rhino-800 text-md lg:text-lg">
              {priceFormatter.format(totalPrice)}
            </p>
          </div>
          {value && code ? (
            <div className="border-b border-coolGray-200 mb-4">
              <p className="text-rhino-800 mb-4">Desconto</p>

              <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
                <p className="text-emerald-500 font-semibold">{code}</p>
                <p className="text-emerald-500">
                  - {priceFormatter.format(totalPrice * value)}
                </p>
              </div>
            </div>
          ) : (
            <ApplyCupom />
          )}

          <div className=" mb-4">
            <div className="pb-4 border-b border-coolGray-200 flex flex-wrap gap-2 justify-between items-center mb-4">
              <p className="text-rhino-800 text-md lg:text-lg">Frete</p>
              <p className="text-rhino-800 text-md lg:text-lg">Grátis</p>
            </div>
          </div>
        </>
      )}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-rhino-700 font-semibold text-md lg:text-lg">Total</h2>
        <h2 className="text-rhino-700 font-semibold text-md lg:text-lg">
          {priceFormatter.format(getTotalWithDiscount())}
        </h2>
      </div>
      <div className="mb-3 text-end">
        <InstallmentPlan totalPrice={getTotalWithDiscount()} />
      </div>
      <button
        className="bg-greenButton-500 hover:bg-emerald-600 py-3 px-4 rounded-[4px] text-white text-center leading-snug tracking-wider font-medium transition uppercase duration-200 w-full inline-block active:scale-105"
        onClick={() => handleGoToCheckout()}
      >
        Finalizar compra
      </button>
    </div>
  );
};

export default CartSummary;

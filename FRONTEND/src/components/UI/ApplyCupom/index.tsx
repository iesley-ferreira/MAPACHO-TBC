import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyDiscountCode } from '../../../store/ducks/discount/actions';
import { RootState } from '../../../store/ducks/rootReducer';

const ApplyCupom: React.FC = () => {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState('');
  const { error } = useSelector((state: RootState) => state.discount);

  const handleApplyCoupon = () => {
    dispatch(applyDiscountCode(couponCode));
  };

  return (
    <form className="pb-4 border-b border-coolGray-200 mb-4">
      <p className="text-rhino-800 mb-4">Aplicar cupom de desconto:</p>
      <div className="flex items-center space-x-2">
        <input
          className="flex-grow w-3/5 md:mb-0 px-2 py-2 text-sm placeholder-gray-800 font-bold font-heading border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
          type="text"
          placeholder="CUPOM"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          className="flex-shrink-0 w-2/5 max-w-24 min-w-24  px-4 py-2 text-sm text-white font-heading uppercase bg-gray-800 hover:bg-gray-700 rounded-md"
          onClick={handleApplyCoupon}
        >
          Aplicar
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">*Cupom inválido</p>}
    </form>
  );
};

export default ApplyCupom;

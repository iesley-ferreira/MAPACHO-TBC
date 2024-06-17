import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/ducks/rootReducer';
import { priceFormatter } from '../../../utils/priceFormatter';
import CartItemOverView from '../../common/CartItemOverView';
import ApplyCupom from '../ApplyCupom';
import InstallmentPlan from '../InstallmentPlan';

const OrderView: React.FC = () => {
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { code, value } = useSelector((state: RootState) => state.discount);
  const { shippingOption } = useSelector((state: RootState) => state.shipping);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0,
  );

  const getTotalWithShippingAndDiscount = () => {
    if (value === null) {
      return totalPrice + shippingOption.value;
    }
    return totalPrice - totalPrice * value + shippingOption.value;
  };

  return (
    <div className="px-3 py-6 border border-gray-200 rounded-xl">
      <h6 className="mb-4 text-2xl font-semibold text-center">Seu Pedido</h6>
      {cartItems.map((item) => (
        <CartItemOverView item={item} />
      ))}
      <div className="py-6 border-b border-dashed">
        {code !== null ? (
          <div className="flex flex-wrap justify-between -m-2">
            <div className="w-auto p-2">
              <span className="text-sm text-gray-500">Cupom aplicado</span>
            </div>
            <div className="w-auto p-2 pb-6">
              <span className="font-semibold">{code}</span>
            </div>
          </div>
        ) : (
          <ApplyCupom />
        )}
        <p className="text-sm">
          Cliente novo?{' '}
          <a
            href="#"
            className="inline-block text-green-800 hover:text-green-900 font-semibold"
          >
            Cadastre-se
          </a>{' '}
          para obter melhores ofertas
        </p>
      </div>
      <div className="py-5 border-b border-dashed">
        <div className="flex flex-wrap justify-between -m-2">
          <div className="w-auto p-2">
            <span className="text-sm text-gray-500">Subtotal</span>
          </div>
          <div className="w-auto p-2">
            <span className="font-semibold">{priceFormatter.format(totalPrice)}</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-between -m-2">
          <div className="w-auto p-2">
            <span className="text-sm text-gray-500">Desconto</span>
          </div>
          <div className="w-auto p-2">
            {value !== null ? (
              <span className="font-semibold text-gray-500">
                - {priceFormatter.format(totalPrice * value)}
              </span>
            ) : (
              <span className="font-semibold text-gray-500">
                - {priceFormatter.format(0)}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-between -m-2">
          <div className="w-auto p-2">
            <span className="text-sm text-gray-500">Valor do frete</span>
          </div>
          <div className="w-auto p-2">
            <span className="font-semibold text-gray-500">
              {priceFormatter.format(shippingOption.value)}
            </span>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <div className="flex flex-wrap items-center justify-between -m-2">
          <div className="w-auto p-2">
            <p className="text-2xl font-semibold">Total</p>
          </div>
          <div className="w-auto p-2">
            <p className="text-2xl font-semibold">
              {priceFormatter.format(getTotalWithShippingAndDiscount())}
            </p>
          </div>
        </div>
        <div className="w-auto p-2">
          <InstallmentPlan totalPrice={getTotalWithShippingAndDiscount()} />
        </div>
      </div>
    </div>
  );
};

export default OrderView;

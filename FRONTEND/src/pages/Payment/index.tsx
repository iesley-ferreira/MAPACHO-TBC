import React from 'react';
import { useSelector } from 'react-redux';
import CustomizedSteppers from '../../components/UI/CustomizedSteppers';
import OrderView from '../../components/UI/OrderView';
import PaymentMethods from '../../components/UI/PaymentMethods';
import { RootState } from '../../store/ducks/rootReducer';

const Payment: React.FC = () => {
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { code, value } = useSelector((state: RootState) => state.discount);
  const { shippingOption } = useSelector((state: RootState) => state.shipping);

  const totalCartPrice = cartItems.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0,
  );

  const getTotalWithShippingAndDiscount = () => {
    if (value === null) {
      return totalCartPrice + shippingOption.value;
    }
    return totalCartPrice - totalCartPrice * value + shippingOption.value;
  };

  return (
    <section className="min-h-screen w-full flex-col flex items-center justify-center p-4 pb-16">
      <div className="container mx-auto py-10">
        <div className="customStepper flex align-center justify-center w-full py-16">
          <CustomizedSteppers activeStep={1} />
        </div>
        <div className="flex flex-wrap justify-center -m-8">
          <div className="w-full md:w-7/12 p-4 lg:max-w-xl">
            <PaymentMethods totalPrice={getTotalWithShippingAndDiscount()} />
          </div>
          <div className="w-full md:w-5/12 p-8">
            <OrderView />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;

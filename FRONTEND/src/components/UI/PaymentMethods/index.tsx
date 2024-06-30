import { initMercadoPago } from '@mercadopago/sdk-react';
import React, { useState } from 'react';
import CustomInput from '../../common/CustomInput';
import InstallmentPlan from '../InstallmentPlan';
import { PixQRCode } from './PaymentComponents';
import IconCreditCard from './svgs/IconCreditCard';
import IconMercadoPago from './svgs/IconMercadoPago';
import IconPaypal from './svgs/IconPaypal';
import IconPix from './svgs/IconPix';

initMercadoPago('YOUR_PUBLIC_KEY');

interface PaymentMethodsProps {
  totalPrice: number;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ totalPrice }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    cardExpiration: '',
    cardCVV: '',
  });

  const handleMethodChange = (method: string) => {
    setSelectedMethod(method);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('cardDetails', cardDetails);

    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const formatCardNumber = (number: string) => {
    return number
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim();
  };

  const formatExpirationDate = (date: string) => {
    return date
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d{0,2})/, '$1/$2')
      .slice(0, 5);
  };

  const formatCVV = (cvv: string) => {
    return cvv.replace(/\D/g, '').slice(0, 3);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    // Lógica para lidar com o pagamento aprovado (enviar para o backend, atualizar UI, etc.)
  };

  const handlePaymentError = (error: any) => {
    // Lógica para lidar com erros no pagamento
  };

  const items = [
    { title: 'Produto A', quantity: 2, unit_price: 15.5 },
    { title: 'Produto B', quantity: 1, unit_price: 20 },
  ];

  return (
    <div className="w-full  mb-8 px-4 py-6 border border-gray-100 rounded-lg">
      <h3 className="pb-4 text-xl text-center font-semibold">Meios de Pagamento</h3>
      <div className="mb-4 border border-gray-100 rounded-lg">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-wrap justify-between -m-2 items-center">
            <div className="w-auto p-2 flex items-center">
              <label className="relative flex items-center gap-2">
                <input
                  className="custom-radio-1 opacity-0 absolute h-4 w-4"
                  type="radio"
                  name="payment-method"
                  checked={selectedMethod === 'card'}
                  onChange={() => handleMethodChange('card')}
                />
                <span className="border border-gray-600 w-4 h-4 flex justify-center items-center rounded-full">
                  {selectedMethod === 'card' && (
                    <svg
                      className="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                    >
                      <circle cx="4" cy="4" r="4" fill="#1E2238"></circle>
                    </svg>
                  )}
                </span>
                <div>
                  <p className="text-sm font-semibold whitespace-nowrap">
                    Cartão de crédito
                  </p>
                  <InstallmentPlan totalPrice={totalPrice} />
                </div>
              </label>
            </div>
            <div className="w-auto p-2">
              <IconCreditCard />
            </div>
          </div>
        </div>
        {selectedMethod === 'card' && (
          <div className="py-4 px-10">
            <div className="mb-4">
              <label htmlFor="input-01-1" className="mb-1.5 inline-block text-sm">
                Numero do cartão
              </label>
              <CustomInput
                id="input-01-1"
                name="cardNumber"
                type="tel"
                placeholder="**** **** **** ****"
                onChange={handleInputChange}
                value={formatCardNumber(cardDetails.cardNumber)}
                maxLength={19}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="input-01-2" className="mb-1.5 inline-block text-sm">
                Nome impresso no cartão
              </label>
              <CustomInput
                id="input-01-2"
                name="cardName"
                type="text"
                placeholder="Seu nome"
                onChange={handleInputChange}
                value={cardDetails.cardName}
                maxLength={60}
              />
            </div>
            <div className="flex flex-wrap -m-2">
              <div className="w-full lg:w-1/2 p-2">
                <label htmlFor="input-01-3" className="mb-1.5 inline-block text-sm">
                  Data de expiração
                  <span className="text-gray-500">(MM/AA)</span>
                </label>
                <CustomInput
                  id="input-01-3"
                  name="cardExpiration"
                  type="tel"
                  placeholder="(MM/AA)"
                  onChange={handleInputChange}
                  value={formatExpirationDate(cardDetails.cardExpiration)}
                  maxLength={5}
                />
              </div>
              <div className="w-full lg:w-1/2 p-2">
                <label htmlFor="input-01-4" className="mb-1.5 inline-block text-sm">
                  CVV
                  <span className="text-gray-500"> (3 dígitos)</span>
                </label>
                <CustomInput
                  id="input-01-4"
                  name="cardCVV"
                  type="tel"
                  placeholder="***"
                  onChange={handleInputChange}
                  value={formatCVV(cardDetails.cardCVV)}
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap -m-2">
        <div className="w-full p-2">
          <div className="p-4 border border-gray-100 rounded-lg">
            <div className="flex flex-wrap items-center justify-between -m-2">
              <div className="w-auto p-2">
                <label className="relative flex items-center gap-2">
                  <input
                    className="custom-radio-1 opacity-0 absolute h-4 w-4"
                    type="radio"
                    name="payment-method"
                    checked={selectedMethod === 'paypal'}
                    onChange={() => handleMethodChange('paypal')}
                  />
                  <span className="border border-gray-600 w-4 h-4 flex justify-center items-center rounded-full">
                    {selectedMethod === 'paypal' && (
                      <svg
                        className="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <circle cx="4" cy="4" r="4" fill="#1E2238"></circle>
                      </svg>
                    )}
                  </span>
                  <p className="text-sm font-semibold whitespace-nowrap">Paypal</p>
                </label>
              </div>
              <div className="w-auto p-2">
                <IconPaypal />
              </div>
            </div>
            {/* {selectedMethod === 'paypal' && <PayPalGateway />} */}
          </div>
        </div>
        <div className="w-full p-2">
          <div className="p-4 border border-gray-100 rounded-lg">
            <div className="flex flex-wrap items-center justify-between -m-2">
              <div className="w-auto p-2">
                <label className="relative flex items-center gap-2">
                  <input
                    className="custom-radio-1 opacity-0 absolute h-4 w-4"
                    type="radio"
                    name="payment-method"
                    checked={selectedMethod === 'mercadopago'}
                    onChange={() => handleMethodChange('mercadopago')}
                  />
                  <span className="border border-gray-600 w-4 h-4 flex justify-center items-center rounded-full">
                    {selectedMethod === 'mercadopago' && (
                      <svg
                        className="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <circle cx="4" cy="4" r="4" fill="#1E2238"></circle>
                      </svg>
                    )}
                  </span>
                  <p className="text-sm font-semibold whitespace-nowrap">Mercado Pago</p>
                </label>
              </div>
              <div className="w-auto p-2">
                <IconMercadoPago />
              </div>
            </div>
            {selectedMethod === 'mercadopago' && (
              <div>
                {/* <MercadoPago
                 onPaymentSuccess={handlePaymentSuccess}
                 onPaymentError={handlePaymentError}
                 transactionAmount={totalPrice}
               /> */}
              </div>
            )}
          </div>
        </div>
        <div className="w-full p-2">
          <div className="p-4 border border-gray-100 rounded-lg">
            <div className="flex flex-wrap items-center justify-between -m-2">
              <div className="w-auto p-2">
                <label className="relative flex items-center gap-2">
                  <input
                    className="custom-radio-1 opacity-0 absolute h-4 w-4"
                    type="radio"
                    name="payment-method"
                    checked={selectedMethod === 'pix'}
                    onChange={() => handleMethodChange('pix')}
                  />
                  <span className="border border-gray-600 w-4 h-4 flex justify-center items-center rounded-full">
                    {selectedMethod === 'pix' && (
                      <svg
                        className="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <circle cx="4" cy="4" r="4" fill="#1E2238"></circle>
                      </svg>
                    )}
                  </span>
                  <p className="text-sm font-semibold whitespace-nowrap">Pix</p>
                </label>
              </div>
              <div className="w-auto p-2">
                <IconPix />
              </div>
            </div>
            {selectedMethod === 'pix' && <PixQRCode />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;

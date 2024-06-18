import React, { useState } from 'react';
import InstallmentPlan from '../InstallmentPlan';
import { PixQRCode } from './PaymentComponents';

interface PaymentMethodsProps {
  totalPrice: number;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ totalPrice }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const handleMethodChange = (method: string) => {
    setSelectedMethod(method);
  };

  return (
    <div className="mb-8 px-4 py-6 border border-gray-100 rounded-lg">
      <h3 className="pb-4 text-xl text-center font-semibold">
        Selecione o método de pagamento
      </h3>
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
              <i className="ri-bank-card-fill" style={{ fontSize: 30 }}></i>
            </div>
          </div>
        </div>
        {selectedMethod === 'card' && (
          <div className="py-4 px-10">
            <div className="mb-4">
              <label htmlFor="input-01-1" className="mb-1.5 inline-block text-sm">
                Numero do cartão
              </label>
              <input
                id="input-01-1"
                name="card-number"
                type="password"
                className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border focus:border-gray-300 focus:ring focus:ring-gray-100 border-gray-100 rounded-lg transition duration-200"
                placeholder="**** **** **** ****"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="input-01-2" className="mb-1.5 inline-block text-sm">
                Nome impresso no cartão
              </label>
              <input
                id="input-01-2"
                name="card-name"
                type="text"
                className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border focus:border-gray-300 focus:ring focus:ring-gray-100 border-gray-100 rounded-lg transition duration-200"
                placeholder="Seu nome"
              />
            </div>
            <div className="flex flex-wrap -m-2">
              <div className="w-full lg:w-1/2 p-2">
                <label htmlFor="input-01-3" className="mb-1.5 inline-block text-sm">
                  Data de expiração
                  <span className="text-gray-500"> (MM/AA)</span>
                </label>
                <input
                  id="input-01-3"
                  name="card-expiration"
                  type="text"
                  className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border focus:border-gray-300 focus:ring focus:ring-gray-100 border-gray-100 rounded-lg transition duration-200"
                  placeholder="(MM/AA)"
                />
              </div>
              <div className="w-full lg:w-1/2 p-2">
                <label htmlFor="input-01-4" className="mb-1.5 inline-block text-sm">
                  CVV
                  <span className="text-gray-500"> (3 dígitos)</span>
                </label>
                <input
                  id="input-01-4"
                  name="card-cvv"
                  type="text"
                  className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border focus:border-gray-300 focus:ring focus:ring-gray-100 border-gray-100 rounded-lg transition duration-200"
                  placeholder="***"
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
                <i className="ri-paypal-fill" style={{ fontSize: 30 }}></i>
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
                <i className="ri-pixelfed-fill" style={{ fontSize: 30 }}></i>
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

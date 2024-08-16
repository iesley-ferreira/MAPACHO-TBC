import React, { useEffect, useState } from 'react';
import axios from '../../../api/axiosConfig';

import { useSelector } from 'react-redux';
import { env } from '../../../env';
import { RootState } from '../../../store/ducks/rootReducer';
import Status from './Status';

// initMercadoPago(mercado_pago_public_key);

const PaymentForm: React.FC = () => {
  const dev_url = env.VITE_DEV_URL;
  const mercadoPagoPublicKey = env.VITE_MERCADO_PAGO_PUBLIC_KEY;
  const [preferenceId, setPreferenceId] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const { user } = useSelector((state: RootState) => state.user);
  console.log('mercadoPagoPublicKey', mercadoPagoPublicKey);

  const cartItems = [
    {
      id: '2907679857',
      title: 'Bong',
      description: 'Bong de vidro da massa.',
      picture_url: 'https://http2.bongdamassa.png',
      category_id: '2709997',
      quantity: 1,
      currency_id: 'BRL',
      unit_price: 74.0,
    },
    {
      id: '2904539857',
      title: 'Piteira',
      description: 'Piteira de vidro da massa.',
      picture_url: 'https://http2.piteiradamassa.png',
      category_id: '9643976',
      quantity: 2,
      currency_id: 'BRL',
      unit_price: 2.0,
    },
  ];

  const getPreferenceId = async (cartItems: any) => {
    try {
      const response = await axios.post(
        `${dev_url}payments/preference?items=${encodeURIComponent(JSON.stringify(cartItems))}`,
      );
      return response.data.preferenceId;
    } catch (error) {
      console.error('Error creating preference ID:', error);
      return null;
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = () => initializeMercadoPago();
    document.body.appendChild(script);

    return () => {
      if (window.paymentBrickController) {
        window.paymentBrickController.unmount();
      }
    };
  }, []);

  useEffect(() => {
    const createPreference = async () => {
      const preferenceId = await getPreferenceId(cartItems);
      setPreferenceId(preferenceId);
    };

    createPreference();
  }, []);

  const initializeMercadoPago = () => {
    const mp = new (window as any).MercadoPago(mercadoPagoPublicKey, {
      locale: 'pt-BR',
    });

    const settings = {
      initialization: {
        amount: cartItems.reduce(
          (total, item) => total + item.unit_price * item.quantity,
          0,
        ),
        preferenceId: preferenceId,
        payer: {
          firstName: user.name,
          lastName: '',
          email: user.email,
        },
      },
      customization: {
        visual: {
          style: {
            theme: 'default',
          },
        },
        paymentMethods: {
          creditCard: 'all',
          pix: 'all',
          bankTransfer: 'all',
          onboarding_credits: 'all',
          wallet_purchase: 'all',
          maxInstallments: 1,
        },
      },
      callbacks: {
        onReady: () => console.log('Brick ready'),
        onError: (error: any) => console.error('Brick error', error),
        onSubmit: ({ formData }: any) => {
          handlePayment(formData);
        },
      },
      locale: 'pt-BR',
    };

    const bricks = mp.bricks();
    bricks.create('payment', 'payment-form', settings);
  };

  const handlePayment = async (formData: any) => {
    try {
      const response = await axios.post(`${dev_url}payments/payment`, formData);
      console.log('Payment response:', response.data);
      const paymentId = response.data.id;
      setPaymentId(paymentId);

      // capturePayment(paymentId);
    } catch (error) {
      console.error('Error handling payment:', error);
    }
  };

  // const capturePayment = async (paymentId: string) => {
  //   try {
  //     const response = await axios.post(`${dev_url}payments/capture`, {
  //       paymentId,
  //     });
  //     console.log('Payment captured:', response);
  //   } catch (error) {
  //     console.error('Error capturing payment:', error);
  //   }
  // };

  return (
    <>{!paymentId ? <div id="payment-form"></div> : <Status paymentId={paymentId} />}</>
  );
};

export default PaymentForm;

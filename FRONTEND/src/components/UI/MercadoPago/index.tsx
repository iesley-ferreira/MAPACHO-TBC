import { useEffect } from 'react';

const MercadoPagoComponent = (
  { publicKey }: { publicKey: string },
  preferenceId: string,
) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = () => initMercadoPago(publicKey, preferenceId);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [publicKey, preferenceId]);

  const initMercadoPago = (publicKey: string, preferenceId: string) => {
    const mp: any = (window as any).MercadoPago(publicKey, { locale: 'pt' });
    const bricksBuilder = mp.bricks();
    renderPaymentBrick(bricksBuilder, preferenceId);
  };

  interface PaymentFormData {
    firstName: string;
    lastName: string;
    email: string;
  }

  interface PaymentSettings {
    initialization: {
      amount: number;
      preferenceId: string;
      payer: PaymentFormData;
    };
    customization: {
      visual: {
        style: {
          theme: string;
        };
      };
      paymentMethods: {
        creditCard: string;
        debitCard: string;
        ticket: string;
        bankTransfer: string;
        atm: string;
        onboarding_credits: string;
        wallet_purchase: string;
        maxInstallments: number;
      };
    };
    callbacks: {
      onReady: () => void;
      onSubmit: (data: {
        selectedPaymentMethod: string;
        formData: PaymentFormData;
      }) => Promise<void>;
      onError: (error: any) => void;
    };
  }

  const renderPaymentBrick = async (bricksBuilder: any, preferenceId: string) => {
    const settings: PaymentSettings = {
      initialization: {
        amount: 175,
        preferenceId,
        payer: {
          firstName: '',
          lastName: '',
          email: '',
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
          debitCard: 'all',
          ticket: 'all',
          bankTransfer: 'all',
          atm: 'all',
          onboarding_credits: 'all',
          wallet_purchase: 'all',
          maxInstallments: 1,
        },
      },
      callbacks: {
        onReady: () => {},
        onSubmit: ({ selectedPaymentMethod, formData }) => {
          console.log('Método de pagamento selecionado:', selectedPaymentMethod);

          return new Promise((resolve, reject) => {
            fetch('/process_payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
            })
              .then((response) => response.json())
              .then(() => resolve())
              .catch(() => reject());
          });
        },
        onError: (error) => {
          console.error(error);
        },
      },
    };

    window.paymentBrickController = await bricksBuilder.create(
      'payment',
      'paymentBrick_container',
      settings,
    );
  };

  return <div id="paymentBrick_container"></div>;
};

export default MercadoPagoComponent;

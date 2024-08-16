import { env } from '../../../env';

const mercadoPagoPublicKey = env.VITE_MERCADO_PAGO_PUBLIC_KEY;

interface StatusScreenBrickProps {
  paymentId: string;
}

const Status: React.FC<StatusScreenBrickProps> = ({ paymentId }) => {
  const mp = new (window as any).MercadoPago(mercadoPagoPublicKey, {
    locale: 'pt-BR',
  });
  let statusScreenBrickController;
  const settings = {
    initialization: {
      paymentId,
    },
    callbacks: {
      onReady: () => {
        console.log('brick ready');
      },
      onError: (error: any) => {
        alert(JSON.stringify(error));
      },
    },
    locale: 'pt-BR',
    customization: {
      visual: {
        style: {
          theme: 'default',
        },
      },
    },
  };

  const bricksBuilder = mp.bricks();
  statusScreenBrickController = bricksBuilder.create(
    'statusScreen',
    'statusScreenBrick_container',
    settings,
  );

  return <div id="statusScreenBrick_container" />;
};

export default Status;

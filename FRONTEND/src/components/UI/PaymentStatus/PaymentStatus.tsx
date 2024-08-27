import { StatusScreen } from '@mercadopago/sdk-react';
import { useSelector } from 'react-redux';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../../../store/ducks/rootReducer';

interface StatusScreenBrickProps {
  paymentId: string;
}

const PaymentStatus: React.FC<StatusScreenBrickProps> = ({ paymentId }) => {
  const { preferenceId, paymentStatus, ticketUrl } = useSelector(
    (state: RootState) => state.order,
  );

  const onError = (error: any) => {
    alert(JSON.stringify(error));
    toast.error('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
  };

  const onReady = async () => {
    window.scrollTo(0, 0);
    if (preferenceId && paymentStatus === 'approved') {
      toast.success('Pagamento processado com sucesso!');
      setTimeout(() => {
        window.location.href = `http://172.20.0.2:5173/pedido?paymentId=${paymentId}`;
      }, 5000);
      return;
    }
    if (preferenceId && ticketUrl && paymentStatus === 'pending') {
      toast.info('Pagamento pendente.');
      setTimeout(() => {
        window.open(ticketUrl, '_blank');
      }, 5000);
    }
    if (preferenceId && paymentStatus === 'rejected') {
      toast.info('Pagamento rejeitado.');
    }
  };

  return (
    <>
      <StatusScreen
        initialization={{ paymentId }}
        customization={{
          visual: {
            showExternalReference: true,
            font: 'Montserrat',
          },
        }}
        onReady={onReady}
        onError={onError}
      />
      <ToastContainer position="top-center" transition={Bounce} />
    </>
  );
};

export default PaymentStatus;

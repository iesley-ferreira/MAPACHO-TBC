import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { env } from '../../../env';
import { TransformedProduct } from '../../../interfaces/Product';
import { adjustCartProducts } from '../../../store/ducks/cart/actions';
import {
  createPreferenceRequest,
  processPaymentRequest,
} from '../../../store/ducks/order/actions';
import { RootState } from '../../../store/ducks/rootReducer';
import { getTotalWithShippingAndDiscount } from '../../../utils/getTotalAmountWhitDiscount';
import { calculateInstallments } from '../../../utils/maxInstallments';
import InsufficientStockModal from '../../common/InsufficientStockModal/InsufficientStockModal';
import Status from '../PaymentStatus/PaymentStatus';
import { transformProduct } from './helpers';

const PaymentForm: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.user);
  const { items } = useSelector((state: RootState) => state.cart);
  const [showModal, setShowModal] = useState(false);
  const { preferenceId, paymentId, insufficientStockItems } = useSelector(
    (state: RootState) => state.order,
  );
  const { value, code } = useSelector((state: RootState) => state.discount);
  const { shippingOption } = useSelector((state: RootState) => state.shipping);

  const mercadoPagoPublicKey = env.VITE_MERCADO_PAGO_PUBLIC_KEY;
  initMercadoPago(mercadoPagoPublicKey, { locale: 'pt-BR' });

  if (!mercadoPagoPublicKey) {
    console.log('Error: public key not defined');
    return null;
  }

  useEffect(() => {
    if (insufficientStockItems && insufficientStockItems.length > 0) {
      setShowModal(true);
    }
  }, [insufficientStockItems]);

  useEffect(() => {
    const parsedItems: TransformedProduct[] = items.map((item) => transformProduct(item));

    const orderInfo = {
      discountCode: code,
      discountValue: value || 0,
      shippingMethod: shippingOption.selected,
      shippingValue: shippingOption.value,
      totalAmount: totalAmount,
      customerId: user.id,
    };

    const data = {
      items: parsedItems,
      orderInfo,
    };

    dispatch(createPreferenceRequest({ data }));
  }, [items]);

  console.log('preferenceId', preferenceId);

  const itemsAmount = items.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0,
  );
  const maxInstallments = calculateInstallments(itemsAmount);

  const totalAmount = getTotalWithShippingAndDiscount(
    itemsAmount,
    shippingOption.value,
    value,
  );

  const initialization = {
    amount: totalAmount,
    preferenceId: preferenceId,
    payer: {
      firstName: user.name,
      lastName: '',
      email: user.email,
      entityType: 'individual' as const,
    },
  };
  const customization = {
    paymentMethods: {
      bankTransfer: ['pix'],
      creditCard: 'all' as const,
      debitCard: 'all' as const,
      // mercadoPago: 'all' as const,
      // ticket: 'all' as const,
      maxInstallments,
    },
    backUrls: {
      success: 'http://172.20.0.2:5173/pedido',
      failure: 'http://172.20.0.2:5173/pagamento',
    },
    locale: 'pt-BR',
    statement_descriptor: 'Mapacho Tabacaria',
    shipments: {
      cost: shippingOption.value,
      mode: shippingOption.selected,
    },
  };
  const onSubmit = async ({ formData }: any) => {
    formData.description = 'Mapacho Tabacaria';

    dispatch(processPaymentRequest(formData));
  };
  const onError = (error: any) => {
    console.log(error);
    toast.error('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
  };

  const onReady = async () => {
    setIsLoading(false);
  };

  const onHide = () => {
    insufficientStockItems?.forEach((item) => {
      dispatch(adjustCartProducts(item));
    });
    setShowModal(false);
  };

  return (
    <>
      {isLoading && <p>Carregando...</p>}
      {!paymentId ? (
        <>
          <Payment
            initialization={initialization}
            customization={customization}
            onSubmit={onSubmit}
            onReady={onReady}
            onError={onError}
          />
          <InsufficientStockModal
            show={showModal}
            onHide={() => onHide()}
            insufficientStockItems={insufficientStockItems || []}
          />
        </>
      ) : (
        <Status paymentId={paymentId} />
      )}
    </>
  );
};

export default PaymentForm;

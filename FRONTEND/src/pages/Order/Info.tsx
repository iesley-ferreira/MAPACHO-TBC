import React from 'react';
import { OrderStatusType } from '../../interfaces/Order';

interface InfoProps {
  orderId: string;
  status: OrderStatusType;
}

const statusMessages: Record<OrderStatusType, string> = {
  placed: 'Seu pedido foi realizado com sucesso!',
  processing: 'Seu pedido está sendo processado.',
  preparing: 'Seu pedido está em preparação.',
  shipped: 'Seu pedido foi enviado!',
  in_transit: 'Seu pedido está em trânsito.',
  delivered: 'Seu pedido foi entregue!',
  cancelled: 'Seu pedido foi cancelado.',
  returned: 'Seu pedido foi devolvido.',
  refunded: 'Seu pedido foi reembolsado.',
};

const Info: React.FC<InfoProps> = ({ orderId, status }) => {
  return (
    <div className="flex flex-col gap-2 flex-wrap pb-3 lg:pb-11">
      <div className="flex flex-row gap-4 w-full lg:w-7/12 mb-4 lg:mb-0">
        <h3 className="text-lg xl:text-xl font-heading font-medium">Status:</h3>
        <div className="flex flex-row gap-4">
          <img
            className="lg:mr-5 w-5"
            src="/public/assets/images/payment-methods/accept.svg"
            alt="statusImage"
          />
          <p className="text-md">{statusMessages[status]}</p>
        </div>
      </div>
      <div className="flex flex-row gap-3 w-full lg:w-5/12">
        <h3 className="text-lg xl:text-xl font-heading font-medium">Pedido:</h3>
        <p className="text-md ">{orderId}</p>
      </div>
      <div className="flex flex-row gap-3 w-full lg:w-5/12">
        <h3 className="text-lg xl:text-xl font-heading font-medium">Data:</h3>
        <p className="text-md ">29/07/2024</p>
      </div>
      <div className="flex flex-row gap-3 w-full lg:w-5/12">
        <h3 className="text-lg xl:text-xl font-heading font-medium">Pagamento:</h3>
        <p className="text-md ">Visa -4699</p>
      </div>
      <div className="flex flex-row gap-3 w-full lg:w-5/12">
        <h3 className="text-lg xl:text-xl font-heading font-medium">Endereço:</h3>
        <p className="text-md ">Rua 123, Cidade, Estado, 12345-678</p>
      </div>
      <div className="flex flex-row gap-3 w-full lg:w-5/12">
        <h3 className="text-lg xl:text-xl font-heading font-medium">Entrega:</h3>
        <p className="text-md ">PAC</p>
      </div>
    </div>
  );
};

export default Info;

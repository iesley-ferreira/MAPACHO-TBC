import React, { useState } from 'react';
import { IOrder } from '../../../../interfaces/User';
import OrdersTable from './OrdersTable';

type UserOrdersProps = {
  orders: IOrder[] | [];
};

const UserOrders: React.FC<UserOrdersProps> = ({ orders }) => {
  const [expandedOrders, setExpandedOrders] = useState<{ [key: string]: boolean }>({});

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prevExpandedOrders) => ({
      ...prevExpandedOrders,
      [orderId]: !prevExpandedOrders[orderId],
    }));
  };

  return (
    <section className="w-full">
      <div className="container px-4 mx-auto">
        <div className="py-6 h-full overflow-hidden">
          <div className="pb-6 border-b border-coolGray-100">
            <div className="flex flex-wrap items-center justify-between -m-2">
              <div className="w-full md:w-auto p-2">
                <h2 className="text-xl lg:text-2xl font-bold uppercase">Meus Pedidos</h2>
                <p className="text-xs text-coolGray-500 font-medium">
                  Veja todos os seus pedidos abaixo
                </p>
              </div>
            </div>
          </div>
          <OrdersTable
            orders={orders}
            // toggleOrderExpansion={toggleOrderExpansion}
            // expandedOrders={expandedOrders}
          />
        </div>
      </div>
    </section>
  );
};

export default UserOrders;

import React, { useState } from 'react';
import { IOrder } from '../../../interfaces/User';
import { priceFormatter } from '../../../utils/priceFormatter';
import { dateFormatter } from '../../../utils/dateFormatter';

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

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'entregue':
        return 'md:bg-green-200 text-green-700';
      case 'enviado':
        return 'md:bg-blue-200 text-blue-700';
      case 'processando':
        return 'md:bg-gray-200 text-gray-700';
      default:
        return '';
    }
  };

  return (
    <section className="flex items-center w-full py-8">
      <div className="container md:max-w-4xl px-4 mx-auto rounded-sm overflow-hidden">
        <div className="mb-16 bg-white border border-gray-100 overflow-hidden rounded-5xl">
          <div className="overflow-x-auto">
            <div className="flex items-center justify-between rounded-lg bg-gray-300 py-3 md:py-5 px-4 md:px-8">
              <div className="flex items-center w-full justify-between">
                <div className="w-4/12 md:w-2/12 font-heading text-center font-semibold uppercase md:hidden">
                  <p>ID</p>
                </div>
                <div className="md:w-2/12 font-heading text-center font-semibold uppercase hidden md:block">
                  <p>ID Compra</p>
                </div>
                <div className="w-4/12 md:w-2/12  md:pr-0 font-heading text-center font-semibold uppercase">
                  <p>Data</p>
                </div>
                <div className="w-4/12 md:w-2/12 md:pr-0 font-heading text-center font-semibold uppercase">
                  <p>Status</p>
                </div>
                <div className="md:w-2/12 font-heading text-center font-semibold uppercase hidden md:block">
                  <p>Total</p>
                </div>
                <div className="font-heading md:w-2/12 text-center font-semibold uppercase hidden md:block">
                  <p>Detalhes</p>
                </div>
                <div className="w-1/12 md:hidden"></div>
              </div>
            </div>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="bg-gray-50 border-b border-gray-100">
                  <div className="flex w-full justify-between px-4 py-3 md:px-7 md:py-5">
                    <div className="w-4/12 md:w-2/12  font-heading text-sm md:text-md text-center uppercase">
                      {/* {order.id} */}
                      #123456
                    </div>
                    <div className="w-4/12 md:w-2/12 md:py-1 md:px-3 text-sm md:text-md font-heading text-center uppercase">
                      {dateFormatter(`${order.created_at}`)}
                    </div>
                    <div className="flex w-4/12 md:w-2/12 content-center justify-center">
                      <div
                        className={`flex w-fit md:py-1 md:px-3 text-sm font-heading rounded-full ${getStatusBgColor(order.status)}`}
                      >
                        {order.status}
                      </div>
                    </div>
                    <div className="w-4/12 md:w-2/12 font-heading text-center uppercase hidden md:block">
                      {priceFormatter.format(order.total)}
                    </div>
                    <div className="w-1/12 md:w-2/12 text-center">
                      <button onClick={() => toggleOrderExpansion(order.id)}>
                        {expandedOrders[order.id] ? (
                          <i className="ri-arrow-up-s-fill text-2xl"></i>
                        ) : (
                          <i className="ri-arrow-down-s-fill text-2xl"></i>
                        )}
                      </button>
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                      expandedOrders[order.id] ? 'max-h-screen' : 'max-h-0'
                    }`}
                  >
                    <div className="bg-gray-100 p-3 md:p-5">
                      {order.products ? (
                        order.products.map((product) => (
                          <div
                            key={`product-${product.id}`}
                            className="flex flex-row md:items-center md:justify-between mb-4 gap-3 border-b-2 border-dotted"
                          >
                            <div className="flex items-center gap-4 w-full ">
                              <p className="text-rhino-800 text-xs md:text-base">
                                {product.quantidade}x
                              </p>
                              <div className="rounded-lg w-36 lg:w-24 h-24 sm:w-24 h-24 flex items-center justify-center">
                                <img
                                  src={
                                    product.imagemURL ||
                                    '/public/assets/noImageAvailable.png'
                                  }
                                  alt={product.nome}
                                />
                              </div>
                              <div className="flex flex-col md:flex-row lg:items-center lg:justify-between w-full ">
                                <div className="md:w-3/5">
                                  <h2 className="text-rhino-800 md:w-[96%] md:text-base line-clamp-1 md:line-clamp-2">
                                    {product.nome}
                                  </h2>
                                  <h2 className="text-rhino-800  text-base md:text-base">
                                    {product.variacao}
                                  </h2>
                                </div>
                                <div className="flex items-center justify-between mt-2  w-[86%] md:w-2/5 lg:w-[36%] lg:mt-0 lg:ml-4">
                                  <p className="text-rhino-800 md:text-base whitespace-nowrap">
                                    {priceFormatter.format(product.preco)}
                                  </p>
                                  <button className="bg-green-500 py-3 px-4 rounded-md text-white text-center hidden md:block hover:bg-green-600 transition uppercase duration-200 w-fit ">
                                    Comprar
                                  </button>
                                  <button className="bg-green-500 py-1 px-4 rounded-md text-white text-center md:hidden hover:bg-green-600 transition uppercase duration-200 w-fit ">
                                    <i className="ri-shopping-cart-line text-md hover:scale-105"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>Carregando produtos...</div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                Você não possui nenhum pedido
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserOrders;

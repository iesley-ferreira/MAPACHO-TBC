import React, { useEffect, useState } from 'react';
import { IOrder } from '../../../interfaces/User';
import * as productsApi from '../../../api/productsApi';
import { IProduct } from '../../../interfaces/Product';
import { priceFormatter } from '../../../utils/priceFormatter';

type UserOrdersProps = {
  orders: IOrder[];
};

const UserOrders: React.FC<UserOrdersProps> = ({ orders }) => {
  const [orderProducts, setOrderProducts] = useState<{ [key: string]: IProduct[] }>({});
  const [expandedOrders, setExpandedOrders] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      const orderProductsMap: { [key: string]: IProduct[] } = {};

      for (const order of orders) {
        const products: IProduct[] = [];
        for (const product of order.products) {
          const productData = await productsApi.fetchProduct(product.id.toString());
          products.push(productData);
          await new Promise((resolve) => setTimeout(resolve, 700));
        }
        orderProductsMap[order.id] = products;
      }

      setOrderProducts(orderProductsMap);
    };

    if (orders.length > 0) {
      // fetchProducts();
    }
  }, []);

  const toggleOrderExpansion = (orderId: number) => {
    setExpandedOrders((prevExpandedOrders) => ({
      ...prevExpandedOrders,
      [orderId]: !prevExpandedOrders[orderId],
    }));
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'entregue':
        return 'bg-green-200 text-green-700';
      case 'enviado':
        return 'bg-blue-200 text-blue-700';
      case 'processando':
        return 'bg-gray-200 text-gray-700';
      default:
        return '';
    }
  };

  return (
    <section className="flex items-center w-full py-8">
      <div className="container md:max-w-4xl px-4 mx-auto rounded-sm overflow-hidden">
        <div className="mb-16 bg-white border border-gray-100 overflow-hidden rounded-5xl">
          <div className="overflow-x-auto">
            <div className="flex items-center justify-between rounded-lg bg-lime-400 py-5 px-7 md:px-12">
              <div className="flex items-center w-full justify-between">
                <div className="w-3/12 font-heading text-center font-semibold uppercase md:hidden">
                  ID
                </div>
                <div className="font-heading font-semibold uppercase hidden md:block">
                  <p>ID Compra</p>
                </div>
                <div className="w-5/12 pr-2 md:pr-0 font-heading text-center font-semibold uppercase">
                  <p>Data</p>
                </div>
                <div className="w-4/12 pr-5 md:pr-0 font-heading text-center font-semibold uppercase">
                  <p>Status</p>
                </div>
                <div className="font-heading font-semibold uppercase hidden md:block">
                  <p>Total</p>
                </div>
                <div className="font-heading font-semibold uppercase hidden md:block">
                  <p>Detalhes</p>
                </div>
              </div>
            </div>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="bg-gray-50 border-b border-gray-100">
                  <div className="flex w-full items-center justify-between px-1 py-3 md:p-5">
                    <div className="flex w-full items-center">
                      <div className="w-4/12 md:w-2/12 font-heading text-center uppercase">
                        #{order.id}
                      </div>
                      <div className="md:w-4/12 font-heading text-center uppercase">
                        {order.data}
                      </div>
                      <div className="flex w-4/12 md:w-2/12 content-center justify-center">
                        <div
                          className={`flex w-fit py-1 px-3 text-sm font-heading font-medium rounded-full ${getStatusBgColor(order.status)}`}
                        >
                          {order.status}
                        </div>
                      </div>
                      <div className="md:w-3/12 font-heading text-center uppercase hidden md:block">
                        {priceFormatter.format(order.total)}
                      </div>
                      <div className="w-1/12 text-center">
                        <button onClick={() => toggleOrderExpansion(order.id)}>
                          {expandedOrders[order.id] ? (
                            <i className="ri-arrow-up-s-fill text-2xl"></i>
                          ) : (
                            <i className="ri-arrow-down-s-fill text-2xl"></i>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                      expandedOrders[order.id] ? 'max-h-screen' : 'max-h-0'
                    }`}
                  >
                    <div className="bg-gray-100 p-3 md:p-5">
                      {orderProducts[order.id] ? (
                        orderProducts[order.id].map((product, index) => (
                          <div
                            key={`product-${product.id}`}
                            className="flex flex-row md:flex-col md:items-center mb-4 gap-3"
                          >
                            <div className="flex items-center md:col-span-2 w-3/12 text-right md:text-center">
                              <img
                                src={
                                  product.imagemURL ||
                                  '/public/assets/noImageAvailable.png'
                                }
                                className="md:h-20 md:w-20 rounded-lg"
                                alt={product.nome}
                              />
                            </div>
                            <div className="flex flex-col gap-2 w-9/12 md:flex-row items-center">
                              <div className="flex-grow md:col-span-6 text-left md:text-center">
                                {product.nome}
                              </div>
                              <div className="flex flex-row w-full justify-between md:flex-col">
                                <div className="flex-grow-0 md:col-span-2 text-left md:text-center">
                                  {order.products[index].quantidade}x
                                </div>
                                <div className="flex-grow-0 md:col-span-2 text-left md:text-center">
                                  {priceFormatter.format(product.preco)}
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

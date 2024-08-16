import React from 'react';
import { OrderStatusType } from '../../interfaces/Order';
import Info from './Info';

const Order: React.FC = () => {
  const statusString: OrderStatusType = 'shipped';

  return (
    <section className="">
      <div className="py-24 bg-blueGray-100">
        <div className="container px-4 mx-auto">
          <div className="pb-6 md:py-9 mb-10 lg:mb-11 text-center border-b border-black border-opacity-5">
            <h2 className="text-2xl md:text-4xl xl:text-5xl leading-normal uppercase font-medium text-center">
              Seu Pedido
            </h2>
          </div>
          <Info orderId="4332049123" status={statusString} />
          <div className="p-8 xl:py-14 xl:px-16 mb-14 xl:mb-16 bg-white rounded-md">
            <p className="mb-11 xl:mb-16 text-gray-400 font-medium">3 produtos</p>
            <div className="lg:flex lg:items-center lg:justify-between pb-7 xl:pb-9 mb-7 xl:mb-9 border-b border-black border-opacity-5">
              <div className="w-full lg:w-7/12">
                <div className="sm:flex sm:items-center mb-6 lg:mb-0">
                  <a href="#">
                    <img
                      className="sm:pl-7 mb-6 sm:mb-0 sm:mr-12 mx-auto sm:ml-0 h-24 object-cover"
                      src="/public/assets/images/mock-images/Cinzeiro Silicone Cores NS.png"
                      alt=""
                    />
                  </a>
                  <div>
                    <a
                      className="inline-block mb-4 text-lg font-heading font-medium hover:underline"
                      href="#"
                    >
                      Cinzeiro Silicone Cores NS
                    </a>
                    <div className="flex flex-wrap">
                      <p className="mr-4 text-sm font-heading font-medium">
                        <span>Cor:</span>
                        <span className="ml-2 text-gray-400 font-body">Amarelo</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-4/12 xl:w-3/12 2xl:w-2/12">
                <div className="relative xl:right-20 flex justify-between flex-wrap sm:px-7 lg:pl-0">
                  <p className="flex items-center text-sm">
                    <span className="mr-3 font-heading font-medium">Qtd:</span>
                    <span className="text-lg text-gray-400 font-body">1</span>
                  </p>
                  <p className="flex items-center text-sm text-blue-500 font-heading font-medium">
                    <span className="mr-2">R$</span>
                    <span className="text-lg xl:text-xl">21,00</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:flex lg:items-center lg:justify-between pb-7 xl:pb-9 mb-7 xl:mb-9 border-b border-black border-opacity-5">
              <div className="w-full lg:w-7/12">
                <div className="sm:flex sm:items-center mb-6 lg:mb-0">
                  <a href="#">
                    <img
                      className="sm:pl-7 mb-6 sm:mb-0 sm:mr-12 mx-auto sm:ml-0 h-24 object-cover"
                      src="/public/assets/images/mock-images/Seda-Papelito-Slim-Tropical.png"
                      alt=""
                    />
                  </a>
                  <div>
                    <a
                      className="inline-block mb-4 text-lg font-heading font-medium hover:underline"
                      href="#"
                    >
                      Seda Papelito Slim Tropical 1 1/4
                    </a>
                    <div className="flex flex-wrap">
                      <p className="mr-4 text-sm font-heading font-medium"></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-4/12 xl:w-3/12 2xl:w-2/12">
                <div className="relative xl:right-20 flex justify-between flex-wrap sm:px-7 lg:pl-0">
                  <p className="flex items-center text-sm">
                    <span className="mr-3 font-heading font-medium">Qtd:</span>
                    <span className="text-lg text-gray-400 font-body">2</span>
                  </p>
                  <p className="flex items-center text-sm text-blue-500 font-heading font-medium">
                    <span className="mr-2">R$</span>
                    <span className="text-lg xl:text-xl">3,50</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="w-full lg:w-7/12">
                <div className="sm:flex sm:items-center mb-6 lg:mb-0">
                  <a href="#">
                    <img
                      className="sm:pl-7 mb-6 sm:mb-0 sm:mr-12 mx-auto sm:ml-0 h-24 object-cover"
                      src="/public/assets/images/mock-images/Triturador Lion Rolling Circus Acrilico.png"
                      alt=""
                    />
                  </a>
                  <div>
                    <a
                      className="inline-block mb-4 text-lg font-heading font-medium hover:underline"
                      href="#"
                    >
                      Triturador Lion Rolling Circus Acrilico
                    </a>
                    <div className="flex flex-wrap">
                      <p className="mr-4 text-sm font-heading font-medium">
                        <span>Cor:</span>
                        <span className="ml-2 text-gray-400 font-body">Verde</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-4/12 xl:w-3/12 2xl:w-2/12">
                <div className="relative xl:right-20 flex justify-between flex-wrap sm:px-7 lg:pl-0">
                  <p className="flex items-center text-sm">
                    <span className="mr-3 font-heading font-medium">Qtd:</span>
                    <span className="text-lg text-gray-400 font-body">1</span>
                  </p>
                  <p className="flex items-center text-sm text-blue-500 font-heading font-medium">
                    <span className="mr-2">R$</span>
                    <span className="text-lg xl:text-xl">30,00</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex xl:items-center w-full">
            <div className="lg:w-2/12 xl:w-1/12 mb-10 xl:mb-0">
              <h3 className="text-xl font-heading font-medium">Resumo</h3>
            </div>
            <div className="w-full lg:w-10/12 xl:w-11/12">
              <div className="flex flex-wrap lg:justify-end -mx-3">
                <div className="w-full sm:w-1/2 lg:w-4/12 xl:w-3/12 px-3 mb-6 xl:mb-0">
                  <div className="relative flex items-center justify-between py-4 px-10 leading-8 bg-white bg-opacity-50 font-medium rounded-3xl">
                    <div className="absolute left-3 flex justify-center items-center w-20 h-20 bg-white rounded-full">
                      <div className="flex justify-center items-center w-11 h-11 text-xl text-white font-bold bg-blue-500 rounded-full">
                        3
                      </div>
                    </div>
                    <span className="ml-16">Produtos</span>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 lg:w-4/12 xl:w-3/12 px-3 mb-3 xl:mb-0">
                  <div className="flex items-center justify-between py-4 px-10 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
                    <span>Entrega</span>
                    <span className="flex items-center">
                      <span className="mr-3 text-sm">R$</span>
                      <span className="text-xl">11,00</span>
                    </span>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 lg:w-4/12 xl:w-3/12 px-3 mb-10 sm:mb-0">
                  <div className="flex items-center justify-between py-4 px-10 leading-8 bg-white font-heading font-medium rounded-3xl">
                    <span>Total</span>
                    <span className="flex items-center text-blue-500">
                      <span className="mr-3 text-sm">R$</span>
                      <span className="text-xl">69,00</span>
                    </span>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 lg:max-w-max lg:ml-auto xl:ml-0 px-3">
                  <a
                    className="block py-5 px-10 w-full text-xl leading-6 font-medium tracking-tighter font-heading text-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                    href="#"
                  >
                    Fatura
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;

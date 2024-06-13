import React from 'react'

const Success: React.FC = () => {
  return (
    <section className="py-12 pt-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="py-12 px-8 md:px-12 bg-gray-100">
          <div className="mb-6 pb-12 border-b border-gray-300">
            <h5 className="font-bold text-xl sm:text-2xl text-gray-800">
              Compra realizada com sucesso.
            </h5>
          </div>
          <div className="mb-14 pb-8 border-b border-gray-300">
            <div className="flex flex-wrap -mx-4 -mb-6">
              <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
                <span className="block mb-1 text-gray-600 font-medium">
                  Data do Pedido
                </span>
                <span className="font-bold text-gray-800">
                  18 de Março, 2021
                </span>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
                <span className="block mb-1 text-gray-600 font-medium">
                  Código do Pedido
                </span>
                <span className="font-bold text-gray-800">BK98601090</span>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
                <span className="block mb-1 text-gray-600 font-medium">
                  Pagamento
                </span>
                <span className="font-bold text-gray-800">Visa -4699</span>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
                <span className="block mb-1 text-gray-600 font-medium">
                  Endereço
                </span>
                <span className="font-bold text-gray-800">
                  Rua 123, Cidade, Estado, 12345-678
                </span>
              </div>
            </div>
          </div>
          <div className="mb-8 pb-8 border-b border-gray-300">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-4/6 px-4 mb-10 md:mb-0">
                <div className="flex items-center">
                  <img
                    className="img-fluid"
                    src="vendia-assets/images/order/item1.png"
                    alt=""
                    style={{ width: '98px', height: '98px' }}
                  />
                  <div className="pl-6">
                    <a
                      className="inline-block text-base sm:text-2xl font-bold text-gray-800"
                      href="#"
                    >
                      Bong de vidro Rick and Morty 21cm
                    </a>
                    <span className="block text-gray-600">descrição</span>
                  </div>
                </div>
              </div>
              <div className="w-1/2 md:w-1/6 px-4 md:text-right">
                <span className="font-bold text-gray-700">Qtd: 1</span>
              </div>
              <div className="w-1/2 md:w-1/6 px-4 text-right">
                <span className="font-bold text-gray-700">$148,00</span>
              </div>
            </div>
          </div>
          <div className="mb-5 pb-8 border-b border-gray-300">
            <div className="flex mb-4 items-center justify-between">
              <span className="font-medium text-gray-700">Subtotal</span>
              <span className="font-medium text-gray-700">$148,00</span>
            </div>
            <div className="flex mb-4 items-center justify-between">
              <span className="font-medium text-gray-700">Envio Expresso</span>
              <span className="font-medium text-gray-700">$6.00</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">
                Desconto (SAVE20)
              </span>
              <span className="font-medium text-yellow-500">-20% ($29.60)</span>
            </div>
          </div>
          <div className="mb-8 pb-5 border-b border-gray-300">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-800">Total</span>
              <span className="text-xl font-bold text-gray-800">$124.40</span>
            </div>
          </div>
          <div>
            <p className="font-medium text-gray-600 mb-2">
              Enviaremos uma confirmação de envio quando seus itens estiverem a
              caminho! Agradecemos sua compra e esperamos que você aproveite.
            </p>
            <p className="font-medium text-gray-600">Obrigado!</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Success

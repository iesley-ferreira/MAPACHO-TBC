import React from 'react'
import InstallmentPlan from '../InstallmentPlan'

interface CartSummaryProps {
  totalPrice: number
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalPrice }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:mt-12 sticky top-20 lg:w-96">
      <h2 className="text-rhino-700 text-lg mb-4 font-semibold">
        Total do carrinho
      </h2>
      <div className="pb-4 border-b border-coolGray-200 flex flex-wrap gap-2 justify-between items-center mb-4">
        <p className="text-rhino-300">Subtotal</p>
        <p className="text-rhino-800">
          R$ {totalPrice.toFixed(2).replace('.', ',')}
        </p>
      </div>
      <p className="text-rhino-800 mb-4">Frete</p>
      <div className="mb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-rhino-300">Retirada na loja</p>
          <p className="text-rhino-800">Grátis</p>
        </div>
      </div>
      <div className="pb-4 border-b border-coolGray-200 mb-4">
        <a
          className="text-green-500 hover:text-green-600 transition duration-200"
          href="#"
        >
          Selecione o endereço de entrega
        </a>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h2 className="text-rhino-700 font-semibold text-lg">
          Total da compra
        </h2>
        <h2 className="text-rhino-700 font-semibold text-lg">
          R$ {totalPrice.toFixed(2).replace('.', ',')}
        </h2>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <InstallmentPlan totalPrice={totalPrice} />
      </div>
      <a
        className="bg-green-500 py-3 px-4 rounded-sm text-white text-center hover:bg-green-600 transition duration-200 w-full inline-block"
        href="#"
      >
        Fechar pedido
      </a>
    </div>
  )
}

export default CartSummary

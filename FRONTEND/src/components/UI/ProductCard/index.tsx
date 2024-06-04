import React from 'react'
import { IProductCardProps } from '../../../interfaces/ProductCard'

const ProductCard: React.FC<IProductCardProps> = ({ productData }) => {
  return (
    <li
      key={productData.id}
      className="max-w-sm rounded-lg overflow-hidden shadow-lg grid grid-rows-[auto_1fr_auto] h-96 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl bg-white"
    >
      <img
        src={productData.imageUrl || '/assets/seda.png'}
        alt={productData.nome}
        className="w-full h-48 px-6  object-contain "
      />
      <div className="px-6 py-4 ">
        <div
          className="font-semibold text-xl"
          style={{ color: 'var(--text-title)' }}
        >
          {productData.nome}
        </div>
        <div className="text-xl mt-2" style={{ color: 'var(--text-body)' }}>
          R$ {productData.preco}
        </div>
        <div className="text-sm mt-2" style={{ color: 'var(--text-body)' }}>
          <p>Ou 2x de R$ 2,50 sem juros</p>
        </div>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center">
          Add to Cart
          <i className="ri-shopping-cart-2-line ml-2"></i>
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center">
          View
          <i className="ri-information-line ml-2"></i>
        </button>
      </div>
    </li>
  )
}

export default ProductCard

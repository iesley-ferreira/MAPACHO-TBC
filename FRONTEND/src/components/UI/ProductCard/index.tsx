import React from 'react'
import { IProductCardProps } from '../../../interfaces/ProductCard'

const ProductCard: React.FC<IProductCardProps> = ({ productData }) => {
  return (
    <li
      key={productData.id}
      className="max-w-sm rounded overflow-hidden shadow-lg grid grid-rows-[auto_1fr_auto] h-96 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
    >
      <img
        src={productData.imageUrl}
        alt={productData.nome}
        className="w-full px-6 py-6 h-48 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-semibold text-xl text-gray-800">
          {productData.nome}
        </div>
        <div className="text-md text-gray-600 mt-2">R${productData.preco}</div>
      </div>
      <div className="px-6 py-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          Add to Cart
        </button>
      </div>
    </li>
  )
}

export default ProductCard

import React from 'react'
import { IProduct } from '../../../interfaces/Product'
import ProductCard from '../ProductCard'

interface ProductsProps {
  products: { data: IProduct[] }
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  const productArray = products.data
  return (
    <section className="py-12 md:pt-24 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="max-w-sm md:max-w-xl mx-auto xl:max-w-none">
          <div className="flex flex-wrap -mb-6 -mx-4">
            {productArray.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products

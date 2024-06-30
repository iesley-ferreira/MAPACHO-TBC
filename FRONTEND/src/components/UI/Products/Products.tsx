import React from 'react';
import { IProduct } from '../../../interfaces/Product';
import ProductCard from '../ProductCard';

interface ProductsProps {
  products: IProduct[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <section className="">
      <div className="flex justify-center w-full px-4 ">
        <div className="w-fit">
          <div className="flex justify-center lg:justify-start flex-wrap -mb-6 -mx-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;

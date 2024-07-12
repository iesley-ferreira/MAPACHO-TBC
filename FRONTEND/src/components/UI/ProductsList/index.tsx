import React from 'react';
import { IProduct } from '../../../interfaces/Product';
import ProductCard from '../ProductCard';

interface ProductsProps {
  products: IProduct[];
}

const ProductsList: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className="flex justify-center w-full px-2 md:px-4">
      <div className="flex w-full justify-center">
        <div className="grid gap-2 lg:gap-4 justify-center items-center  w-full mt-4 grid-cols-auto-fit-155 sm:grid-cols-auto-fit-188 md:grid-cols-auto-fit-244">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;

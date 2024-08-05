import React from 'react';
import { IProduct } from '../../../interfaces/Product';
import ProductCard from '../ProductCard';

interface ProductsProps {
  products: IProduct[];
}

const ProductsList: React.FC<ProductsProps> = ({ products }) => {
  return (
<<<<<<< HEAD
    <div className="flex justify-center w-full px-2 md:px-4">
      <div className="flex w-full justify-center">
        <div className="grid gap-2 lg:gap-4 justify-center items-center  w-full mt-4 grid-cols-auto-fit-155 sm:grid-cols-auto-fit-188 md:grid-cols-auto-fit-244">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
=======
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
>>>>>>> 130354f5b3a0e5fb676c88177bca140bc0dd8377
  );
};

export default ProductsList;

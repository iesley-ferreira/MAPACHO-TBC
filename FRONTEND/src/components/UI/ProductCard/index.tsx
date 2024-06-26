import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../../interfaces/Product';
import { addProductToCart } from '../../../store/ducks/cart/actions';
import { priceFormatter } from '../../../utils/priceFormatter';
import InstallmentPlan from '../InstallmentPlan';

interface IProductCardProps {
  product: IProduct;
}

const defaultImageURL = '/public/assets/seda.png';

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(addProductToCart({ product, quantidade: 1 }));
  };

  const handleViewProduct = () => {
    const currentUrlParams = new URLSearchParams(location.search);
    currentUrlParams.set('idProduto', product.id.toString());
    navigate(`/home?${currentUrlParams.toString()}`);
  };

  return (
    <div
      key={product.id}
      className="w-full md:w-1/2 xl:w-1/4 xl:min-w-[288px] px-2 mb-6"
      onClick={handleViewProduct}
    >
      <div className="flex flex-col h-full rounded-md pt-4 pb-4 px-4 ">
        <img
          className="block mb-4 w-full  md:h-48 object-contain"
          src={product.imagemURL || defaultImageURL}
          alt={product.nome}
        />
        <div className="flex-grow flex flex-col justify-between pb-3">
          <h6 className="line-clamp-1 desc mb-3 font-semibold text-lg text-gray-800">
            {product.nome}
          </h6>
          <div className="flex mb-2 items-center justify-between">
            <span className="text-lg font-bold text-green-900">
              {priceFormatter.format(product.preco)}
            </span>
          </div>
          <InstallmentPlan totalPrice={product.preco} />
        </div>
        <button
          className="flex justify-center items-center gap-3 mt-auto px-10 py-3 text-center text-white text-sm font-bold bg-fluorescenGreen-600 hover:bg-fluorescenGreen-700 rounded-md uppercase transition duration-200"
          onClick={handleAddToCart}
        >
          Add
          <i className="ri-shopping-cart-line text-md"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

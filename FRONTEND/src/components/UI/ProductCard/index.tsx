import { Tooltip } from '@mui/material';
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
    navigate(`/produto?${currentUrlParams.toString()}`);
  };

  return (
    <div
      key={product.id}
      className="w-full max-w-[340px] md:w-1/2 xl:w-1/3 xl:min-w-[288px] px-2 mb-6 hover:-translate-y-1 transition-transform duration-300 ease-in-out"
      onClick={handleViewProduct}
    >
      <div className="flex flex-col h-full rounded-md pt-4 pb-4 px-4 shadow-[0px_3px_14px_rgba(0,0,0,0.08)] border border-[#ededed]">
        <img
          className="block mb-4 w-full  md:h-48 object-contain"
          src={product.imagemURL || defaultImageURL}
          alt={product.nome}
        />
        <div className="flex-grow flex flex-col justify-between pb-3">
          <Tooltip
            title={product.nome}
            placement="top-start"
            enterDelay={600}
            leaveDelay={200}
            arrow={true}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: 'rgba(0, 0, 0, 0.87)',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              boxShadow:
                '0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.24)',
              borderRadius: '0.25rem',
              padding: '0.5rem',
            }}
          >
            <h6 className="line-clamp-1 desc mb-3 font-semibold text-lg text-gray-800">
              {product.nome}
            </h6>
          </Tooltip>
          <div className="flex mb-2 items-center justify-between">
            <span className="text-lg font-semibold text-green-900">
              {priceFormatter.format(product.preco)}
            </span>
          </div>
          <InstallmentPlan totalPrice={product.preco} />
        </div>
        <button
          className="flex justify-center items-center gap-3 mt-auto px-10 py-1.5 text-center text-white text-sm font-bold bg-emerald-500  rounded-md uppercase transition duration-200 hover:bg-emerald-600 active:scale-105"
          onClick={handleAddToCart}
        >
          Add
          <i className="ri-shopping-cart-line text-lg font-normal"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

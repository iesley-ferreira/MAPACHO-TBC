import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { ICartItem } from '../../../interfaces/Cart';
import {
  decrementProductQuantity,
  incrementProductQuantity,
  removeProductFromCart,
} from '../../../store/ducks/cart/actions';
import { priceFormatter } from '../../../utils/priceFormatter';

interface CartListProps {
  cartItems: ICartItem[];
  onClose: () => void;
}

const defaultImageURL = '/public/assets/noImageAvailable.png';

const CartList: React.FC<CartListProps> = ({ cartItems, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoToCart = () => {
    navigate('/carrinho');
    onClose();
  };

  const handleIncrement = (id: number) => {
    dispatch(incrementProductQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementProductQuantity(id));
  };

  const handleRemove = (id: number) => {
    dispatch(removeProductFromCart(id));
  };

  return (
    <div className="relative p-4  h-full bg-white overflow-y-auto flex flex-col justify-between">
      <div>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="pb-4 border-b border-gray-50 flex gap-5 flex-wrap mb-6"
          >
            <img
              className="w-20 h-20 object-cover rounded-xl"
              src={item.imagemURL || defaultImageURL}
              alt={item.nome}
            />
            <div className="flex-1">
              <div className="flex justify-between mb-4">
                <p className="text-sm font-semibold pr-3">{item.nome}</p>
              </div>
              <div className="flex items-center justify-between flex-wrap">
                <p className="font-semibold text-green-900 whitespace-nowrap">
                  {priceFormatter.format(item.preco)}
                </p>
                <div className="flex items-center gap-2">
                  {item.quantidade > 1 ? (
                    <IconButton
                      onClick={() => handleDecrement(item.id)}
                      disabled={item.quantidade === 1}
                      className="bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 w-6 h-6 flex items-center justify-center transition duration-200"
                    >
                      <RemoveIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => handleRemove(item.id)}
                      className="group bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 w-6 h-6 flex items-center justify-center transition duration-200"
                    >
                      <DeleteIcon className="text-gray-400 group-hover:text-gray-500 transition duration-200" />
                    </IconButton>
                  )}
                  <span className="text-sm font-semibold">{item.quantidade}</span>
                  <IconButton
                    onClick={() => handleIncrement(item.id)}
                    className="bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 w-6 h-6 flex items-center justify-center transition duration-200"
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="pt-5 border-t border-gray-50">
          <div className="flex items-center justify-between flex-wrap px-2 mb-6">
            <p className="text-xl font-semibold">Total</p>
            <p className="text-xl font-semibold text-green-900">
              {priceFormatter.format(
                cartItems.reduce(
                  (total, item) => total + item.preco * item.quantidade,
                  0,
                ),
              )}
            </p>
          </div>

          <button
            className="bg-green-500 py-3 px-4 rounded-md text-white text-center hover:bg-green-600 transition uppercase duration-200 w-full inline-block"
            onClick={handleGoToCart}
          >
            Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartList;

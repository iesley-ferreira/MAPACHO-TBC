import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
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
}

const defaultImageURL = '/public/assets/no-image.png';

const CartList: React.FC<CartListProps> = ({ cartItems }) => {
  const dispatch = useDispatch();

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
    <div className="relative w-full h-full p-4 bg-white overflow-y-auto flex flex-col justify-between">
      <div>
        {cartItems.map((item) => (
          <div key={item.id} className="border-b border-gray-50 flex mb-6 gap-6">
            <img
              className="w-20 h-20 object-cover rounded-xl"
              src={item.imagemURL || defaultImageURL}
              alt={item.nome}
            />
            <div className="flex flex-col justify-between w-full pr-1">
              <div>
                <p className="text-base font-semibold line-clamp-2 pr-3">{item.nome}</p>
              </div>
              {item.variacao?.variationId && (
                <div className="flex flex-row gap-1 justify-start">
                  <p className="text-sm text-coolGray-400">
                    {item.variacao?.variationType}:
                  </p>
                  <p className="text-sm text-coolGray-400">
                    {item.variacao?.variationName}
                  </p>
                </div>
              )}
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
      </div>
    </div>
  );
};

export default CartList;

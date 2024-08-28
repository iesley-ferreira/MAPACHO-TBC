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
  console.log('CART ITEMS', cartItems);

  const dispatch = useDispatch();

  const handleIncrement = (id: string, variationId?: number) => {
    const itemId = variationId || id;
    dispatch(incrementProductQuantity(itemId.toString()));
  };

  const handleDecrement = (id: string, variationId?: number) => {
    const itemId = variationId || id;

    dispatch(decrementProductQuantity(itemId.toString()));
  };

  const handleRemove = (id: string, variationId?: number) => {
    const itemId = variationId || id;

    dispatch(removeProductFromCart(itemId.toString()));
  };

  return (
    <div className="relative w-full h-full p-4 bg-white overflow-y-auto flex flex-col justify-between">
      <div>
        {cartItems.map((item, index) => (
          <div key={index} className="border-b border-gray-50 flex mb-6 gap-6">
            <img
              className="w-20 h-20 object-cover rounded-xl"
              src={item.imagemURL || defaultImageURL}
              alt={item.nome}
            />
            <div className="flex flex-col justify-between w-full pr-1">
              <div>
                <p className="text-base font-semibold line-clamp-2 pr-3">{item.nome}</p>
              </div>
              {item.variacao !== '' && (
                <div className="flex flex-row gap-1 justify-start">
                  <p className="text-sm text-coolGray-400">
                    {item.variacao!.split(':')[0]}:
                  </p>
                  <p className="text-sm text-coolGray-400">
                    {item.variacao!.split(':')[1]}
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
                      onClick={() => handleDecrement(item.id.toString())}
                      disabled={item.quantidade === 1}
                      className="bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 w-6 h-6 flex items-center justify-center transition duration-200"
                    >
                      <RemoveIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => handleRemove(item.id.toString())}
                      className="group bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 w-6 h-6 flex items-center justify-center transition duration-200"
                    >
                      <DeleteIcon className="text-gray-400 group-hover:text-gray-500 transition duration-200" />
                    </IconButton>
                  )}
                  <span className="text-sm font-semibold">{item.quantidade}</span>
                  <IconButton
                    onClick={() => handleIncrement(item.id.toString())}
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

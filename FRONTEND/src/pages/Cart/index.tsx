import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartSummary from '../../components/UI/CartSummary';
import {
  decrementProductQuantity,
  incrementProductQuantity,
  removeProductFromCart,
} from '../../store/ducks/cart/actions';
import { RootState } from '../../store/ducks/rootReducer';
import { priceFormatter } from '../../utils/priceFormatter';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  const handleIncrement = (id: number) => {
    dispatch(incrementProductQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementProductQuantity(id));
  };

  const handleRemove = (id: number) => {
    dispatch(removeProductFromCart(id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0,
  );

  return (
    <section className="py-12 mt-10 bg-gray-50">
      <div className="container px-4 mx-auto md:max-w-7xl">
        <h1 className="font-heading text-coolGray-800 text-3xl font-semibold mb-6">
          Carrinho
        </h1>
        {cartItems.length === 0 ? (
          <div className="flex items-center justify-center text-center h-full">
            <p className="text-rhino-800 mt-40">
              Você ainda não tem produtos no carrinho
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap -mx-4 justify-center">
            <div className="w-full lg:w-3/5 px-4">
              <div className="mb-6 py-4 overflow-x-auto">
                <div className="flex flex-col lg:flex-row w-full justify-center">
                  <div className="w-full lg:w-auto">
                    <div className="w-full py-4 px-6 border-b border-coolGray-200">
                      <span className="text-rhino-800">Produtos</span>
                    </div>
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="w-full py-4 px-4 border-b border-coolGray-200 flex flex-col lg:flex-row items-start lg:items-center h-auto lg:h-32"
                      >
                        <div className="flex items-center gap-4 w-full ">
                          <div className="rounded-lg w-36 lg:w-24 h-24 flex items-center justify-center">
                            <img
                              src={
                                item.imagemURL || '/public/assets/noImageAvailable.png'
                              }
                              alt={item.nome}
                            />
                          </div>
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full ">
                            <div>
                              <h2 className="text-rhino-800 ">{item.nome}</h2>
                            </div>
                            <div className="flex flex-row items-center justify-between mt-2 lg:mt-0 lg:ml-4">
                              <p className="text-rhino-800 whitespace-nowrap">
                                {priceFormatter.format(item.preco)}
                              </p>
                              <div className="mt-2 lg:mt-0 lg:ml-4 flex items-center">
                                <div className="py-2 px-2  rounded-sm border border-coolGray-200 flex gap-4 items-center bg-white">
                                  {item.quantidade > 1 ? (
                                    <div
                                      className="cursor-pointer text-coolGray-300 hover:text-coolGray-400 transition duration-200"
                                      onClick={() => handleDecrement(item.id)}
                                    >
                                      <RemoveIcon />
                                    </div>
                                  ) : (
                                    <div
                                      className="cursor-pointer text-coolGray-300 hover:text-coolGray-400 transition duration-200"
                                      onClick={() => handleRemove(item.id)}
                                    >
                                      <DeleteOutlineIcon />
                                    </div>
                                  )}
                                  <span className="text-rhino-800 text-sm">
                                    {item.quantidade}
                                  </span>
                                  <div
                                    className="cursor-pointer text-coolGray-300 hover:text-coolGray-400 transition duration-200"
                                    onClick={() => handleIncrement(item.id)}
                                  >
                                    <AddIcon />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/5 px-4">
              <CartSummary totalPrice={totalPrice} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;

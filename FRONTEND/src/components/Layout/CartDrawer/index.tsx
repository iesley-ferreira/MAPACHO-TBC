import CloseIcon from '@mui/icons-material/Close';
import { Divider, Drawer, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store/ducks/rootReducer';
import CartList from '../../UI/CartList';

interface CartDrawerProps {
  open: boolean;
  setCartDrawerOpen: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, setCartDrawerOpen }) => {
  const navigate = useNavigate();
  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  const handleGoToCart = () => {
    setCartDrawerOpen();
    navigate('/carrinho');
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={setCartDrawerOpen}
      sx={{ '.MuiDrawer-paper': { width: '320px', maxHeight: '100vh' } }}
    >
      <div className="flex justify-between items-center p-4">
        <h1 className="font-heading uppercase text-1xl ">produtos</h1>
        <IconButton onClick={setCartDrawerOpen}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      {cartItems.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4 }}>
          Carrinho vazio
        </Typography>
      ) : (
        <>
          <CartList cartItems={cartItems} />
          <div className="p-4">
            <button
              className="bg-gradient-to-br from-cyanGreen-800 to-yellow-500  py-3 px-4 rounded-md text-white text-center hover:bg-green-600 transition uppercase duration-200 w-full inline-block"
              onClick={handleGoToCart}
            >
              Carrinho
            </button>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;

import CloseIcon from '@mui/icons-material/Close';
import { Divider, Drawer, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store/ducks/rootReducer';
import CartList from '../../UI/CartList';

interface CartDrawerProps {
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (cartDrawerOpen: boolean) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ cartDrawerOpen, setCartDrawerOpen }) => {
  const navigate = useNavigate();
  const [navigateAfterClose, setNavigateAfterClose] = useState(false);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  const handleGoToCart = () => {
    setCartDrawerOpen(!cartDrawerOpen);
    setNavigateAfterClose(true);
  };

  useEffect(() => {
    if (!cartDrawerOpen && navigateAfterClose) {
      navigate('/carrinho');
      setNavigateAfterClose(false);
    }
  }, [navigateAfterClose]);

  return (
    <Drawer
      anchor="right"
      open={cartDrawerOpen}
      onClose={() => setCartDrawerOpen(!cartDrawerOpen)}
      sx={{ '.MuiDrawer-paper': { width: '320px', maxHeight: '100vh' } }}
    >
      <div className="flex justify-between items-center p-4">
        <h1 className="font-heading uppercase text-1xl ">produtos</h1>
        <IconButton onClick={() => setCartDrawerOpen(!cartDrawerOpen)}>
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
              className="bg-emerald-500 hover:bg-emerald-600 py-3 px-4 rounded-md text-white text-center  transition uppercase duration-200 w-full inline-block active:scale-105"
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

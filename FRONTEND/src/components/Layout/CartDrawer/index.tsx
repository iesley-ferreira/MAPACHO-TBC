import CloseIcon from '@mui/icons-material/Close';
import { Divider, Drawer, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store/ducks/rootReducer';
import CartList from '../../UI/CartList';
import CartSummary from '../../UI/CartSummary';

interface CartDrawerProps {
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (cartDrawerOpen: boolean) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ cartDrawerOpen, setCartDrawerOpen }) => {
  const navigate = useNavigate();
  const [navigateAfterClose, setNavigateAfterClose] = useState(false);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  const handleGoToCheckout = () => {
    setCartDrawerOpen(!cartDrawerOpen);
    setNavigateAfterClose(true);
  };

  useEffect(() => {
    if (!cartDrawerOpen && navigateAfterClose) {
      navigate('/envio');
      setNavigateAfterClose(false);
    }
  }, [navigateAfterClose]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0,
  );

  return (
    <Drawer
      anchor="right"
      open={cartDrawerOpen}
      onClose={() => setCartDrawerOpen(!cartDrawerOpen)}
      sx={{
        '.MuiDrawer-paper': {
          width: '100%',
          maxWidth: '540px',
          maxHeight: '100vh',
        },
      }}
    >
      <div className="flex justify-between items-center p-2">
        <h1 className="font-heading uppercase font-semibold text-2xl py-2 pl-3 mt-2">
          carrinho
        </h1>
        <IconButton onClick={() => setCartDrawerOpen(!cartDrawerOpen)}>
          <CloseIcon style={{ fontSize: '30px' }} />
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
          <div className="relative w-full px-8 py-8 shadow-[0px_-9px_12px_-3px_#0000001a]  bottom-0">
            <CartSummary totalPrice={totalPrice} onClose={handleGoToCheckout} />
          </div>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;

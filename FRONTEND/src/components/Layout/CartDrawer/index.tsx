import CloseIcon from '@mui/icons-material/Close';
import { Divider, Drawer, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/ducks/rootReducer';
import CartList from '../../UI/CartList';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  return (
    <Drawer
      anchor="right"
      open={open}
      sx={{ '.MuiDrawer-paper': { width: '320px', maxHeight: '100vh' } }}
    >
      <div className="flex justify-between items-center p-4">
        <h1 className="font-heading uppercase text-1xl ">produtos</h1>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      {cartItems.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4 }}>
          Carrinho vazio
        </Typography>
      ) : (
        <CartList cartItems={cartItems} onClose={onClose} />
      )}
    </Drawer>
  );
};

export default CartDrawer;

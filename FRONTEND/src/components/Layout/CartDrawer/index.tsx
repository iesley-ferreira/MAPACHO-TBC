import CloseIcon from '@mui/icons-material/Close'
import { Button, Divider, Drawer, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../store/ducks/rootReducer'
import CartList from '../../UI/CartList'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const navigate = useNavigate()
  const { items: cartItems } = useSelector((state: RootState) => state.cart)

  const handleGoToCart = () => {
    onClose()
    navigate('/carrinho')
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ '.MuiDrawer-paper': { width: '350px', maxHeight: '100vh' } }}
    >
      <div className="flex justify-between items-center p-4">
        <Typography variant="h6" sx={{ textAlign: 'center', flex: 1 }}>
          Produtos
        </Typography>
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
        <CartList cartItems={cartItems} showActions={false} />
      )}
      <div className="p-4">
        {cartItems.length !== 0 && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleGoToCart}
            sx={{
              background: 'linear-gradient(20deg, #0d5e53 0%, #14a098 100%)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(20deg, #0b4d45 0%, #12a38b 100%)',
              },
            }}
          >
            Ir para o Carrinho
          </Button>
        )}
      </div>
    </Drawer>
  )
}

export default CartDrawer

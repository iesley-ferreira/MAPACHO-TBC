import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartList from '../../components/UI/CartList'
import CartSummary from '../../components/UI/CartSummary'
import {
  decrementProductQuantity,
  incrementProductQuantity,
  removeProductFromCart,
} from '../../store/ducks/cart/actions'
import { RootState } from '../../store/ducks/rootReducer'

const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const { items: cartItems } = useSelector((state: RootState) => state.cart)

  const handleIncrement = (id: number) => {
    dispatch(incrementProductQuantity(id))
  }

  const handleDecrement = (id: number) => {
    dispatch(decrementProductQuantity(id))
  }

  const handleRemove = (id: number) => {
    dispatch(removeProductFromCart(id))
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 10 }}>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ textAlign: 'center' }}
      >
        Carrinho
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Carrinho vazio
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center" paddingTop={10}>
          <Grid item xs={12} md={8} spacing={3}>
            <CartList
              cartItems={cartItems}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
              showActions={true}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CartSummary
              totalPrice={cartItems.reduce(
                (total, item) => total + item.preco * item.quantidade,
                0
              )}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  )
}

export default Cart

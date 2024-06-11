import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import InstallmentPlan from '../InstallmentPlan'

interface CartSummaryProps {
  totalPrice: number
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalPrice }) => {
  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#f9f9f9',
        width: '100%',
        maxWidth: 420,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 2 }}
      >
        Resumo do Pedido
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          position: 'relative',
          maxWidth: '100%',
        }}
      >
        <Typography variant="body1" sx={{ textAlign: 'left' }}>
          Total:
        </Typography>
        <Box
          sx={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              height: '1px',
              backgroundColor: '#ccc',
              marginRight: '8px',
              marginLeft: '8px',
            }}
          />
          <Typography variant="body1">
            R$ {totalPrice.toFixed(2).replace('.', ',')}
          </Typography>
        </Box>
      </Box>
      <InstallmentPlan totalPrice={totalPrice} />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          background: 'linear-gradient(20deg, #0d5e53 0%, #14a098 100%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(20deg, #0b4d45 0%, #12a38b 100%)',
          },
          marginTop: 2,
        }}
      >
        Fechar Pedido
      </Button>
    </Box>
  )
}

export default CartSummary

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, IconButton, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { ICartItem } from '../../../interfaces/Cart'

interface CartListProps {
  cartItems: ICartItem[]
  onIncrement?: (id: number) => void
  onDecrement?: (id: number) => void
  onRemove?: (id: number) => void
  showActions?: boolean
}

const defaultImageURL = '/public/assets/noImageAvailable.png'

const CartList: React.FC<CartListProps> = ({
  cartItems,
  onIncrement,
  onDecrement,
  onRemove,
  showActions = true,
}) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
      <List>
        {cartItems.map((product: ICartItem, index: number) => (
          <ListItem
            key={index}
            alignItems="flex-start"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Box display="flex" alignItems="center" width="100%">
              <img
                src={product.imagemURL || defaultImageURL}
                alt={product.nome}
                style={{
                  width: 76,
                  height: 76,
                  marginRight: 16,
                  objectFit: 'cover',
                  borderRadius: '6px',
                }}
              />
              <Box flex="1">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '210px',
                  }}
                >
                  {product.nome}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Typography variant="body1" color="textSecondary">
                    R$ {product.preco.toFixed(2).replace('.', ',')}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    width="100%"
                    mt={1}
                  >
                    {showActions ? (
                      <Box display="flex" alignItems="center">
                        <IconButton onClick={() => onDecrement?.(product.id)}>
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="body1" sx={{ margin: '0 8px' }}>
                          {product.quantidade}
                        </Typography>
                        <IconButton onClick={() => onIncrement?.(product.id)}>
                          <AddIcon />
                        </IconButton>
                        <IconButton onClick={() => onRemove?.(product.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Quantidade: {product.quantidade}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default CartList

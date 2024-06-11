import InfoIcon from '@mui/icons-material/Info'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { IProduct } from '../../../interfaces/Product'
import { addProductToCart } from '../../../store/ducks/cart/actions'
import InstallmentPlan from '../InstallmentPlan'

interface IProductCardProps {
  productData: IProduct
}

const defaultImageURL = '/public/assets/noImageAvailable.png'

const ProductCard: React.FC<IProductCardProps> = ({ productData }) => {
  const dispatch = useDispatch()
  const isMobile = useMediaQuery('(max-width: 640px)')

  const handleAddToCart = () => {
    dispatch(addProductToCart(productData))
  }

  return (
    <Card
      sx={{
        minWidth: isMobile ? 320 : 340,
        maxWidth: isMobile ? 360 : 345,
        height: '100%',
        margin: 'auto',
        transition: 'transform 0.3s, box-shadow 0.3s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={productData.imagemURL || defaultImageURL}
        alt={productData.nome}
        sx={{
          maxHeight: 300,
          padding: 2,
          objectFit: 'contain',
        }}
      />
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
            height: '3em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {productData.nome}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ color: 'text.secondary', mt: 1 }}
        >
          R$ {productData.preco.toFixed(2).replace('.', ',')}
        </Typography>
        <InstallmentPlan totalPrice={productData.preco} />
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(20deg, #0d5e53 0%, #14a098 100%)',
            color: '#fff',
            '&:hover': {
              background: 'linear-gradient(20deg, #0b4d45 0%, #12a38b 100%)',
            },
          }}
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
        >
          Add ao carrinho
        </Button>
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(20deg, #f3af16 0%, #ffcc33 100%)',
            color: '#fff',
            '&:hover': {
              background: 'linear-gradient(20deg, #e09913 0%, #e0b127 100%)',
            },
          }}
          startIcon={<InfoIcon />}
        >
          Ver
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard

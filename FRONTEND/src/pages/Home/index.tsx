import { Box, CircularProgress, Container } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BannerCarousel from '../../components/Layout/BannerCarousel'
import Products from '../../components/UI/Products/Products'
import { fetchProductsRequest } from '../../store/ducks/products/actions'
import { RootState } from '../../store/ducks/rootReducer'

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  )

  useEffect(() => {
    dispatch(fetchProductsRequest())
  }, [])

  if (error) {
    return <div>Erro ao carregar os produtos</div>
  }

  return (
    <>
      <div className="mt-20">
        <BannerCarousel />
      </div>
      <Container
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '55vh',
            }}
          >
            <CircularProgress sx={{ color: 'darkgreen' }} />
          </Box>
        ) : (
          <Products products={products} />
        )}
      </Container>
    </>
  )
}

export default Home

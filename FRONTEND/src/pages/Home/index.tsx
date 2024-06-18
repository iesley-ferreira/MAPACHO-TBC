import { Box, CircularProgress, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BannerCarousel from '../../components/Layout/BannerCarousel';
import Products from '../../components/UI/Products/Products';
import { fetchProductsRequest } from '../../store/ducks/products/actions';
import { RootState } from '../../store/ducks/rootReducer';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { products, filteredProducts, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, []);

  return (
    <>
      <div className="mt-20">
        <BannerCarousel />
      </div>
      {error && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '55vh',
          }}
        >
          <h1>Erro ao carregar os produtos</h1>
        </Box>
      )}
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
          <Products
            products={filteredProducts.length > 0 ? filteredProducts : products}
          />
        )}
      </Container>
    </>
  );
};

export default Home;

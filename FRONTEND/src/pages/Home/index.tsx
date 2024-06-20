import { Box, Button, CircularProgress, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BannerCarousel from '../../components/Layout/BannerCarousel';
import Products from '../../components/UI/Products/Products';
import CategoryBreadcrumbs from '../../components/common/CategoryBreadcrumbs';
import { fetchProductsRequest, setPage } from '../../store/ducks/products/actions';
import { RootState } from '../../store/ducks/rootReducer';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const {
    products,
    filteredProducts,
    loading,
    error,
    page,
    disableButtonShowMore,
    selectedCategoryId,
    selectedCategoryName,
    selectedSubCategoryName,
    searchValue,
  } = useSelector((state: RootState) => state.products);
  const { subcategoryId, categoryId } = useParams<{
    subcategoryId?: string;
    categoryId?: string;
  }>();

  useEffect(() => {
    const category = subcategoryId || categoryId || null;
    dispatch(fetchProductsRequest({ page, limit: 4, categoryId: category, searchValue }));
  }, [page]);

  const loadMoreProducts = () => {
    dispatch(setPage(page + 1));
  };

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
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CategoryBreadcrumbs
          selectedCategoryName={selectedCategoryName}
          selectedSubCategoryName={selectedSubCategoryName}
          searchValue={searchValue}
          selectedCategoryId={selectedCategoryId}
        />
        <Products
          products={
            filteredProducts.length > 0 || selectedCategoryId
              ? filteredProducts
              : products
          }
        />
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
          <>
            <Button
              onClick={loadMoreProducts}
              disabled={disableButtonShowMore}
              sx={{ mb: 10 }}
            >
              Mostrar Mais Produtos
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;

import { Box, Button, CircularProgress, Container } from '@mui/material';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BannerCarousel from '../../components/Layout/BannerCarousel';
import Products from '../../components/UI/Products/Products';
import CategoryBreadcrumbs from '../../components/common/CategoryBreadcrumbs';
import { fetchProductsRequest, setPage } from '../../store/ducks/products/actions';
import { RootState } from '../../store/ducks/rootReducer';
import Product from '../Product';

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

  const location = useLocation();
  const { idCategoria, idSubCategoria, idProduto } = queryString.parse(location.search);

  const categoriaId = Array.isArray(idCategoria) ? idCategoria[0] : idCategoria;
  const subCategoriaId = Array.isArray(idSubCategoria)
    ? idSubCategoria[0]
    : idSubCategoria;
  const produtoId = Array.isArray(idProduto) ? idProduto[0] : idProduto;

  useEffect(() => {
    console.log('CHAMOU HOME', page);
    const category = subCategoriaId || categoriaId || null;
    dispatch(
      fetchProductsRequest({
        page,
        limit: 20,
        categoryId: category?.toString(),
        searchValue,
      }),
    );
  }, [page, subCategoriaId, categoriaId]);

  const loadMoreProducts = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <>
      {produtoId ? (
        <Product productId={produtoId} />
      ) : (
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
      )}
    </>
  );
};

export default Home;

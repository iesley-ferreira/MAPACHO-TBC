import { Box, Button, CircularProgress } from '@mui/material';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BannerCarousel from '../../components/Layout/BannerCarousel';
import InstagramCarousel from '../../components/UI/InstagramCarousel';
import Menu from '../../components/UI/Menu';
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
          <div className="flex flex-col items-center w-full">
            <div className="w-full md:max-w-[94%] xl:max-w-[88%] pt-8 md:pt-14 lg:pt-20">
              <div className="flex flex-row justify-center md:gap-4 lg:gap-10 xl:gap-20">
                <div className="left-16 min-w-max pt-0 hidden lg:block">
                  <Menu />
                </div>
                <div className="flex flex-col items-center lg:justify-start w-full">
                  <div className="w-full">
                    <CategoryBreadcrumbs
                      selectedCategoryName={selectedCategoryName}
                      selectedSubCategoryName={selectedSubCategoryName}
                      searchValue={searchValue}
                      selectedCategoryId={selectedCategoryId}
                    />
                    {loading ? (
                      <div className="flex items-center justify-center w-full min-h-[60vh]">
                        <CircularProgress sx={{ color: 'darkgreen' }} />
                      </div>
                    ) : (
                      <>
                        <Products
                          products={
                            filteredProducts.length > 0 || selectedCategoryId
                              ? filteredProducts
                              : products
                          }
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="sticky top-2 hidden xl:block">
                  <InstagramCarousel />
                </div>
              </div>
            </div>
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
                  sx={{
                    my: 8,
                    color: 'rgb(5 150 105)',
                    '&:disabled': {
                      color: 'GrayText',
                    },
                    '&:hover': {
                      backgroundColor: 'inherit',
                      color: 'rgb(5 150 105)',
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  Mostrar Mais Produtos
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;

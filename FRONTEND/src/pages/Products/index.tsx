import { Box, CircularProgress } from '@mui/material';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import BannerCarousel from '../../components/Layout/BannerCarousel';
import InstagramCarousel from '../../components/UI/InstagramCarousel';
import Menu from '../../components/UI/Menu';
import Product from '../../components/UI/Product';
import ProductsList from '../../components/UI/ProductsList';
import CategoryBreadcrumbs from '../../components/common/CategoryBreadcrumbs';
import ShowMoreProductsButton from '../../components/common/ShowMoreProductsButton/ShowMoreProductsButton';
import { fetchProductsRequest, setPage } from '../../store/ducks/products/actions';
import { RootState } from '../../store/ducks/rootReducer';

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const [prevItemsLength, setPrevItemsLength] = useState(0);
  const {
    products,
    filteredProducts,
    loading,
    error,
    page,
    isShowMoreProductsButtonDisabled,
    selectedCategoryId,
    selectedCategoryName,
    selectedSubCategoryName,
    searchValue,
  } = useSelector((state: RootState) => state.products);
  const { items } = useSelector((state: RootState) => state.cart);
  const location = useLocation();
  const { idCategoria, idSubCategoria, idProduto } = queryString.parse(location.search);

  useEffect(() => {
    if (items.length > 0) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Adicionado ao carrinho.',
      });
    }
  }, [items]);

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
            <div className="w-full md:max-w-[94%] xl:max-w-[90%] pt-8 md:pt-14 lg:pt-20">
              <div className="flex flex-row justify-center md:gap-4 lg:gap-10 xl:gap-20">
                <div className="left-16 min-w-max pt-0 hidden lg:block">
                  <div className="sticky top-20 max-h-[90vh] overflow-y-auto custom-scrollbar">
                    <h1 className="font-heading uppercase font-semibold text-green-900 pl-6 pb-2 text-1xl ">
                      Categorias
                    </h1>
                    <Menu />
                  </div>
                </div>
                <div className="flex flex-col items-center lg:justify-start w-full">
                  <div className="w-full">
                    {loading ? (
                      <div className="flex items-center justify-center w-full min-h-[60vh]">
                        <CircularProgress sx={{ color: 'darkgreen' }} />
                      </div>
                    ) : (
                      <main>
                        <CategoryBreadcrumbs
                          selectedCategoryName={selectedCategoryName}
                          selectedSubCategoryName={selectedSubCategoryName}
                          searchValue={searchValue}
                          selectedCategoryId={selectedCategoryId}
                        />
                        <ProductsList
                          products={
                            filteredProducts.length > 0 || selectedCategoryId
                              ? filteredProducts
                              : products
                          }
                        />
                      </main>
                    )}
                  </div>
                </div>
                <div className="sticky top-2 hidden xl:block">
                  <InstagramCarousel />
                </div>
              </div>
            </div>
            <div>
              <ShowMoreProductsButton
                loading={loading}
                loadMoreProducts={loadMoreProducts}
                isShowMoreProductsButtonDisabled={isShowMoreProductsButtonDisabled}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;

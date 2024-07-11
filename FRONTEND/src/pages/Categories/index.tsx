import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import InstagramCarousel from '../../components/UI/InstagramCarousel';
import Menu from '../../components/UI/Menu';
import Product from '../../components/UI/Product';
import ProductsList from '../../components/UI/ProductsList';
import CategoryBreadcrumbs from '../../components/common/CategoryBreadcrumbs';
import ShowMoreProductsButton from '../../components/common/ShowMoreProductsButton/ShowMoreProductsButton';
import SubCategoryCard from '../../components/common/SubCategoryCard';
import { IFormattedCategory, IFormattedSubcategory } from '../../interfaces/Category';
import { fetchProductsRequest, setPage } from '../../store/ducks/products/actions';
import { RootState } from '../../store/ducks/rootReducer';

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('idCategoria');
  const subCategoryId = queryParams.get('idSubCategoria');
  const categoryNameFromURL = decodeURIComponent(location.pathname.split('/')[2]);
  const productsListRef = useRef<HTMLDivElement>(null);

  const produtoId = queryParams.get('idProduto');
  const [category, setCategory] = useState<IFormattedCategory>({
    id: '',
    description: '',
    subcategories: [],
  });
  const [subCategories, setSubCategories] = useState<IFormattedSubcategory[]>([]);

  const {
    page,
    error,
    loading,
    filteredProducts,
    selectedCategoryId,
    isShowMoreProductsButtonDisabled,
    selectedCategoryName,
    selectedSubCategoryName,
    products,
    searchValue,
  } = useSelector((state: RootState) => state.products);

  const { formattedCategories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (categoryId && subCategoryId) {
      dispatch(
        fetchProductsRequest({
          page,
          limit: 24,
          categoryId: subCategoryId,
          searchValue,
        }),
      );
    }
    if (categoryId && !subCategoryId) {
      dispatch(
        fetchProductsRequest({
          page,
          limit: 24,
          categoryId: categoryId,
          searchValue,
        }),
      );
    }
  }, [page, categoryId, subCategoryId]);

  productsListRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => {}, [categoryId, subCategoryId]);

  useEffect(() => {
    const category = formattedCategories.find(
      (category: IFormattedCategory) => category.id === categoryId,
    );
    if (category) {
      setCategory(category);
      const subCategories = category?.subcategories;
      setSubCategories(subCategories ?? []);
    }
  }, [categoryId, subCategoryId, formattedCategories]);

  const loadMoreProducts = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <div className="min-h-screen w-full">
      <section className="pt-24 pb-4 md:pb-24 bg-blueGray-950">
        {/* <ScrollToTop /> */}
        <div className="flex flex-col items-center lg:px-10 w-full ">
          <div className="text-center w-fit pb-8 pt-4 my-4 ">
            <h2 className="font-heading font-bold uppercase mb-2 md:mb-4 text-2xl md:text-4xl lg:text-5xl text-slate-800 tracking-8xl mx-auto">
              {categoryNameFromURL}
            </h2>
            <div className="h-[8px] bg-blueGray-800">
              <div className="h-full w-4/6 bg-yellow-500 "></div>
            </div>
          </div>
          <div className="flex flex-wrap justify-around w-full ">
            {subCategories?.map((subCategory) => (
              <SubCategoryCard
                key={subCategory.id}
                subcategory={subCategory}
                category={category}
                image={`/public/assets/images/categories/${(category?.description).replace(/\s+/g, '')}/${subCategory?.id}.jpg`}
                // onClick={handleSubCategoryClick}
              />
            ))}
          </div>
        </div>
      </section>
      <>
        {produtoId ? (
          <Product productId={produtoId} />
        ) : (
          <>
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
            <div className="flex flex-col items-center w-full lg:pb-20">
              <div className="w-full md:max-w-[94%] xl:max-w-[90%] pt-8 md:pt-14 lg:pt-20">
                <div className="flex flex-row justify-center md:gap-4 lg:gap-10 xl:gap-20">
                  <div className="left-16 min-w-max pt-0 hidden lg:block">
                    <div className="sticky top-20 max-h-[90vh] overflow-y-auto custom-scrollbar">
                      <h1 className="font-heading uppercase font-semibold pl-6 pb-2  text-4xl lg:text-3xl text-slate-800 tracking-8xl mx-auto">
                        Categorias
                      </h1>
                      <Menu />
                    </div>
                  </div>
                  <div
                    className="flex flex-col items-center lg:justify-start w-full"
                    ref={productsListRef}
                  >
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
    </div>
  );
};

export default Categories;

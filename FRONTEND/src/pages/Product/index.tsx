import { Box, CircularProgress, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import CalculateFreight from '../../components/UI/CalculateFreight';
import InstallmentPlan from '../../components/UI/InstallmentPlan';
import QuantityControl from '../../components/UI/Product/QuantityControl';
import { convertProductIdToProduct } from '../../components/UI/Product/helpers';
import { addProductToCart } from '../../store/ducks/cart/actions';
import { fetchProductRequest } from '../../store/ducks/products/actions';
import { RootState } from '../../store/ducks/rootReducer';
import ScrollToTop from '../../utils/ScrollToTop';
import { priceFormatter } from '../../utils/priceFormatter';
import './description.css';
import { IFullProduct, VariationType } from '../../interfaces/Product';

const Product: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState<number>(0);

  const { formattedCategories } = useSelector((state: RootState) => state.categories);
  const { product, loading, error } = useSelector((state: RootState) => state.products);
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get('idProduto');
  const idCategory = queryParams.get('idCategoria');
  const idSubCategory = queryParams.get('idSubCategoria');

  const categoryName = formattedCategories.find(
    (category) => category.id === idCategory,
  )?.description;

  useEffect(() => {
    if (!productId) return;
    dispatch(fetchProductRequest(productId));
  }, [productId]);

  useEffect(() => {
    if (product?.variacoes?.length > 0) {
      setSelectedVariation(product.variacoes[0].id);
    }
  }, [product]);

  const variationName = product?.variacoes?.[0]?.nome;
  let variationType = '';

  if (variationName) {
    const parts = variationName.split(':');
    if (parts.length > 1) {
      const beforeColon = parts[0].trim();
      const words = beforeColon.split(' ');
      variationType = words[words.length - 1];
    }
  }

  const variationsOptions: VariationType[] =
    product?.variacoes?.map((variacao: IFullProduct) => {
      const parts = variacao.nome.split(':');
      return {
        variationId: variacao.id,
        variationType,
        variationName: parts[1]?.trim() || '',
      };
    }) || [];

  console.log('VariationOptions', variationsOptions);

  // const variationsImages = product?.variacoes?.map((variacao) => ({
  //   variationId: variacao.id,
  //   image: variacao.midia?.imagens?.externas[0]?.link || '',
  // }));

  const handleAddToCart = () => {
    const variationString = `${variationType}: ${
      variationsOptions.find((variation) => variation.variationId === selectedVariation)
        ?.variationName
    }`;

    console.log('VariationString', variationString);

    const productToAdd = convertProductIdToProduct(
      product,
      selectedVariation,
      variationString,
    );

    dispatch(addProductToCart({ product: productToAdd, quantidade: productQuantity }));
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-black"> not found</span>
      </div>
    );
  }

  const handleKeepBuying = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('idProduto');
    const newUrl = `/categoria/${categoryName}${url.search}`;
    navigate(newUrl);
  };

  const description = product?.descricaoCurta;

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  // };

  return (
    <section className="py-6 px-2 md:py-20 mt-14">
      <ScrollToTop />
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh',
          }}
        >
          <CircularProgress sx={{ color: 'darkgreen' }} />
        </Box>
      ) : (
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-around -mx-4 mb-2">
            <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
              <div className="relative mb-10 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-2xl h-[400px] md:h-[500px] lg:h-[600px] p-16">
                <img
                  className="object-cover w-full h-full"
                  style={{ objectFit: 'contain' }}
                  src={
                    product?.midia?.imagens?.externas[0]?.link ||
                    '/public/assets/noImageAvailable.png'
                  }
                  alt="Product"
                />
              </div>
              <div className="flex align-center max-w-[500px] content-center md:justify-center flex-wrap -mx-2">
                {/* <Slider {...settings}>
                  {variationsImages?.map((variation, index) => (
                    <div
                      key={index}
                      className="flex justify-center h-28 w-28 p-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg ml-3"
                    >
                      <img
                        className="object-cover h-auto"
                        src={variation.image || '/public/assets/noImageAvailable.png'}
                        alt={variation.variationId.toString()}
                      />
                    </div>
                  ))}
                </Slider> */}
              </div>
            </div>
            <div className="w-full max-w-xl md:w-1/2 px-4 bg-gray-200 bg-opacity-0 rounded-xl  backdrop-blur-md border border-gray-200 border-opacity-30 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
              <div className="p-10">
                <div className="mb-10 mt-4 border-b border-gray-400">
                  <h1 className="text-rhino-700 font-semibold text-4xl mb-8 font-heading">
                    {product?.nome}
                  </h1>
                  <div className="flex items-center mb-8 gap-3">
                    <p className="inline-block  text-3xl font-bold font-heading text-green-500">
                      <span>{priceFormatter.format(product?.preco)}</span>
                    </p>
                    <InstallmentPlan totalPrice={product?.preco} />
                  </div>
                </div>
                <div className="flex items-center justify-between flex-wrap mb-8">
                  <div className="w-full">
                    <div className="mb-4">
                      <div className="flex gap-4 mb-10">
                        <div>
                          <p className="uppercase text-xs font-bold text-rhino-500 mb-3">
                            QUANTIDADE
                          </p>
                          <QuantityControl
                            productQuantity={productQuantity}
                            setProductQuantity={setProductQuantity}
                          />
                        </div>
                        {product?.variacoes?.length > 0 && (
                          <div>
                            <p className="uppercase text-xs font-bold text-rhino-500 mb-3">
                              {variationType}
                            </p>
                            <Select
                              value={selectedVariation}
                              onChange={(e) =>
                                setSelectedVariation(e.target.value as number)
                              }
                              displayEmpty
                              fullWidth
                              variant="outlined"
                              color="success"
                              sx={{
                                minWidth: 120,
                              }}
                            >
                              {variationsOptions.map(
                                (variation: VariationType, index: number) => (
                                  <MenuItem key={index} value={variation.variationId}>
                                    {variation.variationName}
                                  </MenuItem>
                                ),
                              )}
                            </Select>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-4 flex flex-wrap gap-4">
                      <button
                        className="uppercase inline-block flex-1 w-full px-3 py-4 rounded-md text-center text-emerald-500 border border-emerald-500 text-sm font-medium bg-transparent hover:bg-emerald-100 active:scale-105 transition duration-200"
                        onClick={handleKeepBuying}
                      >
                        Continuar comprando
                      </button>
                    </div>
                    <div className="mb-8 flex flex-wrap gap-4">
                      <button
                        className="uppercase inline-block flex-1 w-full px-3 py-4 rounded-md text-center text-white text-sm font-medium bg-emerald-500 hover:bg-emerald-600 active:scale-105 transition duration-200"
                        onClick={handleAddToCart}
                      >
                        Adicionar ao carrinho
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap w-full mb-8">
                  <div className="flex-1">
                    <div className="w-full h-full border-b border-gray-400"></div>
                  </div>
                </div>
                <CalculateFreight />
              </div>
            </div>
          </div>
          {description && (
            <>
              <div className="flex flex-wrap w-full mb-8">
                <div className="flex-1">
                  <div className="w-full h-full border-b border-gray-400"></div>
                </div>
              </div>
              <div>
                <h2 className="font-semibold text-4xl underline-heading">Descrição:</h2>
                <div
                  className="product-description"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'black' }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'black' }}
      onClick={onClick}
    />
  );
};

export default Product;

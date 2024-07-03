import { Box, CircularProgress, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductToCart } from '../../../store/ducks/cart/actions';
import { fetchProductRequest } from '../../../store/ducks/products/actions';
import { RootState } from '../../../store/ducks/rootReducer';
import ScrollToTop from '../../../utils/ScrollToTop';
import { priceFormatter } from '../../../utils/priceFormatter';
import CalculateFreight from '../CalculateFreight';
import InstallmentPlan from '../InstallmentPlan';
import QuantityControl from './QuantityControl';
import './description.css';
import { convertProductIdToProduct } from './helpers';
// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

type ProductProps = {
  productId: string;
};

const Product: React.FC<ProductProps> = ({ productId }) => {
  // const query = useQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState<number | null>(null);

  const { product, loading, error } = useSelector((state: RootState) => state.products);

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

  const variationsOptions =
    product?.variacoes?.map((variacao) => {
      const parts = variacao.nome.split(':');
      return {
        variationId: variacao.id,
        name: parts[1]?.trim() || '',
      };
    }) || [];

  const variationsImages = product?.variacoes?.map((variacao) => {
    return {
      variationId: variacao.id,
      image: variacao.midia?.imagens?.externas[0]?.link || '',
    };
  });

  const handleAddToCart = () => {
    const productToAdd = convertProductIdToProduct(product);
    dispatch(addProductToCart({ product: productToAdd, quantidade: productQuantity }));
    navigate('/carrinho');
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-black">Product not found</span>
      </div>
    );
  }

  const handleKeepBuying = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('idProduto');
    window.location.href = url.toString();
  };

  const description = product?.descricaoCurta;

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
          <div className="flex flex-wrap -mx-4 mb-2">
            <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
              <div className="relative mb-10" style={{ height: '400px' }}>
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
              <div className="flex align-center content-center md:justify-center flex-wrap -mx-2">
                {variationsImages?.map((variation, index) => (
                  <div key={index} className="w-1/2 sm:w-1/4 p-2">
                    <img
                      className="object-cover"
                      src={variation.image || '/public/assets/noImageAvailable.png'}
                      alt="Product Thumbnail"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full max-w-xl md:w-1/2 px-4">
              <div className="lg:pl-20">
                <div className="mb-10 pb-10 border-b">
                  <h1 className="text-rhino-700 font-semibold text-4xl mb-2 font-heading">
                    {product?.nome}
                  </h1>

                  <p className="inline-block mb-8 text-2xl font-bold font-heading text-green-500">
                    <span>{priceFormatter.format(product?.preco)}</span>
                  </p>
                  <InstallmentPlan totalPrice={product?.preco} />
                  {/* <p className="max-w-md text-gray-500">{product?.descricaoCurta}</p> */}
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
                              sx={{ minWidth: 120 }}
                            >
                              {variationsOptions.map((variation, index) => (
                                <MenuItem key={index} value={variation.variationId}>
                                  {variation.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-4 flex flex-wrap gap-4">
                      <button
                        className="uppercase inline-block flex-1 w-full px-3 py-4 rounded-md text-center text-emerald-500 border border-emerald-500 text-sm font-medium bg-white hover:bg-emerald-100 active:scale-105 transition duration-200"
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
                    <div className="w-full h-full border-b border-rhino-200"></div>
                  </div>
                </div>
                <CalculateFreight />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap w-full mb-8">
            <div className="flex-1">
              <div className="w-full h-full border-b border-rhino-200"></div>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-4xl underline-heading">Descrição:</h2>
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;

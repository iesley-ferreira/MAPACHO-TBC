import { Box, CircularProgress, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import CalculateFreight from '../../components/UI/CalculateFreight'
import InstallmentPlan from '../../components/UI/InstallmentPlan'
import AddIcon from '../../components/common/AddIcon'
import RemoveIcon from '../../components/common/RemoveIcon'
import { addProductToCart } from '../../store/ducks/cart/actions'
import { fetchProductRequest } from '../../store/ducks/products/actions'
import { RootState } from '../../store/ducks/rootReducer'
import { convertProductIdToProduct } from './helpers'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Product: React.FC = () => {
  const query = useQuery()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productId = query.get('idProduto')
  const [productQuantity, setProductQuantity] = useState(1)

  const { product, loading, error } = useSelector(
    (state: RootState) => state.products
  )

  useEffect(() => {
    if (!productId) return
    dispatch(fetchProductRequest(productId))
  }, [productId])

  const variationName = product?.variacoes?.[0]?.nome
  let variationType = ''

  if (variationName) {
    const parts = variationName.split(':')
    if (parts.length > 1) {
      const beforeColon = parts[0].trim()
      const words = beforeColon.split(' ')
      variationType = words[words.length - 1]
    }
  }

  const variationsOptions =
    product?.variacoes?.map((variacao) => {
      const parts = variacao.nome.split(':')
      return {
        variationId: variacao.id,
        name: parts[1]?.trim() || '',
      }
    }) || []

  const variationsImages = product?.variacoes?.map((variacao) => {
    return {
      variationId: variacao.id,
      image: variacao.midia?.imagens?.externas[0]?.link || '',
    }
  })

  const handleAddToCart = () => {
    const productToAdd = convertProductIdToProduct(product)
    dispatch(
      addProductToCart({ product: productToAdd, quantidade: productQuantity })
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-black">Product not found</span>
      </div>
    )
  }

  return (
    <section className="py-6 md:py-20 mt-14">
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
          <div className="flex flex-wrap -mx-4 mb-24">
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
                      src={
                        variation.image || '/public/assets/noImageAvailable.png'
                      }
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
                    <span>R$ </span>
                    <span>{product?.preco?.toFixed(2).replace('.', ',')}</span>
                  </p>
                  <InstallmentPlan totalPrice={product?.preco} />
                  <p className="max-w-md text-gray-500">
                    {product?.descricaoCurta}
                  </p>
                </div>
                <div className="flex items-center justify-between flex-wrap mb-8">
                  <div className="w-full">
                    <div className="mb-4">
                      <div className="flex gap-4 mb-10">
                        <div>
                          <p className="uppercase text-xs font-bold text-rhino-500 mb-3">
                            QUANTIDADE
                          </p>
                          <div className="py-3 px-4 rounded-sm border border-coolGray-200 gap-4 flex items-center">
                            <div className="cursor-pointer text-coolGray-300 hover:text-coolGray-400 transition duration-200">
                              <IconButton
                                onClick={() =>
                                  setProductQuantity(productQuantity - 1)
                                }
                                disabled={productQuantity === 1}
                              >
                                <RemoveIcon />
                              </IconButton>
                            </div>
                            <span className="text-coolGray-700 text-md">
                              {productQuantity}
                            </span>
                            <div className="cursor-pointer text-coolGray-300 hover:text-coolGray-400 transition duration-200">
                              <IconButton
                                onClick={() =>
                                  setProductQuantity(productQuantity + 1)
                                }
                              >
                                <AddIcon />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                        {product?.variacoes?.length > 0 && (
                          <div>
                            <p className="uppercase text-xs font-bold text-rhino-500 mb-3">
                              {variationType}
                            </p>
                            <select className="rounded-sm border bg-white border-coolGray-200 py-4 px-4 text-coolGray-700 text-sm">
                              {variationsOptions?.map((variation, index) => (
                                <option
                                  key={index}
                                  value={variation.variationId}
                                >
                                  {variation.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-4 flex flex-wrap gap-4">
                      <button
                        className="uppercase inline-block flex-1 w-full px-3 py-4 rounded-sm text-center text-green-500 border border-green-500 text-sm font-medium bg-white hover:bg-green-100 transition duration-200"
                        onClick={() => navigate(-1)}
                      >
                        Continuar comprando
                      </button>
                    </div>
                    <div className="mb-8 flex flex-wrap gap-4">
                      <button
                        className="uppercase inline-block flex-1 w-full px-3 py-4 rounded-sm text-center text-white text-sm font-medium bg-green-500 hover:bg-green-600 transition duration-200"
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
        </div>
      )}
    </section>
  )
}

export default Product

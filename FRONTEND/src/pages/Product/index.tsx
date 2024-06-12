import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import InstallmentPlan from '../../components/UI/InstallmentPlan'
import { fetchProductRequest } from '../../store/ducks/products/actions'
import { RootState } from '../../store/ducks/rootReducer'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Product: React.FC = () => {
  const query = useQuery()
  const dispatch = useDispatch()
  const productId = query.get('idProduto')
  const [productQuantity, setProductQuantity] = useState(0)
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
      image: variacao.midia?.imagens?.externas[0].link || '',
    }
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <section className="py-20 mt-14">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4 mb-24">
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <div className="relative mb-10" style={{ height: '400px' }}>
              <img
                className="object-cover w-full h-full"
                style={{ objectFit: 'contain' }}
                src={
                  product?.midia?.imagens?.externas[0].link ||
                  '/public/assets/noImageAvailable.png'
                }
                alt="Product"
              />
            </div>
            <div className="flex flex-wrap -mx-2">
              {variationsImages?.map((variation, index) => (
                <div className="w-1/2 sm:w-1/4 p-2">
                  <a
                    key={index}
                    className="block border border-blue-300"
                    href="#"
                  >
                    <img
                      className="w-full h-32 object-cover"
                      src={variation.image}
                      alt="Product Thumbnail"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <div className="lg:pl-20">
              <div className="mb-10 pb-10 border-b">
                <h2 className="mt-2 mb-6 max-w-xl text-2xl md:text-4xl font-bold font-heading">
                  {product?.nome}
                </h2>
                <p className="inline-block mb-8 text-2xl font-bold font-heading text-green-500">
                  <span>R$ </span>
                  <span>{product?.preco?.toFixed(2).replace('.', ',')}</span>
                </p>
                <InstallmentPlan totalPrice={product?.preco} />
                <p className="max-w-md text-gray-500">
                  {product.descricaoCurta}
                </p>
              </div>
              <div className="flex mb-12">
                <div className="mr-6">
                  <span className="block mb-4 font-bold font-heading text-gray-400 uppercase">
                    QTD
                  </span>
                  <div className="inline-flex items-center px-4 font-semibold font-heading text-gray-500 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md">
                    <IconButton
                      onClick={() => setProductQuantity(productQuantity - 1)}
                      disabled={productQuantity === 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <div className="flex justify-center w-12 m-0 px-2 py-4 text-center md:text-right border-0 rounded-md bg-slate-100">
                      {productQuantity}
                    </div>
                    <IconButton
                      onClick={() => setProductQuantity(productQuantity + 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                </div>
                <div>
                  <span className="block mb-4 font-bold font-heading text-gray-400 uppercase">
                    {variationType}
                  </span>
                  <select
                    className="pl-6 pr-10 py-4 font-semibold font-heading text-gray-500 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md bg-slate-100"
                    name="size"
                    id="size"
                  >
                    {variationsOptions?.map((variation, index) => (
                      <option key={index} value={variation.variationId}>
                        {variation.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap -mx-4 mb-14 items-center">
                <div className="w-full xl:w-2/3 px-4 mb-4 xl:mb-0">
                  <a
                    className="block bg-orange-300 hover:bg-orange-400 text-center text-white font-bold font-heading py-5 px-8 rounded-md uppercase transition duration-200"
                    href="#"
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Product

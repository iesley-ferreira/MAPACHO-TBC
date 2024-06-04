import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsRequest } from '../../../actions/actionTypes'
import { AppDispatch, RootState } from '../../../store'
import ProductCard from '../ProductCard'

const Products: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { products, isLoading, error } = useSelector(
    (state: RootState) => state.products
  )

  useEffect(() => {
    dispatch(fetchProductsRequest())
  }, [dispatch])

  return (
    <div className="container mx-auto mt-10">
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      <Grid container spacing={2}>
        {Array.isArray(products) &&
          products.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              ml={2}
              mr={2}
              key={product.id}
            >
              <ProductCard productData={product} />
            </Grid>
          ))}
      </Grid>
    </div>
  )
}

export default Products

import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsRequest } from '../../../store/ducks/products/actions'
import { Product } from '../../../store/ducks/products/types'
import { RootState } from '../../../store/ducks/rootReducer'
import ProductCard from '../ProductCard'

const Products: React.FC = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  )

  useEffect(() => {
    dispatch(fetchProductsRequest())
  }, [dispatch])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto mt-10">
      <Grid container spacing={2}>
        {products.map((product: Product) => {
          return (
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
          )
        })}
      </Grid>
    </div>
  )
}

export default Products

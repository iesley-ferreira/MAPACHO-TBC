import { Container, Grid } from '@mui/material'
import React from 'react'
import { IProduct } from '../../../interfaces/Product'
import ProductCard from '../ProductCard'

interface ProductsProps {
  products: IProduct[]
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product: IProduct) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard productData={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Products

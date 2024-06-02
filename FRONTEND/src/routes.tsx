import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Products from './components/Products'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import Product from './pages/Product/index'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Products />} />
        <Route path="product" element={<Product />} />
        <Route path="payment" element={<Payment />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import Payment from './pages/Payment'
import Product from './pages/Product/index'
import Register from './pages/Register'
import Shipping from './pages/Shipping'
import Success from './pages/Success/Success'
import User from './pages/User'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="produto" element={<Product />} />
        <Route path="cadastro" element={<Register />} />
        <Route path="usuario" element={<User />} />
        <Route path="login" element={<Login />} />
        <Route path="carrinho" element={<Cart />} />
        <Route path="envio" element={<Shipping />} />
        <Route path="pagamento" element={<Payment />} />
        <Route path="comprafinalizada" element={<Success />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes

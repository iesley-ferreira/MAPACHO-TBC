import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthInitializer from './AuthInitializer';
import Layout from './components/Layout';
import Loader from './components/common/Loader';
import ProtectedRoute from './components/common/ProtectedRoute';
import Auth from './pages/Auth';
import Categories from './pages/Categories';
import Product from './pages/Product';
import ScrollToTop from './utils/ScrollToTop';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));
const User = lazy(() => import('./pages/User'));
const Login = lazy(() => import('./pages/Login'));
const Shipping = lazy(() => import('./pages/Shipping'));
const Payment = lazy(() => import('./pages/Payment'));
const Success = lazy(() => import('./pages/Success'));
const Cart = lazy(() => import('./pages/Cart'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <AuthInitializer />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/produtos" element={<Products />} /> */}
            {/* <Route path="/categoria/bongs" element={<Bongs />} /> */}
            <Route path="/produto" element={<Product />} />
            <Route path="/categoria/:categoryName" element={<Categories />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recuperarsenha" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/usuario" element={<ProtectedRoute component={User} />} />
            <Route path="/envio" element={<Shipping />} />
            <Route path="/pagamento" element={<Payment />} />
            <Route path="/comprafinalizada" element={<Success />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/autenticacao" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;

import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthInitializer from './AuthInitializer';
import Loader from './components/common/Loader';
import ScrollToTop from './utils/ScrollToTop';

const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Auth = lazy(() => import('./pages/Auth'));
const ProtectedRoute = lazy(() => import('./components/common/ProtectedRoute'));
const AgeVerification = lazy(() => import('./components/common/AgeVerification'));
const Layout = lazy(() => import('./components/Layout'));
const Categories = lazy(() => import('./pages/Categories'));
const Order = lazy(() => import('./pages/Order'));
const Product = lazy(() => import('./pages/Product'));
const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));
const User = lazy(() => import('./pages/User'));
const Login = lazy(() => import('./pages/Login'));
const Shipping = lazy(() => import('./pages/Shipping'));
const Payment = lazy(() => import('./pages/Payment'));
const Cart = lazy(() => import('./pages/Cart'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <AuthInitializer />
      <AgeVerification />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/produto" element={<Product />} />
            <Route path="/categoria/:categoryName" element={<Categories />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recuperarsenha" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/usuario" element={<ProtectedRoute component={User} />} />
            <Route path="/envio" element={<Shipping />} />
            <Route path="/pagamento" element={<Payment />} />
            <Route path="/pedido" element={<Order />} />
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

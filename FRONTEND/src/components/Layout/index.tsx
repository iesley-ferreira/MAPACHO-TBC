import React, { useState } from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import CartDrawer from './CartDrawer';
import Footer from './Footer';
import Header from './Header';
import MenuDrawer from './MenuDrawer';

const Layout: React.FC = () => {
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const isLoginPage = useMatch('/login');
  const isSignUpPage = useMatch('/cadastro');
  const isUserPage = useMatch('/usuario');
  const isAuthPage = useMatch('/autenticacao');

  return (
    <div className="flex flex-col">
      <Header
        menuDrawerOpen={menuDrawerOpen}
        setMenuDrawerOpen={setMenuDrawerOpen}
        cartDrawerOpen={cartDrawerOpen}
        setCartDrawerOpen={setCartDrawerOpen}
      />
      <MenuDrawer menuDrawerOpen={menuDrawerOpen} setMenuDrawerOpen={setMenuDrawerOpen} />
      <CartDrawer cartDrawerOpen={cartDrawerOpen} setCartDrawerOpen={setCartDrawerOpen} />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isLoginPage && !isSignUpPage && !isUserPage && !isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;

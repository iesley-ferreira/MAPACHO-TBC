import React, { useState } from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import CartDrawer from './CartDrawer';
import DrawerMenu from './DrawerMenu';
import Footer from './Footer';
import Header from './Header';

const Layout: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const isLoginPage = useMatch('/login');
  const isSignUpPage = useMatch('/cadastro');
  const isUserPage = useMatch('/usuario');
  const isAuthPage = useMatch('/autenticacao');

  return (
    <div className="flex flex-col">
      <Header
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        drawerOpen={cartDrawerOpen}
        setDrawerOpen={setCartDrawerOpen}
      />
      <DrawerMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />
      <CartDrawer
        open={cartDrawerOpen}
        setCartDrawerOpen={() => setCartDrawerOpen(false)}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isLoginPage && !isSignUpPage && !isUserPage && !isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;

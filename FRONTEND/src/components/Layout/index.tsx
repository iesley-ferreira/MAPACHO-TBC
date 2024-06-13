import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import CartDrawer from './CartDrawer'
import Footer from './Footer'
import Header from './Header'

const Layout: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <div className="flex flex-col min-h-screen">
      <Header
        showMenu={showMenu}
        setDrawerOpen={setDrawerOpen}
        drawerOpen={drawerOpen}
        setShowMenu={setShowMenu}
      />
      {/* <DrawerMenu isOpen={showMenu} onClose={() => setShowMenu(false)} /> */}
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="flex-grow">
        <Outlet />
      </main>
      {location.pathname === '/' && <Footer />}
    </div>
  )
}

export default Layout

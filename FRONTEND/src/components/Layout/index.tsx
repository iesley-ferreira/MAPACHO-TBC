import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import BannerCarousel from './BannerCarousel'
import DrawerMenu from './DrawerMenu'
import Footer from './Footer'
import Header from './Header'

const Layout: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className="flex flex-col min-h-screen">
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      <DrawerMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />
      <div className="mt-3">
        <BannerCarousel />
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout

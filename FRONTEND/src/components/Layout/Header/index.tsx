import React from 'react'
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import Logo01 from './icons/Logo01'

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = React.useState(false)
  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  const brandSecondaryColor = 'var(--brand-secondary)'

  return (
    <header className="bg-brand-primary flex items-center justify-between px-6 py-2 text-xl shadow-md">
      <button onClick={handleShowMenu}>
        <i className="ri-menu-line text-brand-secondary"></i>
      </button>
      <div>
        <Link to="/">
          <Logo01 color={brandSecondaryColor} strokeWidth={2} />
        </Link>
      </div>
      <nav className="flex items-center gap-4">
        <button>
          <i className="ri-search-line text-brand-secondary"></i>
        </button>
        <Link to="/carrinho" className="text-brand-secondary hover:scale-105">
          <i className="ri-shopping-cart-line text-xl hover:scale-105"></i>
        </Link>
        <Link to="/usuário" className="text-brand-secondary hover:scale-105">
          <i className="ri-user-line text-xl hover:scale-105"></i>
        </Link>
      </nav>
    </header>
  )
}

export default Header

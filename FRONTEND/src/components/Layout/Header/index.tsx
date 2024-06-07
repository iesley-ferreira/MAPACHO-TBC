import { Badge, useMediaQuery } from '@mui/material'
import { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import Logo01 from '../../common/Logo/Logo01'

interface HeaderProps {
  showMenu: boolean
  setShowMenu: (show: boolean) => void
}

const brandSecondaryColor = 'var(--brand-secondary)'

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: -2,
    top: 7,
    color: '#f3af16',
    backgroundColor: '#0d5e53',
    fontFamily: 'Arial, sans-serif',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    padding: '0',
    maxWidth: '15px',
    width: '15px',
    minWidth: '15px',
    height: '15px',
  },
}))

const Header: React.FC<HeaderProps> = ({ showMenu, setShowMenu }) => {
  const [showSearch, setShowSearch] = useState(false)
  const isMobile = useMediaQuery('(max-width: 640px)')

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }

  return (
    <>
      <header className="bg-brand-primary flex items-center justify-between px-6 py-2 text-xl shadow-md">
        {location.pathname === '/' && isMobile && (
          <button onClick={toggleMenu}>
            <i className="ri-menu-fill text-brand-secondary"></i>
          </button>
        )}

        <div>
          <Link to="/">
            <Logo01 color={brandSecondaryColor} strokeWidth={2} />
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <button onClick={toggleSearch}>
            <i className="ri-search-line text-brand-secondary"></i>
          </button>
          <Link to="/carrinho" className="text-brand-secondary hover:scale-105">
            <StyledBadge badgeContent={3} color="secondary">
              <i className="ri-shopping-cart-line text-xl hover:scale-105"></i>
            </StyledBadge>
          </Link>
          <Link to="/usuario" className="text-brand-secondary hover:scale-105">
            <i className="ri-user-3-line text-xl hover:scale-105"></i>
          </Link>
        </nav>
      </header>
      {showSearch && (
        <div className="relative w-full px-4 py-2">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full p-2 pr-10 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-1 focus:ring-brand-secondary focus:border-transparent"
          />
          <button
            onClick={() => setShowSearch(false)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
          >
            <i className="ri-close-line px-4"></i>
          </button>
        </div>
      )}
    </>
  )
}

export default Header

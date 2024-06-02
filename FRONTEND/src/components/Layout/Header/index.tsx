import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className="bg-brand-primary">
      <div></div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/payment">Payment</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  )
}

export default Header

import React from 'react'
import BannerCarousel from '../../components/Layout/BannerCarousel'
import Products from '../../components/UI/Products/Products'

const Home: React.FC = () => {
  return (
    <>
      <div className="mt-3">
        <BannerCarousel />
      </div>
      <div className="m-3">
        <Products />
      </div>
    </>
  )
}

export default Home

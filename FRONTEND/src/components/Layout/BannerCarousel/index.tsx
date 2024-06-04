import { Paper } from '@mui/material'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import './BannerCarousel.css'

const images = [
  '../../../../public/assets/bannerPrimeiraCompra3.png',
  '../../../../public/assets/bannermapacho.jpg',
  '../../../../public/assets/bannerPrimeiraCompra3.png',
  '../../../../public/assets/bannermapacho.jpg',
]

const BannerCarousel: React.FC = () => {
  return (
    <Carousel
      animation="slide"
      swipe={true}
      indicators={false}
      navButtonsAlwaysInvisible={false}
      navButtonsAlwaysVisible={false}
      autoPlay={true}
      cycleNavigation={true}
      duration={1200}
    >
      {images.map((image, index) => (
        <Item key={index} image={image} />
      ))}
    </Carousel>
  )
}

interface ItemProps {
  image: string
}

const Item: React.FC<ItemProps> = ({ image }) => {
  return (
    <Paper className="carousel-item">
      <img src={image} alt={`carousel-${image}`} className="carousel-image" />
    </Paper>
  )
}

export default BannerCarousel

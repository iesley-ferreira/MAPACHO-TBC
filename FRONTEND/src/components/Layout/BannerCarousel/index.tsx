import { Paper } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import './BannerCarousel.css';

const images = [
  '/public/assets/images/banners/bannerPrimeiraCompra3.png',
  '/public/assets/images/banners/bannermapacho.jpg',
];

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
  );
};

interface ItemProps {
  image: string;
}

const Item: React.FC<ItemProps> = ({ image }) => {
  return (
    <Paper className="carousel-item">
      <img
        src={image}
        alt={`carousel-${image}`}
        className="carousel-image object-cover w-full h-[180px] md:h-[240px] lg:h-[500px] overflow-hidden"
      />
    </Paper>
  );
};

export default BannerCarousel;

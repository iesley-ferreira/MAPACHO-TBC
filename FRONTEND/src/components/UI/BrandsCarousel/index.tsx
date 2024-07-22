import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './BrandsCarousel.css';

const BrandsCarousel: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    vertical: false,
    verticalSwiping: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const items = [
    {
      src: '/public/assets/images/brands/Aleda.webp',
      alt: 'Aleda',
    },
    {
      src: '/public/assets/images/brands/LOGO_PAPELITO-01.png',
      alt: 'PAPELITO',
    },
    {
      src: '/public/assets/images/brands/logo-bem-bolado.png',
      alt: 'bem-bolado',
    },
    {
      src: '/public/assets/images/brands/ocb.webp',
      alt: 'ocb',
    },
    {
      src: '/public/assets/images/brands/smoking.webp',
      alt: 'smoking',
    },
    {
      src: '/public/assets/images/brands/squadafun.webp',
      alt: 'squadafun',
    },
    {
      src: '/public/assets/images/brands/under-g.png',
      alt: 'under-g',
    },
    {
      src: '/public/assets/images/brands/raw.png',
      alt: 'raw',
    },
    // {
    //   src: '/public/assets/images/brands/bulldog.png',
    //   alt: 'BullDog',
    // },
  ];

  return (
    <div className="Brands-carousel w-full ">
      <Slider {...settings}>
        {items.map((image, index) => (
          <div key={index}>
            <img className="filter grayscale" src={image.src} alt={image.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandsCarousel;

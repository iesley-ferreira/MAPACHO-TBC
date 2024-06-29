import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const InstagramCarousel: React.FC = () => {
  // const [instagramImages, setInstagramImages] = useState([]);

  // useEffect(() => {
  //   // Função para buscar as imagens da API do Instagram e atualizar o estado
  //   const fetchInstagramImages = async () => {
  //     try {
  //       const response = await fetch('URL_DA_API_DO_INSTAGRAM');
  //       const data = await response.json();
  //       setInstagramImages(data.imagens); // Atualize com o caminho correto para as imagens na resposta da API
  //     } catch (error) {
  //       console.error('Erro ao buscar imagens do Instagram:', error);
  //     }
  //   };

  //   fetchInstagramImages();
  // }, []);

  const settings = {
    dots: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const items = [
    { src: '/public/assets/images/post1.webp', alt: 'post1' },
    { src: '/public/assets/images/post2.webp', alt: 'post2' },
    { src: '/public/assets/images/post3.webp', alt: 'post3' },
    { src: '/public/assets/images/post4.webp', alt: 'post4' },
    { src: '/public/assets/images/post5.webp', alt: 'post5' },
    { src: '/public/assets/images/post6.webp', alt: 'post6' },
  ];

  return (
    <div className="instagram-carousel w-[300px] sticky top-2">
      <Slider {...settings}>
        {items.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default InstagramCarousel;

import { Box } from '@mui/material';
import Image from 'next/image';
import Slider from 'react-slick';

interface ImageSliderProps {
  validImages: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ validImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <Box sx={{ mt: 4, mb: 4, maxWidth: '100%' }}>
      <Slider {...settings}>
        {validImages.map((imgSrc, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 300, sm: 400, md: 500 },
            }}
          >
            <Image
              src={imgSrc}
              alt={`Imagen ${index + 1}`}
              layout="fill"
              objectFit="contain" // 🔥 clave para que no se recorten
              priority={index === 0} // Hace que la primera imagen cargue primero
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageSlider;

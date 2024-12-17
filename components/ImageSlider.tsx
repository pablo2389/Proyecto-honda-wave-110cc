import React from 'react';
import { Box, IconButton } from '@mui/material';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface ImageSliderProps {
  validImages: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ validImages }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + validImages.length) % validImages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <IconButton onClick={handlePrev}>
        <ChevronLeft />
      </IconButton>
      <Image
        src={validImages[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        width={500}
        height={300}
      />
      <IconButton onClick={handleNext}>
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

export default ImageSlider;

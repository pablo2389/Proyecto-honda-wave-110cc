import React, { useState } from 'react';
import styles from '../styles/imageslider.module.css'; // Importar el archivo CSS Módulo

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(1); // Comienza con moto1.png
  const [imageError, setImageError] = useState(false); // Estado para manejar el error de imagen

  const totalImages = 17; // Cambia a la cantidad de imágenes que tengas

  // Función para ir a la imagen siguiente
  const nextImage = () => {
    setImageError(false); // Reseteamos el error al cambiar la imagen
    setCurrentImage((prevImage) => (prevImage === totalImages ? 1 : prevImage + 1));
  };

  // Función para ir a la imagen anterior
  const prevImage = () => {
    setImageError(false); // Reseteamos el error al cambiar la imagen
    setCurrentImage((prevImage) => (prevImage === 1 ? totalImages : prevImage - 1));
  };

  // Función para manejar el error de carga de la imagen
  const handleImageError = () => {
    setImageError(true); // Si la imagen no se carga, se activa el error
    setTimeout(nextImage, 500); // Cambiar a la siguiente imagen después de un corto retraso
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.imageContainer}>
        {imageError ? (
          <div className={styles.errorMessage}>110 al piso</div> // Mensaje cuando la imagen falla
        ) : (
          <img
            className={styles.image}
            src={`/images/moto${currentImage}.png`} // Ruta a las imágenes en 'public/images'
            alt={`Imagen ${currentImage}`}
            onError={handleImageError} // Si hay un error de carga, pasa al siguiente
          />
        )}
      </div>
      <button className={styles.navButtonPrev} onClick={prevImage}>←</button>
      <button className={styles.navButtonNext} onClick={nextImage}>→</button>
    </div>
  );
};

export default ImageSlider;

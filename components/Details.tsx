import React from 'react';
import Image from 'next/image';

interface DetailsProps {
  title: string;
  image: string;
}

const Details: React.FC<DetailsProps> = ({ title, image }) => (
  <details className="bg-racing">
    <summary>{title}</summary>
    <div className="details-content">
      <Image
        src={`/images/${image}`}
        alt={title || 'Imagen de detalles'}  // Mejorar accesibilidad
        width={500}
        height={300}
        layout="responsive"  // Esto hace que la imagen se ajuste de forma responsive
        objectFit="cover"    // Puedes usar este en lugar de "style"
      />
    </div>
  </details>
);

export default Details;

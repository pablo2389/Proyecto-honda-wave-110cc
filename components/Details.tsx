// ✅ CORREGIDO
import Image from 'next/image';
import React from 'react';

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
        alt={title}
        width={800}
        height={500}
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  </details>
);

export default Details;

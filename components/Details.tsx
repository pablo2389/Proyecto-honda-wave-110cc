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
        alt={title}
        width={500}
        height={300}
        style={{ objectFit: 'cover' }}
      />
    </div>
  </details>
);

export default Details;

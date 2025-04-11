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
        width={600} 
        height={400} 
        style={{ width: '100%', height: 'auto' }} 
      />
    </div>
  </details>
);

export default Details;

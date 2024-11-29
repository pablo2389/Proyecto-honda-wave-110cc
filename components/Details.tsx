import React from 'react';

interface DetailsProps {
  title: string;
  image: string;
}

const Details: React.FC<DetailsProps> = ({ title, image }) => (
  <details className="bg-racing">
    <summary>{title}</summary>
    <div className="details-content">
      <img src={`/images/${image}`} alt={title} />
    </div>
  </details>
);

export default Details;

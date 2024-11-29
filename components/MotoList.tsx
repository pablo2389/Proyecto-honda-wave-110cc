import React from 'react';
import Details from './Details';

const MotoList: React.FC = () => {
  const motos = Array.from({ length: 15 }, (_, i) => ({
    title: `Moto ${i + 1}`,
    image: `moto${i + 1}.png`,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {motos.map((moto, index) => (
        <Details key={index} title={moto.title} image={moto.image} />
      ))}
    </div>
  );
};

export default MotoList;

import { Button } from '@mui/material';
import React from 'react';

interface CategoryCardProps {
  id: number;
  name: string;
  imageSrc: string;
  onClick: (categoryId: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, imageSrc, onClick }) => {
  return (
    <div className="w-1/2 md:w-1/3 lg:w-1/5 px-4 mb-4">
      <Button
        className="group block text-center"
        onClick={() => onClick(id)}
        style={{
          padding: 0,
          display: 'block',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div className="aspect-w-1 aspect-h-1 rounded-xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] transition-transform transform group-hover:scale-105 overflow-hidden">
          <img
            className="block w-full rounded-xl object-cover"
            src={imageSrc}
            alt={name}
          />
        </div>
        <h6 className="font-bold py-2 text-slate-800 group-hover:text-yellow-500 transition-transform transform group-hover:scale-105 lg:py-4 text-base lg:text-lg">
          {name}
        </h6>
      </Button>
    </div>
  );
};

export default CategoryCard;

import React from 'react';

interface CategoryImgProps {
  imageUrl: string;
  categoryName: string;
  maxHeight?: string;
  minHeight?: string;
}

const CategoryImg: React.FC<CategoryImgProps> = ({
  imageUrl,
  categoryName,
  maxHeight,
  minHeight,
}) => {
  return (
    <img
      className="relative z-0 block w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-102 transform shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
      style={{ maxHeight: maxHeight, minHeight: minHeight }}
      src={imageUrl}
      alt={categoryName}
    />
  );
};

export default CategoryImg;

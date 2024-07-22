import React from 'react';

interface CustomButtonProps {
  onClick: (inputType: string) => void;
  inputType: string;
  backgroundColor: string;
  textColor: string;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  inputType,
  backgroundColor,
  textColor,
  children,
}) => {
  return (
    <button
      className={`mr-2 px-4 py-2 font-medium shadow-lg rounded ${backgroundColor} ${textColor}`}
      onClick={() => onClick(inputType)}
    >
      {children}
    </button>
  );
};

export default CustomButton;

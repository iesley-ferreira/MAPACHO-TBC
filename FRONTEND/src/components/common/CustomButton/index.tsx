import React from 'react';

interface CustomButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type = 'button',
  disabled = false,
  className = '',
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-[22px] py-[8px] leading-[25px] text-sm uppercase font-medium rounded-[4px] shadow-md transition-all duration-200 ${className} ${
        disabled
          ? 'bg-gray-300 cursor-not-allowed text-gray-400'
          : 'bg-emerald-500 hover:bg-emerald-600 text-white'
      }`}
    >
      {children}
    </button>
  );
};

export default CustomButton;

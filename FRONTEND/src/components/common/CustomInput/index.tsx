import React, { CSSProperties, ChangeEvent } from 'react';

interface CustomInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  className?: string;
  style?: CSSProperties;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
  disabled?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  className,
  style,
  onFocus,
  maxLength,
  onBlur,
  disabled,
}) => {
  return (
    <input
      className={`py-2 px-4 h-11 w-full text-gray-500 placeholder-gray-500 bg-white border border-gray-200 focus:border-yellowGreen-500 rounded-lg shadow-sm outline-none ring-1 ring-transparent focus:ring-yellowGreen-500 ${className}`}
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={style}
      onFocus={onFocus}
      onBlur={onBlur}
      maxLength={maxLength}
      disabled={disabled}
    />
  );
};

export default CustomInput;

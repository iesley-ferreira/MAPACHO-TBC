import React, { CSSProperties, ChangeEvent } from 'react';

interface CustomInputProps {
  id?: string;
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
  error?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  id,
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
  error = false,
}) => {
  return (
    <input
      className={`py-2 px-4 h-11 w-full bg-transparent text-gray-500 placeholder-gray-500 border border-gray-200 focus:border-yellowGreen-500 rounded-lg shadow-sm outline-none ring-1 ring-transparent focus:ring-yellowGreen-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className}`}
      id={id}
      type={type}
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

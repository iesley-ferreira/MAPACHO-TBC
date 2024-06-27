import { Button } from '@mui/material';

interface CustomButtonProps {
  type: 'button' | 'submit' | 'reset';
  variant: 'text' | 'outlined' | 'contained';
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
  className: string;
  onClick: () => void;
  sx: object;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  variant,
  size,
  disabled,
  className,
  onClick,
  sx,
  children,
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${disabled ? 'bg-gradient-to-br from-gray-300 to-gray-500' : 'bg-gradient-to-br from-cyanGreen-800 to-cyan-800'} text-white`}
      sx={{
        ...sx,
        '&:hover': {
          backgroundColor: disabled ? '' : '#1f9d45',
        },
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;

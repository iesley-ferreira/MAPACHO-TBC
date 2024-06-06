import { Button, ButtonProps } from '@mui/material'

const CustomButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>
}

export default CustomButton

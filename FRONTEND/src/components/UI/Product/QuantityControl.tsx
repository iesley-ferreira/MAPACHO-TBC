import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';

interface QuantityControlProps {
  productQuantity: number;
  setProductQuantity: (quantity: number) => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  productQuantity,
  setProductQuantity,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      border={1}
      borderColor="grey.400"
      borderRadius={1}
      paddingX={2}
      paddingY={1}
      gap={2}
    >
      <IconButton
        onClick={() => setProductQuantity(productQuantity - 1)}
        disabled={productQuantity === 1}
        color="default"
      >
        <RemoveIcon />
      </IconButton>
      <Typography variant="body1" color="textPrimary">
        {productQuantity}
      </Typography>
      <IconButton onClick={() => setProductQuantity(productQuantity + 1)} color="default">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default QuantityControl;

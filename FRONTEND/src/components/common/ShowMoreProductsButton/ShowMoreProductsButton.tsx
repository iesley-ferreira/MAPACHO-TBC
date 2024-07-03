import { Box, Button, CircularProgress } from '@mui/material';
import React from 'react';

interface ShowMoreProductsButtonProps {
  loading: boolean;
  loadMoreProducts: () => void;
  isShowMoreProductsButtonDisabled: boolean;
}

const ShowMoreProductsButton: React.FC<ShowMoreProductsButtonProps> = ({
  loading,
  loadMoreProducts,
  isShowMoreProductsButtonDisabled,
}) => {
  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '55vh',
          }}
        >
          <CircularProgress sx={{ color: 'darkgreen' }} />
        </Box>
      ) : (
        <>
          <Button
            onClick={loadMoreProducts}
            disabled={isShowMoreProductsButtonDisabled}
            sx={{
              my: 8,
              color: 'rgb(5 150 105)',
              '&:disabled': {
                color: 'GrayText',
              },
              '&:hover': {
                backgroundColor: 'inherit',
                color: 'rgb(5 150 105)',
                transform: 'scale(1.02)',
              },
            }}
          >
            Mostrar Mais Produtos
          </Button>
        </>
      )}
    </>
  );
};

export default ShowMoreProductsButton;

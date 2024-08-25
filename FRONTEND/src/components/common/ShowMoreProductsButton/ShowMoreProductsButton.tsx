import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';

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
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  useEffect(() => {
    if (!loading) setIsButtonLoading(false);
  }, [loading]);

  const handleLoadMoreProducts = async () => {
    setIsButtonLoading(true);
    loadMoreProducts();
  };
  return (
    <Button
      onClick={handleLoadMoreProducts}
      disabled={isShowMoreProductsButtonDisabled || loading}
      sx={{
        my: 8,
        border: '1px solid rgb(5 150 105)',
        color: 'rgb(5 150 105)',
        minWidth: '220px',
        '&:disabled': {
          color: 'GrayText',
          border: '1px solid GrayText',
          cursor: 'not-allowed',
        },
        '&:hover': {
          backgroundColor: 'inherit',
          color: 'rgb(5 150 105)',
          transform: 'scale(1.02)',
        },
      }}
    >
      {isButtonLoading ? (
        <CircularProgress thickness={3} size={24} sx={{ color: 'rgb(5 150 105)' }} />
      ) : (
        'Mostrar Mais Produtos'
      )}
    </Button>
  );
};

export default ShowMoreProductsButton;

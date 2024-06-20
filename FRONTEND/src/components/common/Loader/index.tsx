import { CircularProgress } from '@mui/material';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-10">
      <CircularProgress sx={{ color: 'darkgreen' }} />
    </div>
  );
};

export default Loader;

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const Loading = () => {
  return (
    <Box
      display='flex'
      sx={{
        justifyContent: 'center',
        alignItems: 'center',

        minHeight: '100vh',
      }}
    >
      <CircularProgress sx={{ minWidth: '8rem', minHeight: '8rem' }} />
    </Box>
  );
};
export default Loading;

import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer_section = () => {
  return (
    <Box
      sx={{
        background: `#000000`,
        padding: 2,
        textAlign: 'center',
        height: '5%', // Adjust the height as needed
        width: '100%',
        marginTop: '6rem',
      }}
    >
      <Typography sx={{ color: '#ffffff' }}>
        &copy; جميع الحقوق محفوضة لشركة الجماس {new Date().getFullYear()} .
      </Typography>
    </Box>
  );
};

export default Footer_section;

import React from 'react';
import { Box, Typography, Grid, Button, IconButton } from '@mui/material';
import NA from '../static_resource/NA.png';

const MySingleOrderTable = ({ name, image, price, amount, company }) => {
  return (
    <Box
      width='100%'
      border='1px solid #ccc'
      minHeight='120px'
      sx={{ textAlign: 'center' }}
    >
      <Box padding='1rem'>
        {/*Product*/}
        <Box display='flex' justifyContent='center' alignItems='center'>
          {/* IMAGE */}
          <Box width='10%' height='60%'>
            <img
              src={image === '/uploads/example.jpeg' ? NA : image}
              alt=''
              width='60%'
            />
          </Box>{' '}
          <Box
            display='flex'
            justifyContent='space-between'
            width='100%'
            sx={{ marginLeft: '15%', textAlign: 'start' }}
          >
            {/*Typrography*/} <Typography>{name}</Typography>
            <Typography>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(price)}
            </Typography>
            <Typography>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(price * amount)}
            </Typography>
            <Typography marginTop='5px'>{amount}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MySingleOrderTable;

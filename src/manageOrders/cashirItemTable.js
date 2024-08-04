import React from 'react';
import { Box, Typography, Grid, Button, IconButton } from '@mui/material';
import NA from '../static_resource/NA.png';
import { useGlobalCashirContext } from './cashirContext';

const CashirItemTable = ({
  company,
  image,
  amount,
  sellPrice,
  _id,
  name,
  subTotal,
}) => {
  const {
    increaseCashirCartItem,
    decreaseCashirCartItem,
    removeCashirCartItem,
  } = useGlobalCashirContext();
  return (
    <Box width='50%' border='1px solid #ccc' height='130px'>
      <Box padding='1rem'>
        {/*Product*/}
        <Box display='flex'>
          {/* IMAGE */}
          <Box width='11%' height='100%'>
            <img src={image} alt='' width='65%' />
          </Box>
          {/*Typrography*/}
          <Box sx={{ marginLeft: '2rem', textAlign: 'start' }}>
            {' '}
            <Typography>{name}</Typography>
            <Typography>{company}</Typography>
            <Button
              sx={{ marginLeft: '-8px' }}
              onClick={() => {
                removeCashirCartItem(_id);
                console.log('hello remove item');
              }}
            >
              اخراج المنتج من العربه
            </Button>
          </Box>
        </Box>

        {/*Price*/}
        <Box sx={{ marginTop: '-70px' }}>
          <Typography>
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(sellPrice)}
          </Typography>
        </Box>
        {/*Quanitiy ..... diffrence between states 23px in Y axis */}
        <Box sx={{ display: 'flex', marginLeft: '465px', marginTop: '-25px' }}>
          <Button
            disableFocusRipple
            sx={{
              '&:hover': {
                backgroundColor: 'initial', // or 'transparent'
              },
            }}
            onClick={() => {
              increaseCashirCartItem(_id);
              console.log('hello incease item');
            }}
          >
            +
          </Button>
          <Typography marginTop='5px'>{amount}</Typography>
          <Button
            sx={{
              '&:hover': {
                backgroundColor: 'initial', // or 'transparent'
              },
            }}
            onClick={() => {
              decreaseCashirCartItem(_id);
              console.log('hello decrease item');
            }}
          >
            -
          </Button>
        </Box>

        {/*subTotal*/}
        <Box sx={{ marginLeft: '655px', marginTop: '-35px' }}>
          <Typography>
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(subTotal)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CashirItemTable;

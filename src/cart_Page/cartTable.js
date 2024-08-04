import React from 'react';
import { Box, Typography, Grid, Button, IconButton } from '@mui/material';
import CartItemTable from './cartItemTable';
import { useGlobalCartContext } from './cart_context';

const CartTable = () => {
  const { cart } = useGlobalCartContext();
  console.log(cart);

  return (
    <Box
      sx={{
        textAlign: 'center',
        display: 'grid',
        placeItems: 'center',
        marginTop: '8rem',
      }}
    >
      <Box
        width='50%'
        textAlign='center'
        sx={{ border: '1px solid #ccc', height: '50px' }}
      >
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          padding='1rem'
        >
          <Box>
            <Typography>المنتج</Typography>
          </Box>
          <Box
            display='flex'
            justifyContent='space-between'
            width='100%'
            sx={{ marginLeft: '40%' }}
          >
            <Typography>السعر</Typography>
            <Typography>الكمية</Typography>
            <Typography>سعر المجموع</Typography>
          </Box>
        </Box>
      </Box>
      {cart.map((cartItem) => {
        return <CartItemTable {...cartItem}></CartItemTable>;
      })}
    </Box>
  );
};

export default CartTable;

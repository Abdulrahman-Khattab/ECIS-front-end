import React from 'react';
import { Box, Divider, Grid, Typography, Button } from '@mui/material';
import { useGlobalCartContext } from './cart_context';

const CartTotalTable = () => {
  const { cartTotal, handleOpenModal, createOrderRequest, paymentURL } =
    useGlobalCartContext();

  return (
    <Box display='grid' sx={{ placeItems: 'center' }}>
      <Box width='30%' sx={{ border: '1px solid #ccc' }}>
        {/*Cart Intro*/}
        <Box
          padding='1rem'
          sx={{ textAlign: 'center', textTransform: 'capitalize' }}
        >
          <Typography sx={{ fontSize: '1.25rem' }}>cart totals</Typography>
        </Box>
        <Divider />

        {/*Cart total and subTotal */}
        <Box
          width='80%'
          sx={{
            textAlign: 'start',
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '2rem',
            textTransform: 'capitalize',
            marginTop: '2rem',
          }}
        >
          <Box sx={{ marginBottom: '2rem' }}>
            <Typography>
              السعر الأولي:
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(cartTotal)}
            </Typography>
            <Divider />
          </Box>
          <Box sx={{ marginBottom: '2rem' }}>
            <Typography>
              السعر النهائي:
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(cartTotal)}
            </Typography>
            <Divider />
          </Box>
        </Box>
        {/*Cart Button*/}
        <Box textAlign='center' sx={{ marginBottom: '2rem' }}>
          <Button
            variant='contained'
            sx={{ paddingLeft: '1rem', paddingRight: '1rem' }}
            onClick={async () => {
              createOrderRequest();
              handleOpenModal();
            }}
          >
            أكمل عملية الطلب
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartTotalTable;

import React from 'react';
import MyCurrentOrderTable from './myCurrnetOrdersTable';
import { useGlobalOrderContext } from './ordersContext';
import { Box, Typography } from '@mui/material';
import NavBar from '../general_component/Navbar';
import CartNav from '../cart_Page/cart';

const GetMyOrder = () => {
  const { currentUserOrder } = useGlobalOrderContext();
  return (
    <Box>
      <NavBar />
      <CartNav />
      <Typography
        color='primary.main'
        fontSize='2.5rem'
        sx={{
          marginTop: '8rem',
          textAlign: 'center',
          textTransform: 'capitalize',
        }}
      >
        مشترياتي{' '}
      </Typography>
      <Box
        sx={{
          textAlign: 'center',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {currentUserOrder.map((userOrder) => {
          return (
            <MyCurrentOrderTable
              subtotal={userOrder.subtotal}
              orderItems={userOrder.orderItems}
              orderDate={userOrder.orderDate}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default GetMyOrder;

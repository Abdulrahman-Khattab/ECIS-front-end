import React from 'react';
import { Box, Typography, Grid, Button, IconButton } from '@mui/material';
import MySingleOrderTable from './mySingleOrderTable';

const MyCurrentOrderTable = ({ subtotal, orderItems, orderDate }) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        display: 'grid',
        placeItems: 'center',
        marginTop: '8rem',
        width: '80%',
      }}
    >
      <Box
        width='100%'
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
            sx={{ marginLeft: '20%' }}
          >
            <Typography>الأسم</Typography>
            <Typography>السعر</Typography>
            <Typography>السعر الكلي</Typography>
            <Typography>العدد</Typography>
          </Box>
        </Box>
      </Box>
      {orderItems.map((orderItem) => {
        return <MySingleOrderTable {...orderItem}></MySingleOrderTable>;
      })}
      <Box
        width='100%'
        border='1px solid #ccc'
        minHeight='120px'
        sx={{ textAlign: 'start' }}
      >
        <Box
          sx={{
            padding: '1rem',
            textTransform: 'capitalize',
            color: 'primary.main',
          }}
        >
          {' '}
          <Typography>
            السعر الكلي لطلبك:
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(subtotal)}
          </Typography>
          <br />
          <Typography> {orderDate} : تاريخ طلبك </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MyCurrentOrderTable;

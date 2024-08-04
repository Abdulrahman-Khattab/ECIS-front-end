import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useGlobalCartContext } from './cart_context';
import { IconButton, Typography, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NA from '../static_resource/NA.png';

const CartItem = ({ id, image, name, sellPrice, company, amount }) => {
  const { increaseCartItem, decreaseCartItem, removeCartItem } =
    useGlobalCartContext();

  return (
    <Box key={id}>
      <Grid container spacing={2}>
        {/* Image */}
        <Grid item xs={12} md={4}>
          <img
            src={image}
            alt='Product'
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>

        {/* Information */}
        <Grid item xs={12} md={8}>
          <Typography variant='h6'>{name}</Typography>
          <Typography variant='body1'>{company}</Typography>
          <Typography variant='h6'>
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(sellPrice)}
          </Typography>

          {/* Quantity buttons */}
          <Box display='flex' justifyContent='space-between'>
            <Box display='flex'>
              <Button
                variant='outlined'
                size='small'
                onClick={() => {
                  decreaseCartItem(id);
                }}
              >
                -
              </Button>
              <Typography
                variant='body1'
                fontSize='1.5rem'
                style={{ margin: '0 10px' }}
              >
                {amount}
              </Typography>
              <Button
                variant='outlined'
                size='small'
                onClick={() => {
                  increaseCartItem(id);
                }}
              >
                +
              </Button>
            </Box>
            {/* Remove item button */}
            <Box>
              {' '}
              <IconButton
                color='primary'
                onClick={() => {
                  removeCartItem(id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: '1rem' }} />
    </Box>
  );
};

export default CartItem;

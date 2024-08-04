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
import CartItem from './cartItem';
import { Link } from 'react-router-dom';

function CartNav() {
  const {
    handleCloseCart,
    openCart,
    setOpenCart,
    handleOpenCart,
    cart,
    cartTotal,
  } = useGlobalCartContext();

  const list = () => (
    <Box sx={{ width: 400 }} role='presentation'>
      <Box
        display='flex'
        sx={{ justifyContent: 'space-between', padding: '1rem' }}
      >
        <Typography sx={{ fontSize: '1rem', marginTop: '6px' }}>
          عربة التسوق{' '}
        </Typography>
        <IconButton onClick={handleCloseCart}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      {/* CART INFORMATION */}
      {cart.map((cartItemData) => {
        return <CartItem {...cartItemData} />;
      })}
      {/* TOTAL */}
      <Box>
        <Divider />
        <Box display='flex' justifyContent='space-between' padding='1.5rem'>
          <Typography sx={{ fontSize: '1.25rem', textTransform: 'capitalize' }}>
            المجموع:{' '}
          </Typography>
          <Typography sx={{ fontSize: '1.25rem' }}>
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(cartTotal)}
          </Typography>
        </Box>
        <Divider />
      </Box>
      <Box display='block' textAlign='center' padding='1rem'>
        <Button
          variant='contained'
          sx={{
            marginBottom: '1rem',
            width: '90%',
            textTransform: 'capitalize',
            fontSize: '1.25rem',
          }}
          onClick={handleCloseCart}
        >
          <Link
            style={{ textDecoration: 'none', color: 'white' }}
            to={'/عربه التسوق'}
          >
            عرض العربة
          </Link>
        </Button>
      </Box>
    </Box>
  );

  return (
    <React.Fragment>
      <Drawer anchor={'right'} open={openCart}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
}

export default CartNav;

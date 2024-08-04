import React from 'react';
import NavBar from './Navbar';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
        }}
      >
        <Typography
          color='primary.main'
          sx={{
            fontSize: '40px',
            textTransform: 'capitalize',
            textAlign: 'center',
          }}
        >
          this page doesn't seem to exist
          <br />
          <Typography
            sx={{ fontSize: '16px', color: 'black', fontWeight: '400' }}
          >
            It looks like the link pointing here was faulty maybe you want to go
            back to home page ?{' '}
          </Typography>
          <br />
          <Button color='primary'>
            <Link
              to='/home'
              style={{ textDecoration: 'none', color: '#1976D2' }}
            >
              home page
            </Link>
          </Button>
        </Typography>
      </Box>
    </>
  );
};

export default Error;
